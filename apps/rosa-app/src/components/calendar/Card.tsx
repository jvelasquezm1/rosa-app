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
import { intialValues, no, yes } from './constants';
import { addDaysToDate, displayEverySlot, getArrayOfTr, getDatesInRange, paginate } from '../../utils';
import { ICalendarRange } from '../../types/calendar.model';
import withCommonDataDataProvider from '../../HOCs/withCommonDataProvider';

function Card(props: any) {
  const { initialDate_, endDate_ } = intialValues
  const [initialDate, setInitialDate] = useState(initialDate_)
  const [endDate, setEndDate] = useState(endDate_)
  const [motive, setMotive] = useState({} as any)
  const [calendarId, setCalendarId] = useState('' as string)
  const [isFirstAppointment, setIsFirstAppointment] = useState(true)
  const [calendarRange, setCalendarRange] = useState([] as ICalendarRange[])
  const [availabilities, setAvailabilities] = useState({} as any)
  const [nextPageClicked, setNextPageClicked] = useState(false)
  const [displayShowMore, setDisplayShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [motiveReasons, setMotiveReasons] = useState([] as any)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 3
  })
  const [timeSlot, setTimeSlot] = useState('')
  const [cellSelected, setCellSelected] = useState({} as any)

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

  const cleanState = () => {
    setCellSelected({});
    setTimeSlot('');
  }

  const handleNextPage = (nextPage: boolean) => {
    cleanState();
    if (nextPage) {
      setNextPageClicked(true);
      setInitialDate(addDaysToDate(5, initialDate));
      setEndDate(addDaysToDate(5, endDate));
      setCalendarRange(getDatesInRange(addDaysToDate(5, initialDate), addDaysToDate(5, endDate)));
      getCalendar(addDaysToDate(5, initialDate), addDaysToDate(5, endDate), motive.id, isFirstAppointment, calendarId).then(
        options => setAvailabilities(displayEverySlot(options, motiveReasons, isFirstAppointment, motive.id))
      );
    } else {
      setNextPageClicked(false);
      setInitialDate(initialDate_);
      setEndDate(endDate_);
      setCalendarRange(getDatesInRange(initialDate_, endDate_));
      getCalendar(initialDate_, endDate_, motive.id, isFirstAppointment, calendarId).then(
        options => setAvailabilities(displayEverySlot(options, motiveReasons, isFirstAppointment, motive.id))
      );
    }
  }

  const handleShowMore = () => {
    setPagination({ ...pagination, pageSize: getArrayOfTr(availabilities).length })
    setDisplayShowMore(false)
  }

  const handleTimeSelection = (time: any, index: number, i: number) => {
    setCellSelected({ id: `${index}:${i}`, time: time })
    setTimeSlot(availabilities[time.number].slots[index] || '')
  }

  const handleChangeMotive = (event: any) => {
    const newMotive = find(motiveReasons, { id : event.target.value });
    cleanState();
    setMotive(newMotive);
    getCalendar(initialDate, endDate, newMotive.id, isFirstAppointment, calendarId).then(
      options => setAvailabilities(displayEverySlot(options, motiveReasons, isFirstAppointment, newMotive.id))
    );
  }

  const validateAppointment = () => {
    const { time } = cellSelected;
    setOpenModal(true)
    isEmpty(timeSlot)
      ? setModalMessage('Select time first to continue booking')
      : setModalMessage(`${isFirstAppointment ? 'First a' : ' A'}ppointment booked for ${time.day}, ${time.month} ${time.number} at ${timeSlot} with motive: ${motive.label}`)
  }

  const handleIsFirstAppointment = (event: any) => {
    setIsFirstAppointment(event.target.value === { yes });
    cleanState();
    getCalendar(initialDate, endDate, motive.id, event.target.value, calendarId).then(
      options => setAvailabilities(displayEverySlot(options, motiveReasons, event.target.value === { yes }, motive.id))
    );
  }

  return (
    <CalendarContainer>
      <h1>Find availability</h1>
      <FormControl>
        <h3>Is this your first appointment with this practitioner?</h3>
        <RadioGroup row defaultValue={yes} onChange={(event: any) => handleIsFirstAppointment(event)}>
          <FormControlLabel value={yes} control={<Radio color='default' />} label='Yes' />
          <FormControlLabel value={no} control={<Radio color='default' />} label='No' />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <h3>What is the reason for your visit?</h3>
        <Select
          value={isEmpty(motive) ? '' : motive.id}
          label='Motive'
          onChange={(e: any) => handleChangeMotive(e)}
        >
          {!isEmpty(motiveReasons) && motiveReasons.map((motive: any, id: any) => {
            return <MenuItem key={id} value={motive.id}>{motive.label}</MenuItem>
          })}
        </Select>
      </FormControl>
      <div>
        <table>
          <thead>
            <tr>
              <th> <Button disabled={!nextPageClicked} onClick={() => handleNextPage(false)}> {'<'} </Button> </th>
              {!isEmpty(calendarRange) && calendarRange.map((time: any, i: any) => {
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
            {!isEmpty(availabilities) && paginate(getArrayOfTr(availabilities), pagination.pageSize, pagination.page).map((a: any, index: any) => {
              return <tr key={index}>
                <td />
                {calendarRange.map((time: any, i: any) => {
                  return !isEmpty(availabilities[time.number]) ?
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
        {isEmpty(availabilities) ? <><EmptyBanner /></> :
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