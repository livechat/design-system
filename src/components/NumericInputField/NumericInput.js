import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { KeyCodes } from '../../constants/keyCodes';

const cx = classNames.bind(styles);
const baseClass = 'numeric-input';

class NumericInput extends React.PureComponent {
  componentDidMount() {
    if (this.props.max && this.props.value > this.props.max) {
      this.props.onChange(this.props.max);
    }

    if (this.props.min && this.props.value < this.props.min) {
      this.props.onChange(this.props.min);
    }
  }

  componentWillUnmount() {
    this.removeKeyboardEventListeners();
  }

  onFocus = () => {
    this.addKeyboardEventListeners();
  };

  onBlur = () => {
    this.removeKeyboardEventListeners();
  };

  onKeyDown = e => {
    if (e.keyCode === KeyCodes.arrowDown) {
      e.preventDefault();
      this.changeValue(-1)();
    }
    if (e.keyCode === KeyCodes.arrowUp) {
      e.preventDefault();
      this.changeValue(1)();
    }
  };

  addKeyboardEventListeners = () => {
    document.addEventListener('keydown', this.onKeyDown);
  };

  removeKeyboardEventListeners = () => {
    document.removeEventListener('keydown', this.onKeyDown);
  };

  changeValue = val => () => {
    if (this.props.value !== null) {
      this.props.onChange(this.calcValue(parseInt(this.props.value, 10) + val));
    } else {
      this.props.onChange(val);
    }
  };

  handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const { onChange, value } = this.props;
    const inputVal = e.target.value.replace(/!^-?\d+/, '');
    const val = parseInt(inputVal, 10);

    if (inputVal === '') {
      onChange(null);
      return;
    }

    if (String(val) !== inputVal) {
      onChange(value);
    } else {
      onChange(this.calcValue(val));
    }
  };

  calcValue(val) {
    const { max, min } = this.props;

    if (max && val > max) {
      return max;
    }

    if (min && val < min) {
      return min;
    }

    return val;
  }

  render() {
    const {
      error,
      className,
      max,
      min,
      onChange,
      value,
      disabled,
      style,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--error`]: error,
        [`${baseClass}--disabled`]: disabled
      }),
      className
    );

    return (
      <span className={mergedClassNames} style={style}>
        <input
          type="text"
          {...restProps}
          value={value !== null ? value : ''}
          disabled={disabled}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <span
          aria-label="Increment value"
          className={cx({
            [`${baseClass}__increment`]: true,
            [`${baseClass}__increment--disabled`]:
              this.props.max && this.props.value === this.props.max
          })}
          onClick={this.changeValue(1)}
        />
        <span
          aria-label="Decrement value"
          className={cx({
            [`${baseClass}__decrement`]: true,
            [`${baseClass}__decrement--disabled`]:
              this.props.min && this.props.value === this.props.min
          })}
          onClick={this.changeValue(-1)}
        />
      </span>
    );
  }
}

NumericInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default NumericInput;
