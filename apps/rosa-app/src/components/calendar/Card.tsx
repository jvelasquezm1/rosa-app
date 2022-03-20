import { useEffect, useState } from 'react';
import {
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Dialog
} from '@material-ui/core';
import { find, isEmpty } from 'lodash';
import { ButtonCalendar, CalendarContainer, DivCenter, StyledP } from './styles';

import EmptyBanner from '../common/EmptyBanner';
import { getCalendar } from '../../services/calendar.services'
import { initialValues, no, rangeOfDaysDisplayed, yes } from './constants';
import { addDaysToDate, displayEverySlot, getArrayOfTr, getDatesInRange, paginate } from '../../utils';
import withCommonDataDataProvider from '../../HOCs/withCommonDataProvider';

function Card(props: ICardProps) {
  const { initialDate_, endDate_ } = initialValues
  const [initialDate, setInitialDate] = useState(initialDate_)
  const [endDate, setEndDate] = useState(endDate_)
  const [motive, setMotive] = useState({} as IMotives)
  const [calendarId, setCalendarId] = useState('' as string)
  const [isFirstAppointment, setIsFirstAppointment] = useState(true)
  const [calendarRange, setCalendarRange] = useState([] as ICalendarRange[])
  const [availabilities, setAvailabilities] = useState({} as IAvailabilities | any)
  const [nextPageClicked, setNextPageClicked] = useState(false)
  const [displayShowMore, setDisplayShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [motiveReasons, setMotiveReasons] = useState([] as IMotives[])
  const [pagination, setPagination] = useState({ page: 1, pageSize: 3 } as IPagination)
  const [timeSlot, setTimeSlot] = useState('')
  const [cellSelected, setCellSelected] = useState({} as ICell)

  useEffect(() => {
    const { commonData } = props;
    if (!isEmpty(commonData)) {
      setCalendarRange(getDatesInRange(initialDate, endDate));
      setMotiveReasons(commonData.data.motives);
      setMotive(commonData.data.motives[0]);
      setCalendarId(commonData.data.calendars[0].id);
      getCalendar(initialDate, endDate, commonData.data.motives[0].id, isFirstAppointment, commonData.data.calendars[0].id).then(
        options => setAvailabilities(displayEverySlot(options, commonData.data.motives, isFirstAppointment, commonData.data.motives[0].id))
      );
    }
  }, [props.commonData]);

  useEffect(() => {
    if ((pagination.pageSize < getArrayOfTr(availabilities).length) && !displayShowMore) {
      setPagination({ ...pagination, pageSize: getArrayOfTr(availabilities).length })
    }
  }, [availabilities]);

  const cleanState = () => {
    setCellSelected({});
    setTimeSlot('');
  }

  const setPageBehavior = (pageClicked: boolean, dateInitial: string, dateEnd: string) => {
    setNextPageClicked(pageClicked);
    setInitialDate(dateInitial);
    setEndDate(dateEnd);
    setCalendarRange(getDatesInRange(dateInitial, dateEnd));
    getCalendar(dateInitial, dateEnd, motive.id, isFirstAppointment, calendarId).then(
      options => setAvailabilities(displayEverySlot(options, motiveReasons, isFirstAppointment, motive.id))
    );
  }

  const handleNextPage = (nextPage: boolean) => {
    cleanState();
    nextPage
      ? setPageBehavior(true, addDaysToDate(rangeOfDaysDisplayed, initialDate), addDaysToDate(rangeOfDaysDisplayed, endDate))
      : setPageBehavior(false, initialDate_, endDate_)
  }

  const handleShowMore = () => {
    setPagination({ ...pagination, pageSize: getArrayOfTr(availabilities).length })
    setDisplayShowMore(false)
  }

  const handleTimeSelection = (time: ISlot, index: number, i: number) => {
    setCellSelected({ id: `${index}:${i}`, time: time })
    setTimeSlot(availabilities[time?.number].slots[index] || '')
  }

  const handleChangeMotive = (event: string) => {
    const newMotive = find(motiveReasons, { id: event }) as IMotives;
    cleanState();
    setMotive(newMotive);
    getCalendar(initialDate, endDate, newMotive?.id || '', isFirstAppointment, calendarId).then(
      options => setAvailabilities(displayEverySlot(options, motiveReasons, isFirstAppointment, newMotive?.id))
    );
  }

  const validateAppointment = () => {
    const { time } = cellSelected;
    setOpenModal(true)
    isEmpty(timeSlot)
      ? setModalMessage('Select time first to continue booking')
      : setModalMessage(`${isFirstAppointment ? 'First a' : ' A'}ppointment booked for ${time?.day}, ${time?.month} ${time?.number} at ${timeSlot} with motive: ${motive.label}`)
  }

  const handleIsFirstAppointment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isFirst = event.target.value === yes;
    setIsFirstAppointment(isFirst);
    cleanState();
    getCalendar(initialDate, endDate, motive.id, isFirst, calendarId).then(
      options => setAvailabilities(displayEverySlot(options, motiveReasons, isFirst, motive.id))
    );
  }

  return (
    <CalendarContainer>
      <h1>Find availability</h1>
      <FormControl>
        <h3>Is this your first appointment with this practitioner?</h3>
        <RadioGroup row defaultValue={yes} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleIsFirstAppointment(event)}>
          <FormControlLabel value={yes} control={<Radio color='default' />} label='Yes' />
          <FormControlLabel value={no} control={<Radio color='default' />} label='No' />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <h3>What is the reason for your visit?</h3>
        <Select
          value={isEmpty(motive) ? '' : motive.id}
          label='Motive'
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleChangeMotive(event.target.value as string)}
        >
          {!isEmpty(motiveReasons) && motiveReasons.map((motive: IMotives, id: number) => {
            return <MenuItem key={id} value={motive.id}>{motive.label}</MenuItem>
          })}
        </Select>
      </FormControl>
      <div>
        <table>
          <thead>
            <tr>
              <th> <Button disabled={!nextPageClicked} onClick={() => handleNextPage(false)}> {'<'} </Button> </th>
              {!isEmpty(calendarRange) && calendarRange.map((time: ISlot, i: number) => {
                const { day, month, number } = time;
                return (
                  <th key={i}>
                    <p>{day}</p>
                    <p>{month} {number}</p>
                  </th>
                );
              })}
              <th> <Button disabled={nextPageClicked} onClick={() => handleNextPage(true)}> {'>'} </Button> </th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(availabilities) && paginate(getArrayOfTr(availabilities), pagination.pageSize, pagination.page).map((a: object, index: number) => {
              return <tr key={index}>
                <td />
                {calendarRange.map((time: ISlot, i: number) => {
                  return !isEmpty(availabilities[time?.number]) ?
                    <td key={i}>
                      <ButtonCalendar selected={`${index}:${i}` === cellSelected.id} onClick={() => handleTimeSelection(time, index, i)}>{availabilities[time.number].slots[index] || '-'}</ButtonCalendar>
                    </td> :
                    <td key={i}>
                      <Button>
                        -
                      </Button>
                    </td>
                })}
                <td />
              </tr>
            })}
          </tbody>
        </table>
        {isEmpty(availabilities) ? <EmptyBanner /> :
          displayShowMore &&
          <DivCenter>
            <Button onClick={() => handleShowMore()}>
              <p>Show more availabilities</p>
            </Button>
          </DivCenter>}
        {!isEmpty(availabilities) &&
          <DivCenter>
            <Button onClick={() => validateAppointment()}>
              <p>Book appointment</p>
            </Button>
          </DivCenter>}
      </div>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}>
        <StyledP>
          {modalMessage}
        </StyledP>
      </Dialog>
    </CalendarContainer >
  )
}

export default withCommonDataDataProvider(Card);