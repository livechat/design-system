import { render } from 'test-utils';

import { IAccordionAnimatedLabelProps } from '../../types';

import { AccordionAnimatedLabel } from './AccordionAnimatedLabel';

const DEFAULT_PROPS = {
  open: <div>Open label</div>,
  closed: <div>Closed label</div>,
  isOpen: false,
};

const renderComponent = (props: IAccordionAnimatedLabelProps) => {
  return render(<AccordionAnimatedLabel {...props} />);
};

describe('<AccordionAnimatedLabel> component', () => {
  it('should render closed label if isOpen false', () => {
    const { getByText, queryByText } = renderComponent(DEFAULT_PROPS);

    expect(getByText('Closed label')).toBeInTheDocument();
    expect(queryByText('Open label')).not.toBeInTheDocument();
  });

  it('should render open label if isOpen true', () => {
    const { getByText, queryByText } = renderComponent({
      ...DEFAULT_PROPS,
      isOpen: true,
    });

    expect(getByText('Open label')).toBeInTheDocument();
    expect(queryByText('Closed label')).not.toBeInTheDocument();
  });
});
