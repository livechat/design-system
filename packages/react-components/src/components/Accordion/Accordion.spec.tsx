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

  it('should call onClose and onOpen handlers on label click', () => {
    const onClose = vi.fn();
    const onOpen = vi.fn();
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      onClose,
      onOpen,
    });

    userEvent.click(getByRole('button'));
    expect(onOpen).toHaveBeenCalledTimes(1);
    userEvent.click(getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should show different label content when open and closed', async () => {
    const { getByText, getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      label: {
        open: <div>Open label</div>,
        closed: <div>Closed label</div>,
      },
    });

    expect(getByText('Closed label')).toBeInTheDocument();
    userEvent.click(getByRole('button'));
    await waitFor(() => expect(getByText('Open label')).toBeInTheDocument());
  });

  it('should show multiline element if closed', () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      multilineElement: <div>Multi</div>,
    });

    expect(getByText('Multi')).toBeInTheDocument();
  });
});
