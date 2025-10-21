import { render, userEvent, vi } from 'test-utils';

import { IUserGuideStepProps } from './types';
import { UserGuideStep } from './UserGuideStep';

const DEFAULT_PROPS: IUserGuideStepProps = {
  header: 'Header',
  text: 'Text',
  currentStep: 1,
  stepMax: 2,
  handleClickPrimary: vi.fn(),
};

const renderComponent = (props: IUserGuideStepProps) =>
  render(<UserGuideStep {...props} />);

describe('<UserGuideStep> component', () => {
  it('should render all default elements', () => {
    const { getByText, getByRole } = renderComponent(DEFAULT_PROPS);

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Text')).toBeInTheDocument();
    expect(getByText('/ 2 steps')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('should render image if provided', () => {
    const { getByAltText } = renderComponent({
      ...DEFAULT_PROPS,
      image: { src: 'image.jpg', alt: 'Image' },
    });

    expect(getByAltText('Image')).toBeInTheDocument();
  });

  it('should render video if provided and no image', () => {
    const { getByTestId } = renderComponent({
      ...DEFAULT_PROPS,
      video: { src: 'video.mp4' },
    });

    expect(getByTestId('user-guide-step-video')).toBeInTheDocument();
  });

  it('should call handleClickPrimary when primary button is clicked', () => {
    const handleClickPrimary = vi.fn();
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      handleClickPrimary,
    });

    userEvent.click(getByRole('button', { name: 'Next' }));

    expect(handleClickPrimary).toHaveBeenCalled();
  });

  it('should call handleCloseAction when skip button is clicked', () => {
    const handleCloseAction = vi.fn();
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      handleCloseAction,
    });

    userEvent.click(getByRole('button', { name: 'Skip all' }));

    expect(handleCloseAction).toHaveBeenCalled();
  });

  it('should change primary button content when currentStep is equal to stepMax', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      currentStep: 2,
    });

    expect(getByRole('button', { name: 'Finish' })).toBeInTheDocument();
  });

  it('should render custom cta when provided', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      customCta: 'Custom CTA',
    });

    expect(getByRole('button', { name: 'Custom CTA' })).toBeInTheDocument();
  });
});
