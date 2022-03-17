import { useEffect, useState } from 'react'
import { getCalendar } from '../services/calendar.services'
import { mockedValues, motiveReasons, no, yes } from '../services/constants';
import { displayEvery30Min, getDatesInRange, paginate } from '../utils';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { ICalendar } from '../types/calendar.model';

export default function Card() {
  const { motive_, isNewPatient_, nextPage_ } = mockedValues
  const [motive, setMotive] = useState(motive_ as string)
  const [isNewPatient, setIsNewPatient] = useState(isNewPatient_)
  const [nextPage, setNextPage] = useState(nextPage_)
  const [calendarRange, setCalendarRange] = useState([] as Date[])
  const [availabilities, setAvailabilities] = useState([] as ICalendar[])

  useEffect(() => {
    const { initialDate_, endDate_ } = mockedValues
    setCalendarRange(getDatesInRange(initialDate_, endDate_));
    getCalendar(initialDate_, endDate_, motive, isNewPatient, nextPage).then(
      options => setAvailabilities(options)
    )
  }, []);

  const renderHours = (day: any, availability: any) => {
    const timeRange = displayEvery30Min(availability)
    return timeRange.map((hour: any, i: any) =>
      <TableRow key={i}>
        <TableCell component='th' scope='row'>
          <Button>{parseInt(day.toString().split(' ')[2]) === availability.day ? hour : '-'}</Button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <FormControl>
        <FormLabel id='appointment-label'>Is this your first appointment with this practitioner?</FormLabel>
        <RadioGroup row defaultValue={yes} onChange={(e: any) => setIsNewPatient(e.target.value === { yes })}>
          <FormControlLabel value={yes} control={<Radio />} color='secondary' label='Yes' />
          <FormControlLabel value={no} control={<Radio />} color='secondary' label='No' />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>What is the reason for your visit?</InputLabel>
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
            <TableCell> <Button onClick={() => setNextPage(false)}> {'<'} </Button> </TableCell>
            {paginate(calendarRange, 5, nextPage ? 2 : 1).map((day: object, i: any) => {
              return (
                <TableCell key={i} component='th' scope='row'>
                  <p>{day.toString().split(' ')[0]}</p>
                  <p>{day.toString().split(' ')[1]} - {day.toString().split(' ')[2]}</p>
                </TableCell>
              );
            })}
            <TableCell> <Button onClick={() => setNextPage(true)}> {'>'} </Button> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableCell/>
          {paginate(calendarRange, 5, nextPage ? 2 : 1).map((day: object, i: any) => {
            return (
              <TableCell key={i} component='th' scope='row'>
                {availabilities.map((availability: any, i: any) => renderHours(day, availability))}
              </TableCell>
            );
          })}
          <TableCell/>
        </TableBody>
      </Table>
    </>
  )
}
