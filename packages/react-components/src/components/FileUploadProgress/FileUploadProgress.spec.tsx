import { vi } from 'vitest';

import { render, fireEvent } from 'test-utils';

import {
  FileUploadProgress,
  FileUploadProgressProps,
} from './FileUploadProgress';

const defaultProps = {
  title: 'File upload',
  progressValue: 50,
};

const renderComponent = (props: FileUploadProgressProps) =>
  render(<FileUploadProgress {...props} />);

describe('<FileUploadProgress> component', () => {
  it('should allow to custom class name which will be passed to ProgressBar component', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('progressbar')).toHaveClass('custom-class');
  });

  it('should render given title', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('File upload')).toBeInTheDocument();
  });

  it('should render icon when status is not success', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      icon: <span data-testid="icon" />,
    });

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should not render icon when status success', () => {
    const { queryByTestId } = renderComponent({
      ...defaultProps,
      status: 'success',
      icon: <span data-testid="icon" />,
    });

    expect(queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('should not render action buttons by default', () => {
    const { queryByLabelText } = renderComponent(defaultProps);

    expect(queryByLabelText('Close')).not.toBeInTheDocument();
    expect(queryByLabelText('Retry')).not.toBeInTheDocument();
  });

  it('should render action buttons when handlers are passed, status is different than normal, and actionsVisibility is set visible', () => {
    const onCloseButtonClick = vi.fn();
    const onRetryButtonClick = vi.fn();
    const { getByLabelText } = renderComponent({
      ...defaultProps,
      status: 'error',
      actionsVisibility: 'visible',
      onCloseButtonClick,
      onRetryButtonClick,
    });
    const retryButton = getByLabelText('Retry');
    const closeButton = getByLabelText('Close');

    expect(retryButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(retryButton);
    fireEvent.click(closeButton);
    expect(onRetryButtonClick).toHaveBeenCalledTimes(1);
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should not render ProgressBar when status is success', () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
      status: 'success',
    });

    expect(queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
