import { render, userEvent, vi } from 'test-utils';

import { IUserGuideBubbleStepProps } from './types';
import { UserGuideBubbleStep } from './UserGuideBubbleStep';

const DEFAULT_PROPS: IUserGuideBubbleStepProps = {
  headerMessage: 'Header',
  message: 'Text',
  cta: <button>Primary</button>,
  disableTypingAnimations: true,
};

const renderComponent = (props: IUserGuideBubbleStepProps) =>
  render(<UserGuideBubbleStep {...props} />);

describe('<UserGuideBubbleStep> component', () => {
  it('should render all default elements', () => {
    const { getByText, getByRole } = renderComponent(DEFAULT_PROPS);

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Primary' })).toBeInTheDocument();
  });

  it('should call handleAnimationComplete when all bubbles are visible', () => {
    const handleAnimationComplete = vi.fn();
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      handleAnimationComplete,
    });

    userEvent.click(getByRole('button', { name: 'Primary' }));

    expect(handleAnimationComplete).toHaveBeenCalled();
  });
});
