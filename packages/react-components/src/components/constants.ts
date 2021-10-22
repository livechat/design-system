// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export enum ProgressStatus {
  Normal = 'normal',
  Error = 'error',
  Success = 'success',
}

export enum ProgressSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const PROGRESS_STATUSES = [
  ProgressStatus.Normal,
  ProgressStatus.Error,
  ProgressStatus.Success,
];

export const PROGRESS_SIZES = [
  ProgressSize.Small,
  ProgressSize.Medium,
  ProgressSize.Large,
];
