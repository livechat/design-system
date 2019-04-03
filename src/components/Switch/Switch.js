import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);
const acceptedSizes = ['basic', 'compact'];
const noop = () => {};
const baseClass = 'switch';

class Switch extends React.PureComponent {
  static propTypes = {
    on: PropTypes.bool,
    defaultOn: PropTypes.bool,
    size: PropTypes.oneOf(acceptedSizes),
    onToggle: PropTypes.func
  };

  static defaultProps = {
    size: 'basic',
    onToggle: noop,
    defaultOn: false
  };

  state = {
    on: this.isControlledByProps() ? this.props.on : this.props.defaultOn,
    prevPropsOn: this.props.on
  };

  static getDerivedStateFromProps(props, state) {
    if (props.on !== state.prevPropsOn) {
      return {
        on: props.on,
        prevPropsOn: props.on
      };
    }
    return null;
  }

  toggleState = e => {
    const hasCb = this.props.onToggle !== noop;
    if (hasCb) {
      this.props.onToggle(e, this.state.on);
      return;
    }
    console.log('click');;
    e.preventDefault();
    this.setState(prevState => ({
      on: !prevState.on
    }));
  };

  isControlledByProps() {
    return this.props.on !== undefined;
  }

  render() {
    const { className, size, ...restProps } = this.props;
    const { on } = this.state;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
      }),
      className
    );

    const slider = `${baseClass}--${size}__slider`;
    const track = `${baseClass}__track`;
    const sliderWithState = on ? `${slider}--disabled` : `${slider}--enabled`;
    const trackWithState = on ? `${track}--disabled` : `${track}--enabled`;

    return (
      <span className={mergedClassNames}>
        <input
          type="checkbox"
          className={styles[`${baseClass}__input`]}
          onChange={this.toggleState}
          checked={on}
          tabIndex={1}
        />
        <span className={styles[`${baseClass}__container`]}>
          <span className={styles[trackWithState]} />
          <span className={styles[sliderWithState]} />
        </span>
      </span>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Switch innerRef={ref} {...props} />
));
