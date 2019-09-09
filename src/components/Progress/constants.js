export const PROGRESS_STATUS = {
  normal: 'normal',
  error: 'error',
  success: 'success'
};

export const PROGRESS_SIZE = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};

export const PROGRESS_STATUSES = [
  PROGRESS_STATUS.normal,
  PROGRESS_STATUS.error,
  PROGRESS_STATUS.success
];

export const PROGRESS_SIZES = [
  PROGRESS_SIZE.small,
  PROGRESS_SIZE.medium,
  PROGRESS_SIZE.large
];

export const THICKNESS_FROM_SIZE = {
  [PROGRESS_SIZE.small]: 2,
  [PROGRESS_SIZE.medium]: 3,
  [PROGRESS_SIZE.large]: 4
};

export const SIZE_VALUE_FROM_SIZE = {
  [PROGRESS_SIZE.small]: 15,
  [PROGRESS_SIZE.medium]: 36,
  [PROGRESS_SIZE.large]: 56
};
