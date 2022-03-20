import * as utils from '.';
import {
  minuteLessThanTen,
  mockedEndDate,
  mockedRange,
  mockedStartDate,
  mockedAvailabilities,
  mocked30MinutesRange,
  arrayOf9Elements,
  mockedStartDatePlus5Days
} from './mocks';

describe('Utils of calendar', () => {
  it('should get dates according to provided range successfully', () => {
    const range = utils.getDatesInRange(mockedStartDate, mockedEndDate);
    expect(range).toEqual(mockedRange);
  });

  it('should add one 0 in case is less than 10', () => {
    const minute = utils.getMinutesWithTwoDigits(minuteLessThanTen);
    expect(minute).toEqual(`0${minuteLessThanTen.getMinutes()}`);
  });

  it('should display range of time every 30 minutes', () => {
    const availabilitiesEvery30Minutes = utils.displayEvery30Min(mockedAvailabilities);
    expect(availabilitiesEvery30Minutes).toEqual(mocked30MinutesRange);
  });

  it('should return an array with size of the highest number of slots in one availabliity', () => {
    const availabilitiesEvery30Minutes = utils.displayEvery30Min(mockedAvailabilities);
    const maxArray = utils.getArrayOfTr(availabilitiesEvery30Minutes);
    expect(maxArray).toEqual(arrayOf9Elements);
  });

  it('should add 5 days to the provided date', () => {
    const newDate = utils.addDaysToDate(5, mockedStartDate);
    expect(newDate).toEqual(mockedStartDatePlus5Days);
  });

  it('should slice an array according to the provided number', () => {
    const paginated = utils.paginate(arrayOf9Elements, 3, 1);
    expect(paginated).toEqual(arrayOf9Elements.slice(0,3));
  });
});
