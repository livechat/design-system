import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import * as styles from './styles';
import { StepperProps } from './types';

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

  return (
    <div
      className={className}
      data-testid={dataTestId}
      aria-label="Stepper"
      {...divProps}
    >
      <Text size="sm" className={styles.stepperCounter}>
        {normalizedActiveStep}/{normalizedSteps}
      </Text>
      <div
        className={styles.stepperStepsContainer}
        data-testid={`${dataTestId}-container`}
      >
        {Array.from({ length: normalizedSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= normalizedActiveStep;
          const isActive = stepNumber > normalizedActiveStep;

          return (
            <div
              key={stepNumber}
              aria-completed={isCompleted}
              className={cx(styles.stepperStep(isCompleted, isActive))}
            />
          );
        })}
      </div>
    </div>
  );
};
