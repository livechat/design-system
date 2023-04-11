import { render } from 'test-utils';
import noop from '../../utils/noop';
import { Textarea, TextareaProps } from './Textarea';
import styles from './Textarea.module.scss';

const baseClass = 'textarea';

const renderComponent = (props: Partial<TextareaProps>) => {
  const finalProps = Object.assign(
    {},
    { onChange: noop },
    props
  ) as TextareaProps;
  return render(<Textarea {...finalProps} className="my-css-class" />);
};

describe('<Textarea> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should have disabled class on disabled', () => {
    const { container } = renderComponent({ disabled: true });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--disabled`]);
  });

  it('should have error class on error', () => {
    const { container } = renderComponent({ error: true });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--error`]);
  });
});
