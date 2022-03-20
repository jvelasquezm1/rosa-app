export interface ICalendar {
    initialDate: string,
    endDate: string,
    motive: string,
    isNewPatient: boolean,
    nextPage: boolean
}
export interface ICalendarRange {
    month: string,
    day: string,
    number: number
}