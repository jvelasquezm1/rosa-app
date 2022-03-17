import { get } from './api';
import { ICalendar } from '../types/calendar.model';

export const getCalendar = async (initialDate: string,
  endDate: string,
  motive: string,
  isNewPatient: boolean,
  nextPage: boolean): Promise<ICalendar[]> => {
  return (await get<ICalendar[]>(`availabilities${nextPage ? 'next' : ''}?from=${initialDate}&to=${endDate}&motive_id=${motive}&is_new_patient=${isNewPatient}&calendar_ids=61379ba159d4940022b6c928`)).data;
};
