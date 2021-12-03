import { PROGRESS_STATUSES, ProgressStatus } from './constants';

const clampPercentage = (percent: number): number =>
  Math.min(Math.max(percent, 0), 100);

export function getPercentNumber(status: ProgressStatus, percent = 0): number {
  if (status === ProgressStatus.Error) {
    return 0;
  }

  return clampPercentage(parseInt(percent.toString(), 10));
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
