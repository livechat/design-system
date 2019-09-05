import * as React from 'react';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import RefreshIcon from 'react-material-icon-svg/dist/RefreshIcon';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const ProgressStatuses = ['normal', 'error', 'active', 'success'];

const baseClass = 'file-upload-progress';

class FileUploadProgressComponent extends React.PureComponent {
  state = {
    isExpanded: false
  };

  getPercentNumber() {
    const { percent = 0 } = this.props;

    if (this.getProgressStatus() === 'error') {
      return 0;
    }
    return parseInt(percent.toString(), 10);
  }

  getProgressStatus() {
    const { status, percent } = this.props;

    if (!ProgressStatuses.includes(status) && percent >= 100) {
      return 'success';
    }

    return status || 'normal';
  }

  handleCollapseButtonClick = e => {
    e.stopPropagation();
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

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
        [baseClass]: true,
        [`${baseClass}--with-icon`]: iconSrc,
        [`${baseClass}--error`]: this.getProgressStatus() === 'error',
        [`${baseClass}--success`]: this.getProgressStatus() === 'success'
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
      <div {...restProps} className={mergedClassNames} {...restProps}>
        {iconSrc &&
          this.getProgressStatus() !== 'success' && (
            <img src={iconSrc} className={styles[`${baseClass}__icon`]} />
          )}
        {this.getProgressStatus() === 'success' && (
          <div className={styles[`${baseClass}__success-icon`]}>
            <CheckIcon />
          </div>
        )}
        <div className={styles[`${baseClass}__wrapper`]}>
          <div className={styles[`${baseClass}__header`]}>
            {title && (
              <div className={styles[`${baseClass}__title`]}>{title}</div>
            )}
            {(onRetryButtonClick || onCloseButtonClick) && (
              <div className={styles[`${baseClass}__actions`]}>
                {onRetryButtonClick &&
                  this.getProgressStatus() === 'error' && (
                    <button
                      type="button"
                      className={styles[`${baseClass}__retry`]}
                      aria-label="Retry"
                      onClick={onRetryButtonClick}
                    >
                      <RefreshIcon />
                    </button>
                  )}
                {onCloseButtonClick &&
                  this.getProgressStatus() !== 'success' && (
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
            )}
          </div>
          {this.getProgressStatus() !== 'success' && (
            <div
              className={styles[`${baseClass}__line`]}
              style={{ height: strokeWidth }}
            >
              <div
                className={styles[`${baseClass}__indicator`]}
                style={percentStyle}
              />
            </div>
          )}
        </div>
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
  strokeWidth: '4px' // eslint-disable-line react/default-props-match-prop-types
};

FileUploadProgressComponent.propTypes = {
  ...basePropTypes,
  innerRef: PropTypes.instanceOf(
    typeof Element === 'undefined' ? () => {} : Element
  )
};

FileUploadProgressComponent.defaultProps = baseDefaultProps;

const FileUploadProgress = React.forwardRef((props, ref) => (
  <FileUploadProgressComponent innerRef={ref} {...props} />
));

FileUploadProgress.propTypes = basePropTypes;
FileUploadProgress.defaultProps = baseDefaultProps;

export default FileUploadProgress;
