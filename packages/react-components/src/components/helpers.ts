import { PROGRESS_STATUSES, ProgressStatus } from './constants';

export function getPercentNumber(status: ProgressStatus, percent = 0): number {
  if (status === ProgressStatus.Error) {
    return 0;
  }

  return parseInt(percent.toString(), 10);
}

export function getProgressStatus(
  status: ProgressStatus,
  percent: number
): ProgressStatus {
  if (!PROGRESS_STATUSES.includes(status) && percent >= 100) {
    return ProgressStatus.Normal;
  }

  return status || ProgressStatus.Normal;
}
