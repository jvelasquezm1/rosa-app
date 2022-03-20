import { get } from './api';
import { ICalendar } from '../types/calendar.model';

export const getCalendar = async (initialDate: string,
  endDate: string,
  motive: string,
  isNewPatient: boolean,
  calendarId: string): Promise<ICalendar[]> => {
  return (await get<ICalendar[]>(
    `availabilities?from=${initialDate}&to=${endDate}&motive_id=${motive}&is_new_patient=${isNewPatient}&calendar_ids=${calendarId}`)).data;
};

export const fetchCommonData = async (): Promise<any> => {
  return (await get<any>(
    'web-pages/hps/antoine-staging-pairet'
  ))
}
