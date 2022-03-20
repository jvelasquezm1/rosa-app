import { max } from 'lodash';
import { initialMotiveReasons } from '../services/constants';

export const getDatesInRange = (startDate: string, endDate: string) => {
    const dates = [];
    const dateISO = new Date(startDate);
    const endDateISO = new Date(endDate);
    while (dateISO <= endDateISO) {
        dates.push({
            month: dateISO.toLocaleString('en-us', { month: 'short' }),
            day: dateISO.toLocaleString('en-us', { weekday: 'short' }),
            number: dateISO.getDate() });
        dateISO.setDate(dateISO.getDate() + 1);
    }
    return dates;
}

const getMinutesWithTwoDigits = (initialHour: Date) => initialHour.getMinutes() < 10
    ? `0${initialHour.getMinutes()}`
    : initialHour.getMinutes()

export const displayEvery30Min = (availabilities: any) => {
    let hours = {} as any;
    availabilities.map((availability: any) => {
        const initialHour = new Date(availability.startAt);
        const endHour = new Date(availability.endAt);
        while (initialHour.getHours() < endHour.getHours()) {
            hours[initialHour.getDate()] = hours[initialHour.getDate()]
                ? Object.assign(hours[initialHour.getDate()],
                    {
                        motives: availability.motiveIds,
                        slots: [...hours[initialHour.getDate()].slots,
                        `${initialHour.getHours()}:${getMinutesWithTwoDigits(initialHour)}`]
                    })
                : { slots: [`${initialHour.getHours()}:${getMinutesWithTwoDigits(initialHour)}`], motives: initialMotiveReasons };
            initialHour.setMinutes(initialHour.getMinutes() + 30);
        }
    })
    return hours;
}

export const getArrayOfTr = (availabilities: any) => Array.from({ length: max(Object.values(availabilities).map((a: any) => a.slots.length)) }, (v: any, i: any) => i);

export const addDaysToDate = (numberOfDays: number, date: string) => {
    const currentDate = new Date(date);
    const daysAfterToday = currentDate.setDate(currentDate.getDate() + numberOfDays);
    return new Date(daysAfterToday).toISOString();
}

export const convertDateToISO = (date?: string) => {
    const currentDate = new Date();
    return date ? new Date(date).toISOString() : currentDate.toISOString();
}

export const paginate = (array: any, page_size: any, page_number: any) => array.slice((page_number - 1) * page_size, page_number * page_size)
