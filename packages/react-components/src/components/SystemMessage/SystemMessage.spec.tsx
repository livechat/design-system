import { Info } from '@livechat/design-system-icons';

import { render, userEvent } from 'test-utils';

import { SystemMessage } from './SystemMessage';
import { ISystemMessageProps } from './types';

const defaultProps: ISystemMessageProps = {
  children: 'System Message Content',
};

const renderComponent = (props: Partial<ISystemMessageProps> = {}) =>
  render(<SystemMessage {...defaultProps} {...props} />);

describe('<SystemMessage> component', () => {
  it('should render basic system message with content', () => {
    const { getByText } = renderComponent();

    expect(getByText('System Message Content')).toBeVisible();
  });

  it('should render icon if iconSource is provided', () => {
    const { getByTestId } = renderComponent({
      iconSource: Info,
    });

    const icon = getByTestId('system-message-header-icon');

    expect(icon).toBeVisible();
  });

  it('should render source when provided', () => {
    const source = 'Shopify';
    const { getByTestId } = renderComponent({ source });

    expect(getByTestId('system-message-source')).toHaveTextContent(
      `• ${source}`
    );
  });

  it('should render details with expand/collapse functionality', () => {
    const details = ['First details line', 'Second details line'];
    const { getByTestId, getByText, queryByText } = renderComponent({
      details,
    });

    expect(getByTestId('system-message-details')).toBeVisible();
    expect(getByText('First details line')).toBeVisible();
    expect(queryByText('Second details line')).not.toBeInTheDocument();

    userEvent.click(getByTestId('system-message-details-toggle'));
    expect(getByText('Second details line')).toBeVisible();
  });

  it('should render actions with menu for more than 2 items', () => {
    const actions = [
      { label: 'Action 1', callback: () => {} },
      { label: 'Action 2', callback: () => {} },
      { label: 'Action 3', callback: () => {} },
    ];

    const { getByText, getByTestId } = renderComponent({ actions });

    expect(getByText('Action 1')).toBeVisible();
    expect(getByText('Action 2')).toBeVisible();
    expect(getByTestId('system-message-actions-menu-trigger')).toBeVisible();
  });

  it('should render timestamp when both timestamp and timestampWithSeconds are provided', () => {
    const timestamp = '10:30 AM';
    const timestampWithSeconds = '10:30:00 AM';
    const { getByTestId } = renderComponent({
      timestamp,
      timestampWithSeconds,
    });

    const timestampValue = getByTestId('system-message-timestamp-value');
    expect(timestampValue).toBeVisible();
  });
});
