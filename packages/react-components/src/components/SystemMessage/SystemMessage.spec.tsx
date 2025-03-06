import { render } from 'test-utils';

import { SystemMessage } from './SystemMessage';
import { ISystemMessageProps } from './types';

const defaultProps: ISystemMessageProps = {
  children: 'System Message Content',
};

const renderComponent = (props: Partial<ISystemMessageProps> = {}) =>
  render(<SystemMessage {...defaultProps} {...props} />);

describe('<SystemMessage> component', () => {
  it('should render basic system message with content', () => {
    const { getByTestId, getByText } = renderComponent();

    expect(getByTestId('system-message')).toBeInTheDocument();
    expect(getByTestId('system-message-header')).toBeInTheDocument();
    expect(getByTestId('system-message-title')).toBeInTheDocument();
    expect(getByText('System Message Content')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    const icon = <span>🔔</span>;
    const { getByTestId } = renderComponent({ icon });

    expect(getByTestId('system-message-icon')).toBeInTheDocument();
    expect(getByTestId('system-message-icon')).toHaveTextContent('🔔');
  });

  it('should not render icon when not provided', () => {
    const { queryByTestId } = renderComponent();

    expect(queryByTestId('system-message-icon')).not.toBeInTheDocument();
  });

  it('should render details when provided', () => {
    const details = 'Additional details';
    const { getByTestId } = renderComponent({ details });

    expect(getByTestId('system-message-details')).toBeInTheDocument();
    expect(getByTestId('system-message-details')).toHaveTextContent(details);
  });

  it('should not render details when not provided', () => {
    const { queryByTestId } = renderComponent();

    expect(queryByTestId('system-message-details')).not.toBeInTheDocument();
  });

  it('should render timestamp when both timestamp and timestampWithSeconds are provided', () => {
    const timestamp = '10:30 AM';
    const timestampWithSeconds = '10:30:00 AM';
    const { getByTestId } = renderComponent({
      timestamp,
      timestampWithSeconds,
    });

    const timestampValue = getByTestId('system-message-timestamp-value');

    expect(timestampValue).toBeInTheDocument();
  });

  it('should not render timestamp when either timestamp or timestampWithSeconds is missing', () => {
    const timestamp = '10:30 AM';
    const { container: container1 } = renderComponent({ timestamp });
    const { container: container2 } = renderComponent({
      timestampWithSeconds: '10:30:00 AM',
    });

    expect(container1.querySelector('.system-message-timestamp')).toBeNull();
    expect(container2.querySelector('.system-message-timestamp')).toBeNull();
  });
});
