import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const acceptedSizes = ['basic', 'compact'];
const baseClass = 'switch';
const cx = classNames.bind(styles);
const noop = () => {};

class Switch extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    defaultOn: PropTypes.bool,
    innerRef: PropTypes.string,
    name: PropTypes.string,
    on: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(acceptedSizes)
  };

  static defaultProps = {
    defaultOn: false,
    onChange: noop,
    size: 'basic',
    name: baseClass
  };

  state = {
    enabled: this.isControlledByProps() ? this.props.on : this.props.defaultOn,
    prevPropsOn: this.props.on
  };

  static getDerivedStateFromProps(props, state) {
    if (props.on !== state.prevPropsOn) {
      return {
        enabled: props.on,
        prevPropsOn: props.on
      };
    }
    return null;
  }

  handleChange = e => {
    const hasCb = this.props.onChange !== noop;
    if (hasCb) {
      this.props.onChange(e, this.state.enabled);
      return;
    }
    e.stopPropagation();
    this.setState(prevState => ({
      enabled: !prevState.enabled
    }));
  };

  isControlledByProps() {
    return this.props.on !== undefined;
  }

  render() {
    const {
      className,
      defaultOn,
      onChange,
      innerRef,
      on,
      size,
      name,
      ...restProps
    } = this.props;

    const { enabled } = this.state;
    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
      }),
      className
    );
    const valueStyles = enabled ? 'enabled' : 'disabled';

    return (
      <span className={mergedClassNames}>
        <input
          type="checkbox"
          className={styles[`${baseClass}__input`]}
          onChange={this.handleChange}
          checked={enabled}
          name={name}
          ref={innerRef}
          {...restProps}
        />
        <span className={styles[`${baseClass}__container`]}>
          <span
            className={classNames(
              styles[`${baseClass}__track`],
              styles[`${baseClass}__track--${valueStyles}`]
            )}
          />
          <span
            className={classNames(
              styles[`${baseClass}__slider`],
              styles[`${baseClass}__slider--${size}`],
              styles[`${baseClass}__slider--${size}--${valueStyles}`]
            )}
          />
        </span>
      </span>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Switch innerRef={ref} {...props} />
));
