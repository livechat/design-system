import { PROGRESS_STATUSES, PROGRESS_STATUS } from './constants';

export function getPercentNumber(status, percent = 0) {
  if (status === PROGRESS_STATUS.error) {
    return 0;
  }

  return parseInt(percent.toString(), 10);
}

export function getProgressStatus(status, percent) {
  if (!PROGRESS_STATUSES.includes(status) && percent >= 100) {
    return PROGRESS_STATUS.normal;
  }

  return status || PROGRESS_STATUS.normal;
}
