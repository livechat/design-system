import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);
const acceptedSizes = ['large', 'compact'];
const noop = () => {};

class ToggleSwitch extends React.PureComponent {
  static propTypes = {
    on: PropTypes.bool,
    defaultOn: PropTypes.bool,
    size: PropTypes.oneOf(acceptedSizes),
    onToggle: PropTypes.func
  };

  static defaultProps = {
    size: 'large',
    onToggle: noop,
    defaultOn: false
  };

  state = {
    on: this.isControlledByProps() ? this.props.on : this.props.defaultOn
  };

  getIsOnValue = () =>
    this.isControlledByProps() ? this.props.on : this.state.on;

  toggleState = e => {
    const hasCb = this.props.onToggle !== noop;
    if (hasCb) {
      this.props.onToggle(e, this.state.on);
      return;
    }
    e.preventDefault();
    this.setState({ on: !this.state.on });
  };

  isControlledByProps() {
    return this.props.on !== undefined;
  }

  render() {
    const { className, size } = this.props;
    const { on } = this.state;
    const baseClass = 'toggleSwitch';

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--disabled`]: !on,
        [`${baseClass}--enabled`]: on,
        [`${baseClass}--${size}`]: acceptedSizes.some(s => s === size)
      }),
      className
    );

    return (
      <div onClick={e => this.toggleState(e)} className={mergedClassNames} />
    );
  }
}

export default ToggleSwitch;
