const mockedRange = [
    {
        'month': 'Mar',
        'day': 'Fri',
        'number': 18
    },
    {
        'month': 'Mar',
        'day': 'Sat',
        'number': 19
    }
]

const mockedStartDate = '2022-03-18T11:00:00.000Z'
const mockedEndDate = '2022-03-19T11:00:00.000Z'
const mockedStartDatePlus5Days = '2022-03-23T11:00:00.000Z'
const minuteLessThanTen = new Date('Sun Mar 20 2022 12:01')

const mockedAvailabilities = [
    {
        'motiveIds': [
            '61379ba159d4940022b6c929',
            '61eea350ddf6c500149ae2cb',
            '61eea367ddf6c500149ae2cc'
        ],
        'endAt': '2022-03-18T11:00:00.000Z',
        'startAt': '2022-03-18T08:30:00.000Z'
    },
    {
        'motiveIds': [
            '61379ba159d4940022b6c929',
            '61eea350ddf6c500149ae2cb',
            '61eea367ddf6c500149ae2cc'
        ],
        'endAt': '2022-03-18T16:00:00.000Z',
        'startAt': '2022-03-18T14:00:00.000Z'
    }
]

const mocked30MinutesRange = {
    '18': {
        slots: [
            '9:30', '10:00',
            '10:30', '11:00',
            '11:30', '15:00',
            '15:30', '16:00',
            '16:30'
        ],
        motives: [
            '61379ba159d4940022b6c929',
            '61eea350ddf6c500149ae2cb',
            '61eea367ddf6c500149ae2cc'
        ]
    }
}

const arrayOf9Elements = Array.from({ length: 9 }, (v: any, i: any) => i)

export {
    mockedRange,
    mockedStartDate,
    mockedEndDate,
    mockedStartDatePlus5Days,
    minuteLessThanTen,
    mockedAvailabilities,
    mocked30MinutesRange,
    arrayOf9Elements
}