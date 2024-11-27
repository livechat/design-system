import { vi } from 'vitest';

import { render, userEvent, waitFor } from 'test-utils';

import { Accordion } from './Accordion';
import { IAccordionProps } from './types';

const DEFAULT_PROPS = {
  label: 'Label',
  children: <div>Content</div>,
};

const renderComponent = (props: IAccordionProps) => {
  return render(<Accordion {...props} />);
};

describe('<Accordion> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...DEFAULT_PROPS,
      className: 'my-class',
    });

    expect(container.firstChild).toHaveClass('my-class');
  });

  it('should render as closed by default', () => {
    const { getByText, queryByText } = renderComponent(DEFAULT_PROPS);

    expect(getByText('Label')).toBeInTheDocument();
    expect(queryByText('Content')).not.toBeInTheDocument();
  });

  it('should render as open if openOnInit is set true', () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      openOnInit: true,
    });

    expect(getByText('Label')).toBeInTheDocument();
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('should call onClose and onOpen handlers on label click', async () => {
    const onClose = vi.fn();
    const onOpen = vi.fn();
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      onClose,
      onOpen,
    });

    expect(getByText('Label')).toHaveAttribute('aria-expanded', 'false');
    userEvent.click(getByText('Label'));
    expect(onOpen).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(getByText('Label')).toHaveAttribute('aria-expanded', 'false');
    });

    userEvent.click(getByText('Label'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should show different label content when open and closed', async () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      label: {
        open: <div>Open label</div>,
        closed: <div>Closed label</div>,
      },
    });

    expect(getByText('Closed label')).toBeInTheDocument();
    userEvent.click(getByText('Closed label'));
    await waitFor(() => expect(getByText('Open label')).toBeInTheDocument());
  });

  it('should show multiline element if closed', () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      multilineElement: <div>Multi</div>,
    });

    expect(getByText('Multi')).toBeInTheDocument();
  });

  it('should show footer element if open', async () => {
    const { queryByText, getByText } = renderComponent({
      ...DEFAULT_PROPS,
      footer: <div>Footer</div>,
    });

    expect(queryByText('Footer')).not.toBeInTheDocument();
    userEvent.click(getByText('Label'));
    await waitFor(() => expect(queryByText('Footer')).toBeInTheDocument());
  });
});
