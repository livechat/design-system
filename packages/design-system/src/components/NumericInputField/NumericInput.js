import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { KeyCodes } from '../../constants/keyCodes';

const cx = classNames.bind(styles);
const baseClass = 'numeric-input';

class NumericInput extends React.PureComponent {
  hasMin = () => this.props.min !== undefined;
  hasMax = () => this.props.max !== undefined;
  
  componentDidMount() {
    if (this.hasMax() && parseInt(this.props.value, 10) > this.props.max) {
      this.callOnChange(this.props.max);
    }

    if (this.hasMin() && parseInt(this.props.value, 10) < this.props.min) {
      this.callOnChange(this.props.min);
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
    if (this.props.width) {
      return {
        ...(this.props.style || {}),
        width: this.props.width
      }
    }

    return this.props.style;
  };

  addKeyboardEventListeners = () => {
    document.addEventListener('keydown', this.onKeyDown);
  };

  removeKeyboardEventListeners = () => {
    document.removeEventListener('keydown', this.onKeyDown);
  };

  changeValue = val => {
    if (this.props.value !== '' && this.props.value !== '-') {
      this.callOnChange(this.calcValue(parseInt(this.props.value, 10) + val));
    } else if (this.hasMin() && val < this.props.min) {
      this.callOnChange(this.props.min);
    } else if (this.hasMax() && val > this.props.max) {
      this.callOnChange(this.props.max);
    } else {
      this.callOnChange(val);
    }
  };

  handleChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const { value } = this.props;
    const inputVal = e.target.value.replace(/((?!([-]|([-]?\d+))).)/, '');

    if (inputVal === '') {
      this.callOnChange('');
      return;
    }

    if (inputVal === '-') {
      this.callOnChange('-');
      return;
    }

    const val = parseInt(inputVal, 10);

    if (String(val) !== inputVal) {
      this.callOnChange(value);
    } else {
      const calculatedValue = this.calcValue(val);
      this.callOnChange(calculatedValue);
    }
  };

  callOnChange = value => this.props.onChange(String(value));

  calcValue = val => {
    const { max, min } = this.props;

    if (this.hasMax() && val > max) {
      return max;
    }

    if (this.hasMin() && val < min) {
      return min;
    }
    return val;
  };

  hasReachedTheLimit = (value, margin) => (
    margin !== undefined && parseInt(value, 10) === margin
  ) 

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
      width,
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
          min={min}
          max={max}
        />
        {!noControls && (
          <React.Fragment>
            <button
              tabIndex="-1"
              disabled={
                disabled || this.hasReachedTheLimit(value, max)
              }
              onClick={this.handleIncrementClick}
              aria-label="Increment value"
              className={styles[`${baseClass}__increment`]}
              type="button"
            />
            <button
              tabIndex="-1"
              disabled={
                disabled || this.hasReachedTheLimit(value, min)
              }
              aria-label="Decrement value"
              className={styles[`${baseClass}__decrement`]}
              onClick={this.handleDecrementClick}
              type="button"
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
  value: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  /**
   * When equal `true` the up and down arrows won't be displayed
   */
  noControls: PropTypes.bool,
  style: PropTypes.object,
  /**
   * Static value of input width i.e. "120px" or "100%"  
   */
  width: PropTypes.string,
  /**
   * It's called with string value: '', '-' or '{number}'
   */
  onChange: PropTypes.func.isRequired
};

export default NumericInput;
