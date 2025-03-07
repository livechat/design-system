import { render, userEvent, waitFor } from 'test-utils';

import { SystemMessageTimestamp } from './SystemMessageTimestamp';

const defaultProps = {
  timestamp: '10:30 AM',
  timestampWithSeconds: '10:30:00 AM',
};

const renderComponent = (props = defaultProps) =>
  render(<SystemMessageTimestamp {...props} />);

describe('<SystemMessageTimestamp> component', () => {
  it('should render timestamp value', () => {
    const { getByTestId } = renderComponent();

    const timestampValue = getByTestId('system-message-timestamp-value');
    expect(timestampValue).toBeInTheDocument();
    expect(timestampValue).toHaveTextContent(`• ${defaultProps.timestamp}`);
  });

  it('should render tooltip with timestamp with seconds when hover on timestamp value', async () => {
    const { getByTestId, queryByRole } = renderComponent();

    const timestampValue = getByTestId('system-message-timestamp-value');
    userEvent.hover(timestampValue);

    await waitFor(() => {
      expect(queryByRole('tooltip')).toBeInTheDocument();
    });
  });
});
