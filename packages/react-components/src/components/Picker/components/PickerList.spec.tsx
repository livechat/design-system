import { VirtuosoProps } from 'react-virtuoso';
import { vitest } from 'vitest';

import { render, vi } from 'test-utils';

import noop from '../../../utils/noop';
import { DEFAULT_PICKER_OPTIONS } from '../constants';

import { IPickerListProps, PickerList } from './PickerList';

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

window.HTMLElement.prototype.scrollIntoView = () => {};

const defaultProps: IPickerListProps = {
  isPositioned: false,
  onItemRemove: noop,
  searchDisabled: false,
  activeIndex: null,
  context: {
    x: 0,
    y: 0,
    placement: 'top',
    strategy: 'absolute',
    middlewareData: {},
    isPositioned: false,
    update: noop,
    floatingStyles: {},
    open: false,
    onOpenChange: noop,
    events: { emit: noop, on: noop, off: noop },
    dataRef: { current: {} },
    nodeId: undefined,
    floatingId: '',
    refs: {
      reference: { current: null },
      floating: { current: null },
      domReference: { current: null },
      setReference: noop,
      setFloating: noop,
      setPositionReference: noop,
    },
    elements: {
      reference: null,
      floating: null,
      domReference: null,
    },
  },
  floatingStyles: {},
  getFloatingProps: vi.fn(),
  getItemProps: vi.fn(),
  listElementsRef: { current: [] },
  maxHeight: 0,
  pickerType: 'single',
  setFloating: vi.fn(),
  setPointer: vi.fn(),
  options: DEFAULT_PICKER_OPTIONS,
  selectedKeys: [],
  onSelect: noop,
};

const renderComponent = (props: IPickerListProps) => {
  return render(<PickerList {...props} />);
};

describe('<PickerList> component', () => {
  it('should display default empty state if no filter result', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      options: [],
    });

    expect(getByText('No results found')).toBeVisible();
  });

  it('should display custom empty state if no filter result', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      options: [],
      emptyStateText: 'Custom empty state',
    });

    expect(getByText('Custom empty state')).toBeVisible();
  });

  it('should display nothing if no filter result and hideWhenEmpty is true', () => {
    const { container } = renderComponent({
      ...defaultProps,
      options: [],
      hideWhenEmpty: true,
    });

    expect(container.firstChild).toBeNull();
  });

  it('should display custom components as options', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      options: [
        {
          key: 'custom-one',
          name: 'Custom one',
          customElement: {
            listItemBody: <div>List custom one</div>,
            selectedItemBody: <div>Selected custom one</div>,
          },
        },
        {
          key: 'custom-two',
          name: 'Custom two',
          customElement: {
            listItemBody: <div>List custom two</div>,
            selectedItemBody: <div>Selected custom two</div>,
          },
        },
      ],
    });

    expect(getByText('List custom one')).toBeVisible();
    expect(getByText('List custom two')).toBeVisible();
  });
});
