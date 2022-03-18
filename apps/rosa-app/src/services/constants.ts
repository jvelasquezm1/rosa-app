import { addDaysToDate, convertDateToISO } from '../utils'

export const mockedValues = {
    initialDate_: convertDateToISO(),
    endDate_: addDaysToDate(5, convertDateToISO()),
    motive_: '61eea367ddf6c500149ae2cc',
    isNewPatient_: true,
    nextPage_: false
}

export const yes = 'yes'
export const no = 'no'

export const initialMotiveReasons = [
    { id: '61eea367ddf6c500149ae2cc', name: 'Cultural fit' },
    { id: '61379ba159d4940022b6c929', name: 'Introduction call' },
    { id: '61eea350ddf6c500149ae2cb', name: 'Technical assessment' }
]
