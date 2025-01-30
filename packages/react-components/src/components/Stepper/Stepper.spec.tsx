import { render, screen } from '@testing-library/react';

import { Stepper } from './Stepper';

describe('Stepper', () => {
  it('displays correct number of steps', () => {
    render(<Stepper activeStep={2} steps={4} />);

    const stepsContainer = screen.getByTestId('stepper-container');

    expect(stepsContainer?.children.length).toBe(4);
  });

  it('marks steps as completed and active correctly', () => {
    render(<Stepper activeStep={2} steps={3} />);

    const steps = screen.getByTestId('stepper-container').children;

    expect(steps[0].getAttribute('aria-completed')).toBe('true');
    expect(steps[1].getAttribute('aria-completed')).toBe('true');
    expect(steps[2].getAttribute('aria-completed')).toBe('false');
  });

  it('accepts and applies custom className', () => {
    const customClass = 'custom-class';
    render(<Stepper activeStep={1} steps={3} className={customClass} />);

    expect(screen.getByTestId('stepper')).toHaveClass(customClass);
  });
  it('passes additional props to the main div', () => {
    render(<Stepper activeStep={1} steps={3} aria-label="progress" />);

    expect(screen.getByTestId('stepper')).toHaveAttribute(
      'aria-label',
      'progress'
    );
  });
  describe('boundary values and normalization', () => {
    it('should set minimum steps value to 1 when negative value is provided', () => {
      render(<Stepper steps={-5} activeStep={1} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('1/1');
    });

    it('should set minimum steps value to 1 when zero is provided', () => {
      render(<Stepper steps={0} activeStep={1} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('1/1');
    });

    it('should normalize activeStep to 1 when negative value is provided', () => {
      render(<Stepper steps={5} activeStep={-3} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('1/5');
    });

    it('should normalize activeStep to steps value when exceeding number of steps', () => {
      render(<Stepper steps={3} activeStep={10} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('3/3');
    });

    it('should properly normalize both steps and activeStep', () => {
      render(<Stepper steps={-2} activeStep={-3} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('1/1');
    });

    it('should normalize activeStep to steps value when activeStep is a float', () => {
      render(<Stepper steps={5} activeStep={1.5} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('2/5');
    });
    it('should normalize steps to 1 when steps is a float', () => {
      render(<Stepper steps={1.5} activeStep={1} />);

      expect(screen.getByTestId('stepper')).toHaveTextContent('1/2');
    });
  });
});
