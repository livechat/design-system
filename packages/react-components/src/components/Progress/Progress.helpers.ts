import { ProgressStatus } from './constants';

const clampPercentage = (percent: number): number =>
  Math.min(Math.max(percent, 0), 100);

export function getPercentNumber(status: ProgressStatus, percent = 0): number {
  if (status === 'error') {
    return 0;
  }

  return clampPercentage(parseInt(percent.toString(), 10));
}
