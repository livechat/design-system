import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import { StepperProps } from './types';

import styles from './Stepper.module.scss';

const baseClass = 'stepper';

export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  steps,
  className,
  'data-testid': dataTestId = 'stepper',
  ...divProps
}) => {
  const normalizedSteps = Math.round(Math.max(1, steps));

  const normalizedActiveStep = Math.round(
    Math.min(Math.max(1, activeStep), normalizedSteps)
  );

  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames} data-testid={dataTestId} {...divProps}>
      <Text size="sm" className={styles[`${baseClass}__counter`]}>
        {normalizedActiveStep}/{normalizedSteps}
      </Text>
      <div
        className={styles[`${baseClass}__steps__container`]}
        data-testid={`${dataTestId}-container`}
      >
        {Array.from({ length: normalizedSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= normalizedActiveStep;
          const isActive = stepNumber > normalizedActiveStep;

          return (
            <div
              key={stepNumber}
              className={cx(styles[`${baseClass}__step`], {
                [styles[`${baseClass}__step--completed`]]: isCompleted,
                [styles[`${baseClass}__step--active`]]: isActive,
              })}
            />
          );
        })}
      </div>
    </div>
  );
};
