import * as utils from '../../utils'
import { mockedEndDate } from '../../utils/mocks'

const intialValues = {
    initialDate_: new Date().toISOString(),
    endDate_: utils.addDaysToDate ? utils.addDaysToDate(5, new Date().toISOString()) : mockedEndDate,
}

const yes = 'yes'
const no = 'no'
const newPatient = 'newPatient'
const existingPatient = 'existingPatient'

export {
    intialValues,
    yes,
    no,
    newPatient,
    existingPatient
}