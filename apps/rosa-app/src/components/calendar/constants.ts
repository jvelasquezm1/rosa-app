import * as utils from '../../utils'
import { mockedEndDate } from '../../utils/mocks'

const yes = 'yes'
const no = 'no'
const newPatient = 'newPatient'
const existingPatient = 'existingPatient'
const rangeOfDaysDisplayed = 7

const initialValues = {
    initialDate_: new Date().toISOString(),
    endDate_: utils.addDaysToDate
        ? utils.addDaysToDate(rangeOfDaysDisplayed - 1, new Date().toISOString())
        : mockedEndDate,
}

export {
    initialValues,
    yes,
    no,
    newPatient,
    existingPatient,
    rangeOfDaysDisplayed
}