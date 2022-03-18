import { useEffect, useState } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Select,
  MenuItem
} from '@material-ui/core';
import { filter, includes, isEmpty } from 'lodash';
import { CalendarContainer } from './styles';

import { ICalendar } from '../../types/calendar.model';
import EmptyBanner from '../common/EmptyBanner';
import { getCalendar } from '../../services/calendar.services'
import { mockedValues, initialMotiveReasons, no, yes } from '../../services/constants';
import { addDaysToDate, displayEvery30Min, getDatesInRange } from '../../utils';

export default function Card() {
  const { motive_, isNewPatient_ } = mockedValues
  const [motive, setMotive] = useState(motive_ as string)
  const [isNewPatient, setIsNewPatient] = useState(isNewPatient_)
  const [calendarRange, setCalendarRange] = useState([] as Date[])
  const [availabilities, setAvailabilities] = useState([] as ICalendar[])
  const [nextPageClicked, setNextPageClicked] = useState(false)
  const [motiveReasons, setMotiveReasons] = useState(initialMotiveReasons)

  useEffect(() => {
    const { initialDate_, endDate_ } = mockedValues
    setCalendarRange(getDatesInRange(initialDate_, endDate_));
    getCalendar(initialDate_, endDate_, motive, isNewPatient).then(
      options => setAvailabilities(options)
    );
  }, []);

  const handleNextPage = (nextPage: boolean) => {
    const { initialDate_, endDate_ } = mockedValues
    if (nextPage) {
      setNextPageClicked(true)
      setCalendarRange(getDatesInRange(addDaysToDate(5, initialDate_), addDaysToDate(5, endDate_)));
      getCalendar(addDaysToDate(5, initialDate_), addDaysToDate(5, endDate_), motive, isNewPatient).then(
        options => setAvailabilities(options)
      );
    } else {
      setNextPageClicked(false);
      setCalendarRange(getDatesInRange(initialDate_, endDate_));
      getCalendar(initialDate_, endDate_, motive, isNewPatient).then(
        options => setAvailabilities(options)
      );
    }
  }

  const handleMotives = (availability: any) => {
    if (!includes(availability.motiveIds, motive)) {
      setMotive(availability.motiveIds[0])
    }
    setMotiveReasons(filter(initialMotiveReasons, (motive) => includes(availability.motiveIds, motive.id)))
  }

  const renderHours = (day: any, availability: any) => {
    const timeRange = displayEvery30Min(availability)
    return timeRange.map((hour: any, i: any) =>
      <TableRow key={i}>
        <TableCell component='th' scope='row'>
          <Button onClick={() => handleMotives(availability)}>{parseInt(day.toString().split(' ')[2]) === availability.day ? hour : '-'}</Button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <CalendarContainer>
      <h1>Find availability</h1>
      <FormControl>
        <h3>Is this your first appointment with this practitioner?</h3>
        <RadioGroup row defaultValue={yes} onChange={(e: any) => setIsNewPatient(e.target.value === { yes })}>
          <FormControlLabel value={yes} control={<Radio color='default'/>} label='Yes' />
          <FormControlLabel value={no} control={<Radio color='default'/>} label='No' />
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
      <Table size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell> <Button disabled={!nextPageClicked} onClick={() => handleNextPage(false)}> {'<'} </Button> </TableCell>
            {calendarRange.map((day: object, i: any) => {
              return (
                <TableCell key={i} component='th' scope='row'>
                  <p>{day.toString().split(' ')[0]}</p>
                  <p>{day.toString().split(' ')[1]} {day.toString().split(' ')[2]}</p>
                </TableCell>
              );
            })}
            <TableCell> <Button disabled={nextPageClicked} onClick={() => handleNextPage(true)}> {'>'} </Button> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell />
          {calendarRange.map((day: object, i: any) => {
            return isEmpty(availabilities)
              ? <TableCell key={i} component='th' scope='row'> - </TableCell>
              : (
                <TableCell key={i} component='th' scope='row'>
                  {availabilities.map((availability: any, i: any) => renderHours(day, availability))}
                </TableCell>
              );
          })}
          <TableCell />
        </TableBody>
      </Table>
      {isEmpty(availabilities) && <><EmptyBanner /></>}
    </CalendarContainer>
  )
}
