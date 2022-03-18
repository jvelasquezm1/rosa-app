export const getDatesInRange = (startDate: string, endDate: string) => {
    const dates = [];
    const dateISO = new Date(startDate);
    const endDateISO = new Date(endDate);
    while (dateISO <= endDateISO) {
        dates.push(new Date(dateISO));
        dateISO.setDate(dateISO.getDate() + 1);
    }
    return dates;
}

const getMinutesWithTwoDigits = (initialHour: Date) => initialHour.getMinutes() < 10
    ? `0${initialHour.getMinutes()}`
    : initialHour.getMinutes()

export const displayEvery30Min = (availability: any) => {
    const hours = [] as any;
    const initialHour = new Date(availability.startAt);
    const endHour = new Date(availability.endAt);
    while (initialHour.getHours() < endHour.getHours()) {
        hours.push(`${initialHour.getHours()}:${getMinutesWithTwoDigits(initialHour)}`);
        initialHour.setMinutes(initialHour.getMinutes() + 30);
    }
    return hours;
}

export const addDaysToDate = (numberOfDays: number, date: string) => {
    const currentDate = new Date(date);
    const daysAfterToday = currentDate.setDate(currentDate.getDate() + numberOfDays);
    return new Date(daysAfterToday).toISOString();
}

export const convertDateToISO = (date?: string) => {
    const currentDate = new Date();
    return date ? new Date(date).toISOString() : currentDate.toISOString();
}