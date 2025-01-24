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
  'data-testid': dataTestId,
  ...divProps
}) => {
  if (activeStep < 1 || activeStep > steps) {
    throw new Error(`Active step must be between 1 and ${steps}`);
  }

  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames} data-testid={dataTestId} {...divProps}>
      <Text size="sm" className={styles[`${baseClass}__counter`]}>
        {activeStep}/{steps}
      </Text>
      <div className={styles[`${baseClass}__steps__container`]}>
        {Array.from({ length: steps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= activeStep;
          const isActive = stepNumber > activeStep;

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
