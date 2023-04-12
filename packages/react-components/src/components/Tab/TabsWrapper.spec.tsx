import { render } from 'test-utils';
import { TabsWrapper, TabsList } from './TabsWrapper';

describe('<TabsWrapper /> component', () => {
  it('should render nested elements as children', () => {
    const { getByRole } = render(
      <TabsWrapper>
        <TabsList>
          <h3>Hello</h3>
        </TabsList>
      </TabsWrapper>
    );

    const heading = getByRole('heading');
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent('Hello');
  });
});
