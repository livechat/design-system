import { isAfter, isSameDay } from 'date-fns';

/* eslint-disable no-useless-escape */

/**
 * Helper for checking if input value has format YYYY-MM-DD
 * @param {string} value
 * @returns {boolean}
 */
export const isValidDateFormat = value => {
  if (
    value.match(
      /^(?:(19|20)[0-9]{2})[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/
    )
  ) {
    return true;
  }
  return false;
};
/* eslint-enable no-useless-escape */

export const isDateWithinRange = (date, range) => {
  const { from, to } = range;
  if (to && !isSameDay(date, to) && isAfter(date, to)) {
    return false;
  }
  if (from && !isSameDay(date, from) && !isAfter(date, from)) {
    return false;
  }
  return true;
};
