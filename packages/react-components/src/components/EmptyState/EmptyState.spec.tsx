import { Info as InfoIcon } from '@livechat/design-system-icons';

import { render } from 'test-utils';

import { Button } from '../Button';
import { Icon } from '../Icon';

import { EmptyState } from './EmptyState';
import { IEmptyStateProps } from './types';

const renderComponent = (props: IEmptyStateProps) => {
  return render(<EmptyState {...props} />);
};

describe('<EmptyState> component', () => {
  it('should render with image', () => {
    const { getByAltText } = renderComponent({
      title: 'Test title',
      description: 'Test description',
      image: 'test-image.jpg',
    });

    const image = getByAltText('Test title');

    expect(image).toBeVisible();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('should render actions when provided', () => {
    const { getByText } = renderComponent({
      title: 'Test title',
      description: 'Test description',
      actions: <Button>Test action</Button>,
    });

    expect(getByText('Test action')).toBeVisible();
  });

  it('should render with icon', () => {
    const { getByTestId } = renderComponent({
      title: 'Test title',
      description: 'Test description',
      icon: <Icon source={InfoIcon} />,
    });

    const icon = getByTestId('icon');

    expect(icon).toBeVisible();
  });
});
