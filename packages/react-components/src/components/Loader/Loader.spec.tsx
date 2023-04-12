import { render } from 'test-utils';

import { Loader } from './Loader';
import styles from './Loader.module.scss';

describe('<Loader> component', () => {
  function renderLoader(props = {}) {
    const result = render(<Loader {...props} />);
    return {
      ...result,
      loaderEl: result.container.firstChild,
      spinnerEl: result.container.querySelector(
        `.${styles['loader__spinner']}`
      ),
      circleEl: result.container.querySelector(
        `.${styles['loader__spinner-circle']}`
      ),
      labelEl: result.container.querySelector(`.${styles['loader__label']}`),
    };
  }

  it('should have default set of classNames', () => {
    const { loaderEl, spinnerEl, circleEl } = renderLoader();

    expect(loaderEl).toHaveClass(styles['loader']);
    expect(spinnerEl).toBeVisible();
    expect(spinnerEl).toHaveClass(styles['loader__spinner--medium']);
    expect(circleEl).toBeVisible();
  });

  it('should allow for custom className', () => {
    const { loaderEl } = renderLoader({ className: 'my-loader-class' });

    expect(loaderEl).toHaveClass('my-loader-class');
  });

  it('should not display "label" by default', () => {
    const { labelEl } = renderLoader();

    expect(labelEl).not.toBeInTheDocument();
  });

  it('should display label passed via "label" prop', () => {
    const { labelEl } = renderLoader({ label: 'my custom label' });

    expect(labelEl).toBeVisible();
    expect(labelEl).toHaveTextContent('my custom label');
  });

  it('should allow for change colors of loader', () => {
    const { circleEl } = renderLoader({
      primaryColor: 'red',
      secondaryColor: 'blue',
    });

    const { borderColor, borderTopColor } = getComputedStyle(
      circleEl as HTMLElement
    );

    expect(borderColor).toBe('blue');
    expect(borderTopColor).toBe('red');
  });
});
