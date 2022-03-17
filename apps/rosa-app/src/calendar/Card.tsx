import { useEffect, useState } from 'react'
import { getCalendar } from '../services/calendar.services'
import { getDatesInRange } from '../utils';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
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

  return (
    <>
      <Table size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell> <Button onClick={() => setNextPage(false)}> {'<'} </Button> </TableCell>
            {calendarRange.map((day: object, i: any) => {
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
          {calendarRange.map((day: object, i: any) => {
            return (
              <TableCell key={i} component='th' scope='row'>
                {availabilities.map((availability: any, i: any) => availability.day)}
              </TableCell>
            );
          })}
          <TableCell/>
        </TableBody>
      </Table>
    </>
  )
}
