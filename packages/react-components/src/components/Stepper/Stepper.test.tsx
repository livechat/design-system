import { render, screen } from '@testing-library/react';

import { Stepper } from './Stepper';

describe('Stepper', () => {
  it('displays correct number of steps', () => {
    render(<Stepper activeStep={2} steps={4} />);

    const stepsContainer = screen
      .getByTestId('stepper')
      .querySelector('.stepper__steps__container');
    expect(stepsContainer?.children.length).toBe(4);
  });

  it('marks steps as completed and active correctly', () => {
    render(<Stepper activeStep={2} steps={3} />);

    const steps = screen
      .getByTestId('stepper')
      .querySelectorAll('.stepper__step');

    expect(steps[0]).toHaveClass('stepper__step--completed');
    expect(steps[1]).toHaveClass('stepper__step--completed');
    expect(steps[2]).toHaveClass('stepper__step--active');
  });

  it('accepts and applies custom className', () => {
    const customClass = 'custom-class';
    render(<Stepper activeStep={1} steps={3} className={customClass} />);

    expect(screen.getByTestId('stepper')).toHaveClass(customClass);
  });

  it('throws error when activeStep is out of range', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<Stepper activeStep={0} steps={3} />);
    }).toThrow('Active step must be between 1 and 3');

    expect(() => {
      render(<Stepper activeStep={4} steps={3} />);
    }).toThrow('Active step must be between 1 and 3');

    consoleSpy.mockRestore();
  });

  it('passes additional props to the main div', () => {
    render(<Stepper activeStep={1} steps={3} aria-label="progress" />);

    expect(screen.getByTestId('stepper')).toHaveAttribute(
      'aria-label',
      'progress'
    );
  });
});
