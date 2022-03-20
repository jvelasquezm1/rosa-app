import * as utils from '../../utils'
import { mockedEndDate } from '../../utils/mocks'

export const intialValues = {
    initialDate_: new Date().toISOString(),
    endDate_: utils.addDaysToDate ? utils.addDaysToDate(5, new Date().toISOString()) : mockedEndDate,
    motive_: '61eea367ddf6c500149ae2cc',
    isFirstAppointment_: true,
    nextPage_: false
}

export const yes = 'yes'
export const no = 'no'

export const initialMotiveReasons = [
    { id: '61eea367ddf6c500149ae2cc', name: 'Cultural fit' },
    { id: '61379ba159d4940022b6c929', name: 'Introduction call' },
    { id: '61eea350ddf6c500149ae2cb', name: 'Technical assessment' }
]
