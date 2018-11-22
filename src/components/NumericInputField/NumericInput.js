import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { KeyCodes } from '../../constants/keyCodes';

const cx = classNames.bind(styles);
const baseClass = 'numeric-input';

class NumericInput extends React.PureComponent {
  static requiredValidator = value => value !== '' && value !== '-';

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

  onKeyDown = e => {
    if (e.keyCode === KeyCodes.arrowDown) {
      e.preventDefault();
      this.changeValue(-1);
    }
    if (e.keyCode === KeyCodes.arrowUp) {
      e.preventDefault();
      this.changeValue(1);
    }
  };

  getComponentStyles = () => {
    const componentStyles = {
      ...(this.props.style || {})
    };
    if (this.props.width) {
      componentStyles.width = this.props.width;
    }

    return componentStyles;
  };

  addKeyboardEventListeners = () => {
    document.addEventListener('keydown', this.onKeyDown);
  };

  removeKeyboardEventListeners = () => {
    document.removeEventListener('keydown', this.onKeyDown);
  };

  changeValue = val => {
    if (this.props.value !== '' && this.props.value !== '-') {
      this.props.onChange(this.calcValue(parseInt(this.props.value, 10) + val));
    } else if (this.props.min && val < this.props.min) {
      this.props.onChange(this.props.min);
    } else if (this.props.max && val > this.props.max) {
      this.props.onChange(this.props.max);
    } else {
      this.props.onChange(val);
    }
  };

  handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const { onChange, value } = this.props;
    const inputVal = e.target.value.replace(/((?!([-]|([-]?\d+))).)/, '');

    if (inputVal === '') {
      onChange('');
      return;
    }

    if (inputVal === '-') {
      onChange('-');
      return;
    }

    const val = parseInt(inputVal, 10);

    if (String(val) !== inputVal) {
      onChange(value);
    } else {
      const calculatedValue = this.calcValue(val);
      onChange(calculatedValue);
    }
  };

  calcValue = val => {
    const { max, min } = this.props;

    if (max && val > max) {
      return max;
    }

    if (min && val < min) {
      return min;
    }
    return val;
  };

  handleIncrementClick = () => {
    this.changeValue(1);
  };

  handleDecrementClick = () => {
    this.changeValue(-1);
  };

  handleFocus = () => {
    this.addKeyboardEventListeners();
  };

  handleBlur = () => {
    this.removeKeyboardEventListeners();
  };

  render() {
    const {
      error,
      className,
      max,
      min,
      onChange,
      noControls,
      value,
      disabled,
      style,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--error`]: error,
        [`${baseClass}--no-controls`]: noControls,
        [`${baseClass}--disabled`]: disabled
      }),
      className
    );

    return (
      <div className={mergedClassNames} style={this.getComponentStyles()}>
        <input
          type="text"
          {...restProps}
          value={value}
          disabled={disabled}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {!noControls && (
          <React.Fragment>
            <button
              tabIndex="-1"
              disabled={
                disabled ||
                (this.props.max && this.props.value === this.props.max)
              }
              onClick={this.handleIncrementClick}
              aria-label="Increment value"
              className={cx({
                [`${baseClass}__increment`]: true,
                [`${baseClass}__increment--disabled`]:
                  this.props.max && this.props.value === this.props.max
              })}
            />
            <button
              tabIndex="-1"
              disabled={
                disabled ||
                (this.props.min && this.props.value === this.props.min)
              }
              aria-label="Decrement value"
              className={cx({
                [`${baseClass}__decrement`]: true,
                [`${baseClass}__decrement--disabled`]:
                  this.props.min && this.props.value === this.props.min
              })}
              onClick={this.handleDecrementClick}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

NumericInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.number,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  noControls: PropTypes.bool,
  width: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default NumericInput;
