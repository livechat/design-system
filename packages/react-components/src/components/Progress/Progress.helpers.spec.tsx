import { getPercentNumber } from './Progress.helpers';

describe('getPercentNumber', () => {
  it('should return 0 if status error is passed', () => {
    const percentNumber = getPercentNumber('error', 10);

    expect(percentNumber).toBe(0);
  });

  it('should return percent if status is not error', () => {
    const percentNumber = getPercentNumber('normal', 10);

    expect(percentNumber).toBe(10);
  });
});
