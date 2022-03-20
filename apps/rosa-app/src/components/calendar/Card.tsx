import { useEffect, useState } from 'react'
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
import { filter, find, includes, isEmpty } from 'lodash';
import { ButtonCalendar, CalendarContainer, DivCenter, StyledP } from './styles';

import EmptyBanner from '../common/EmptyBanner';
import { getCalendar } from '../../services/calendar.services'
import { intialValues, initialMotiveReasons, no, yes } from './constants';
import { addDaysToDate, displayEvery30Min, getArrayOfTr, getDatesInRange, paginate } from '../../utils';
import { ICalendarRange } from '../../types/calendar.model';

export default function Card() {
  const { motive_, isFirstAppointment_ } = intialValues
  const [motive, setMotive] = useState(motive_ as string)
  const [isFirstAppointment, setIsFirstAppointment] = useState(isFirstAppointment_)
  const [calendarRange, setCalendarRange] = useState([] as ICalendarRange[])
  const [availabilities, setAvailabilities] = useState({} as any)
  const [nextPageClicked, setNextPageClicked] = useState(false)
  const [displayShowMore, setDisplayShowMore] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [motiveReasons, setMotiveReasons] = useState(initialMotiveReasons)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 6
  })
  const [timeSlot, setTimeSlot] = useState('')
  const [cellSelected, setCellSelected] = useState({} as any)

  useEffect(() => {
    const { initialDate_, endDate_ } = intialValues
    setCalendarRange(getDatesInRange(initialDate_, endDate_));
    getCalendar(initialDate_, endDate_, motive, isFirstAppointment).then(
      options => setAvailabilities(displayEvery30Min(options))
    );
  }, []);

  const handleNextPage = (nextPage: boolean) => {
    const { initialDate_, endDate_ } = intialValues
    if (nextPage) {
      setNextPageClicked(true)
      setCalendarRange(getDatesInRange(addDaysToDate(5, initialDate_), addDaysToDate(5, endDate_)));
      getCalendar(addDaysToDate(5, initialDate_), addDaysToDate(5, endDate_), motive, isFirstAppointment).then(
        options => setAvailabilities(displayEvery30Min(options))
      );
    } else {
      setNextPageClicked(false);
      setCalendarRange(getDatesInRange(initialDate_, endDate_));
      getCalendar(initialDate_, endDate_, motive, isFirstAppointment).then(
        options => setAvailabilities(displayEvery30Min(options))
      );
    }
  }

  const handleMotives = (availability: any) => {
    if (!includes(availability.motives, motive)) {
      setMotive(availability.motives[0])
    }
    setMotiveReasons(filter(initialMotiveReasons, (motive) => includes(availability.motives, motive.id)))
  }

  const handleShowMore = () => {
    setPagination({ ...pagination, pageSize: getArrayOfTr(availabilities).length })
    setDisplayShowMore(false)
  }

  const handleTimeSelection = (time: any, index: number, i: number) => {
    setCellSelected({ id: `${index}:${i}`, time: time })
    handleMotives(availabilities[time.number])
    setTimeSlot(availabilities[time.number].slots[index] || '')
  }

  const validateAppointment = () => {
    const motiveReason = find(motiveReasons, { id: motive }) || { name: '' },
      { time } = cellSelected;
    setOpenModal(true)
    isEmpty(timeSlot)
      ? setModalMessage('Select time first to continue booking')
      : setModalMessage(`${isFirstAppointment ? 'First a' : ' A'}ppointment booked for ${time.day}, ${time.month} ${time.number} at ${timeSlot} with motive: ${motiveReason.name}`)
  }

  return (
    <CalendarContainer>
      <h1>Find availability</h1>
      <FormControl>
        <h3>Is this your first appointment with this practitioner?</h3>
        <RadioGroup row defaultValue={yes} onChange={(e: any) => setIsFirstAppointment(e.target.value === { yes })}>
          <FormControlLabel value={yes} control={<Radio color='default' />} label='Yes' />
          <FormControlLabel value={no} control={<Radio color='default' />} label='No' />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <h3>What is the reason for your visit?</h3>
        <Select
          value={motive}
          label='Motive'
          onChange={(e: any) => setMotive(e.target.value)}
        >
          {motiveReasons.map((motive, id) => {
            return <MenuItem key={id} value={motive.id}>{motive.name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <div>
        <table>
          <thead>
            <tr>
              <th> <Button disabled={!nextPageClicked} onClick={() => handleNextPage(false)}> {'<'} </Button> </th>
              {calendarRange.map((time: any, i: any) => {
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
