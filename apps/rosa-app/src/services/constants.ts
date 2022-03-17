const currentDate = new Date();
const newDate = new Date();
const nineDaysAfterToday = currentDate.setDate(currentDate.getDate() + 10);
const timestampInitialDate = newDate.toISOString();
const timestampEndDate = new Date(nineDaysAfterToday).toISOString();

export const mockedValues = {
    initialDate_: timestampInitialDate,
    endDate_: timestampEndDate,
    motive_: '61eea367ddf6c500149ae2cc',
    isNewPatient_: true,
    nextPage_: false
}

export const yes = 'yes'
export const no = 'no'

export const motiveReasons = [
    { id: '61eea367ddf6c500149ae2cc', name: 'Cultural fit' },
    { id: '61379ba159d4940022b6c929', name: 'Introduction call' },
    { id: '61eea350ddf6c500149ae2cb', name: 'Technical assessment' }
]

export const daysInitials = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
