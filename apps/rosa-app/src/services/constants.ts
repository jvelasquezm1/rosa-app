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

export const mockedResponse = [
    {
        '_id': '6229ddb1344c996a1b93b212',
        'eventIds': [],
        'motiveIds': [
            '61379ba159d4940022b6c929',
            '61eea350ddf6c500149ae2cb'
        ],
        'calendarId': '61379ba159d4940022b6c928',
        'nextAvailabilityId': '621763d7a559a8797a83eccf',
        'appointmentSlotId': '621763d7a559a8797a83ecc9',
        'meridiem': 'am',
        'state': 'open',
        'duration': 150,
        'endAt': '2022-03-18T11:00:00.000Z',
        'startAt': '2022-03-18T08:30:00.000Z',
        'dayOfTheWeek': 5,
        'year': 2022,
        'month': 2,
        'day': 19,
        'createdAt': '2022-03-10T11:14:57.619Z',
        'updatedAt': '2022-03-10T11:14:57.619Z',
        '__v': 0,
        'id': '6229ddb1344c996a1b93b212'
    },
    {
        '_id': '621763d7a559a8797a83eccf',
        'eventIds': [
            '6229ddb1344c996a1b93b20c'
        ],
        'motiveIds': [
            '61379ba159d4940022b6c929',
            '61eea350ddf6c500149ae2cb',
            '61eea367ddf6c500149ae2cc'
        ],
        'calendarId': '61379ba159d4940022b6c928',
        'nextAvailabilityId': '6229ddb1344c996a1b93b213',
        'previousAvailabilityId': '6229ddb1344c996a1b93b212',
        'appointmentSlotId': '621763d7a559a8797a83ecc9',
        'meridiem': 'am',
        'state': 'booked',
        'duration': 180,
        'endAt': '2022-03-18T14:00:00.000Z',
        'startAt': '2022-03-18T11:00:00.000Z',
        'createdAt': '2022-02-24T10:54:15.046Z',
        'updatedAt': '2022-03-10T11:14:57.624Z',
        'day': 18,
        'month': 2,
        'year': 2022,
        'dayOfTheWeek': 5,
        '__v': 0,
        'id': '621763d7a559a8797a83eccf'
    },
    {
        '_id': '6229ddb1344c996a1b93b213',
        'eventIds': [],
        'motiveIds': [
            '61379ba159d4940022b6c929',
            '61eea350ddf6c500149ae2cb',
            '61eea367ddf6c500149ae2cc'
        ],
        'calendarId': '61379ba159d4940022b6c928',
        'previousAvailabilityId': '621763d7a559a8797a83eccf',
        'appointmentSlotId': '621763d7a559a8797a83ecc9',
        'meridiem': 'am',
        'state': 'open',
        'duration': 210,
        'endAt': '2022-03-18T17:30:00.000Z',
        'startAt': '2022-03-18T14:00:00.000Z',
        'dayOfTheWeek': 5,
        'year': 2022,
        'month': 2,
        'day': 18,
        'createdAt': '2022-03-10T11:14:57.619Z',
        'updatedAt': '2022-03-10T11:14:57.619Z',
        '__v': 0,
        'id': '6229ddb1344c996a1b93b213'
    }
]