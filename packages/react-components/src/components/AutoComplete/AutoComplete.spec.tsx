import { VirtuosoProps } from 'react-virtuoso';
import { vitest } from 'vitest';

import { render, userEvent, screen } from 'test-utils';

import { AutoCompleteProps, AutoComplete } from '.';

const BASIC_OPTIONS = ['Paul', 'Adam', 'John'];
const DEFAULT_PROPS = {
  options: BASIC_OPTIONS,
};

vitest.mock('react-virtuoso', () => {
  function Virtuoso(props: VirtuosoProps<unknown, unknown>) {
    return (
      <>
        {props.data?.map(
          (value, index) => props.itemContent?.(index, value, undefined)
        )}
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return { ...vitest.importActual('react-virtuoso'), Virtuoso };
});

const renderComponent = (props?: Partial<AutoCompleteProps>) => {
  return render(
    <AutoComplete {...DEFAULT_PROPS} {...props} data-testid="autocomplete" />
  );
};

describe('<AutoComplete> component', () => {
  it('should render string options', () => {
    renderComponent({
      autocompleteOpenOnInit: true,
    });

    expect(screen.getByText('Paul')).toBeInTheDocument();
  });

  it('should render custom elements', () => {
    renderComponent({
      options: [
        {
          name: 'Paul',
          customElement: <div data-testid="paul-item">Paul</div>,
        },
      ],
      autocompleteOpenOnInit: true,
    });

    expect(screen.getByTestId('paul-item')).toBeInTheDocument();
  });

  it('should allow arbitrary inputs', () => {
    renderComponent();
    userEvent.type(screen.getByTestId('autocomplete'), 'Amy');
    expect(screen.getByTestId('autocomplete')).toHaveValue('Amy');
  });

  it('should allow the user to pick an option with their mouse', () => {
    renderComponent({
      autocompleteOpenOnInit: true,
    });

    const autocomplete = screen.getByTestId('autocomplete');
    userEvent.click(screen.getByText('Paul'));
    expect(autocomplete).toHaveValue('Paul');
  });
  it('should allow the user to pick an option with their keyboard', () => {
    renderComponent({
      autocompleteOpenOnInit: true,
    });

    const autocomplete = screen.getByTestId('autocomplete');
    userEvent.type(autocomplete, '{arrowdown}{enter}');
    expect(autocomplete).toHaveValue('Paul');
  });

  it('should allow for single option display', () => {
    renderComponent({
      autocompleteOpenOnInit: true,
      single: true,
    });

    expect(screen.getByText('Paul')).toBeInTheDocument();
    expect(screen.queryByText('Adam')).toBeNull();
  });
});
