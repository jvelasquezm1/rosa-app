interface ICardProps {
    commonData: ICommonData
}

interface ICommonData {
    data: {
        motives: IMotives[]
        calendars: ICalendars[]
    }
}

interface IMotives {
    id: string,
    label: string,
    calendarConfigurations: ICalendarConfiguration[]
}

interface ICalendars {
    id: string,
    siteId: string,
    ownerId: string
}

interface ICalendarConfiguration {
    defaultDurations: {
        newPatient: IPatient,
        existingPatient: IPatient
    },
    calendarId: string
}

interface IPatient {
    duration: 30,
    isOnlineBookingAllowed: true
}

interface IAvailabilities {
    slots: {}
}

interface ICell {
    id?: string,
    time?: ISlot
}

interface ISlot {
    month: string,
    day: string,
    number: number|keyof IAvailabilities
}

interface IPagination {
    page: number,
    pageSize: number
}
