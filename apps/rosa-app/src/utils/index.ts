import { find, max } from 'lodash';
import { existingPatient, newPatient } from '../components/calendar/constants';

const getDatesInRange = (startDate: string, endDate: string) => {
    const dates = [];
    const dateISO = new Date(startDate);
    const endDateISO = new Date(endDate);
    while (dateISO <= endDateISO) {
        dates.push({
            month: dateISO.toLocaleString('en-us', { month: 'short' }),
            day: dateISO.toLocaleString('en-us', { weekday: 'short' }),
            number: dateISO.getDate()
        });
        dateISO.setDate(dateISO.getDate() + 1);
    }
    return dates;
}

const getMinutesWithTwoDigits = (initialHour: Date) => initialHour.getMinutes() < 10
    ? `0${initialHour.getMinutes()}`
    : initialHour.getMinutes()

const displayEverySlot = (availabilities: any, motives: any, isNewPatient: boolean, motive: string) => {
    const selectedMotive = find(motives, { id: motive });
    let hours = {} as any;
    const { calendarConfigurations } = selectedMotive;
    availabilities.map((availability: any) => {
        const initialHour = new Date(availability.startAt);
        const endHour = new Date(availability.endAt);
        while (initialHour.getHours() < endHour.getHours()) {
            hours[initialHour.getDate()] = hours[initialHour.getDate()]
                ? Object.assign(hours[initialHour.getDate()],
                    {
                        slots: [...hours[initialHour.getDate()].slots,
                        `${initialHour.getHours()}:${getMinutesWithTwoDigits(initialHour)}`]
                    })
                : { slots: [`${initialHour.getHours()}:${getMinutesWithTwoDigits(initialHour)}`] };
            initialHour.setMinutes(initialHour.getMinutes() + calendarConfigurations[0].defaultDurations[isNewPatient ? newPatient : existingPatient].duration);
        }
    })
    return hours;
}

const getArrayOfTr = (availabilities: any) => Array.from({ length: max(Object.values(availabilities).map((a: any) => a.slots ? a.slots.length : 0)) }, (v: any, i: any) => i);

const addDaysToDate = (numberOfDays: number, date: string) => {
    const currentDate = new Date(date);
    const daysAfterToday = currentDate.setDate(currentDate.getDate() + numberOfDays);
    return new Date(daysAfterToday).toISOString();
}

const paginate = (array: any, page_size: any, page_number: any) => array.slice((page_number - 1) * page_size, page_number * page_size)

export {
    getDatesInRange,
    getMinutesWithTwoDigits,
    displayEverySlot,
    getArrayOfTr,
    addDaysToDate,
    paginate
}