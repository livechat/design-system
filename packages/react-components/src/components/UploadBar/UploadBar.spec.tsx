import * as React from 'react';

import { render, vi, userEvent } from 'test-utils';

import { UploadBar, UploadBarProps } from './UploadBar';

const defaultProps = {
  progressValue: 50,
  title: 'Upload title',
};

const renderComponent = (props: UploadBarProps) =>
  render(<UploadBar {...props} />);

describe('<UploadBar> component', () => {
  it('should allow for custom class name', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render title and progress circle if status is set to normal', () => {
    const { getByText, getByRole } = renderComponent(defaultProps);

    expect(getByText('Upload title')).toBeInTheDocument();
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render error message if errorMessage is provided and status is set to error and should display error icon', () => {
    const { getByText, queryByRole, queryByText, getByTestId } =
      renderComponent({
        ...defaultProps,
        errorMessage: 'Error message',
        status: 'error',
      });

    expect(queryByText('Upload title')).not.toBeInTheDocument();
    expect(queryByRole('progressbar')).not.toBeInTheDocument();
    expect(getByText('Error message')).toBeInTheDocument();
    expect(getByTestId('error-icon')).toBeInTheDocument();
  });

  it('should render success icon if status is set to success', () => {
    const { getByTestId, queryByRole } = renderComponent({
      ...defaultProps,
      status: 'success',
    });

    expect(queryByRole('progressbar')).not.toBeInTheDocument();
    expect(getByTestId('success-icon')).toBeInTheDocument();
  });

  it('should not render collapse button if mode is set to single', () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
      mode: 'single',
    });

    expect(
      queryByRole('button', { name: 'Collapse button' })
    ).not.toBeInTheDocument();
  });

  it('should render collapse button if mode is set to multiple and status is not set to error', () => {
    const { getByRole } = renderComponent({ ...defaultProps });

    expect(
      getByRole('button', { name: 'Collapse button' })
    ).toBeInTheDocument();
  });

  it('should render action buttons if status is set to error and handlers are passed and call provided handlers on user click', () => {
    const onCloseButtonClick = vi.fn();
    const onRetryButtonClick = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      status: 'error',
      onCloseButtonClick,
      onRetryButtonClick,
    });
    const closeButton = getByRole('button', { name: 'Close' });
    const retryButton = getByRole('button', { name: 'Retry' });

    expect(closeButton).toBeInTheDocument();
    expect(retryButton).toBeInTheDocument();
    userEvent.click(closeButton);
    expect(onCloseButtonClick).toHaveBeenCalledTimes(1);
    userEvent.click(retryButton);
    expect(onRetryButtonClick).toHaveBeenCalledTimes(1);
  });
});
