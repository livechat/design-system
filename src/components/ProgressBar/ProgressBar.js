import * as React from 'react';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import RefreshIcon from 'react-material-icon-svg/dist/RefreshIcon';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const ProgressStatuses = ['normal', 'error', 'active', 'success'];

const baseClass = 'progress';

class ProgressBarComponent extends React.PureComponent {
  getPercentNumber() {
    const { percent = 0 } = this.props;
    return parseInt(percent.toString(), 10);
  }

  getProgressStatus() {
    const { status, percent } = this.props;

    if (!ProgressStatuses.includes(status) && percent >= 100) {
      return 'success';
    }

    return status || 'normal';
  }

  render() {
    const {
      className,
      iconSrc,
      children,
      percent,
      strokeWidth,
      strokeColor,
      status,
      title,
      innerRef,
      onCloseButtonClick,
      onRetryButtonClick,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true
      }),
      className
    );

    const percentStyle = {
      width: `${this.getPercentNumber()}%`,
      height: strokeWidth,
      borderRadius: '',
      backgroundColor: strokeColor || '#4384f5'
    };

    return (
      <div ref={innerRef} className={mergedClassNames} {...restProps}>
        {iconSrc && (
          <img src={iconSrc} className={styles[`${baseClass}__icon`]} />
        )}
        <div className={styles[`${baseClass}__wrapper`]}>
          {title && (
            <div className={styles[`${baseClass}__title`]}>{title}</div>
          )}
          <div
            className={styles[`${baseClass}__line`]}
            style={{ height: strokeWidth }}
          >
            <div
              className={styles[`${baseClass}__indicator`]}
              style={percentStyle}
            />
          </div>
          {children}
        </div>
        {status === 'error' &&
          onRetryButtonClick && (
            <button
              type="button"
              className={styles[`${baseClass}__retry`]}
              aria-label="Retry"
              onClick={onRetryButtonClick}
            >
              <RefreshIcon />
            </button>
          )}
        {onCloseButtonClick && (
          <button
            type="button"
            className={styles[`${baseClass}__close`]}
            aria-label="Close"
            onClick={onCloseButtonClick}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
}

const basePropTypes = {
  className: PropTypes.string,
  iconSrc: PropTypes.string,
  title: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.string,
  strokeColor: PropTypes.string,
  status: PropTypes.oneOf(ProgressStatuses),
  onCloseButtonClick: PropTypes.func,
  onRetryButtonClick: PropTypes.func
};

const baseDefaultProps = {
  strokeWidth: '6px' // eslint-disable-line react/default-props-match-prop-types
};

ProgressBarComponent.propTypes = {
  ...basePropTypes,
  innerRef: PropTypes.instanceOf(
    typeof Element === 'undefined' ? () => {} : Element
  )
};

ProgressBarComponent.defaultProps = baseDefaultProps;

const ProgressBar = React.forwardRef((props, ref) => (
  <ProgressBarComponent innerRef={ref} {...props} />
));

ProgressBar.propTypes = basePropTypes;
ProgressBar.defaultProps = baseDefaultProps;

export default ProgressBar;
