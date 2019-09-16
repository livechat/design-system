import * as React from 'react';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import RefreshIcon from 'react-material-icon-svg/dist/RefreshIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { CollapseIcon } from '../CollapseIcon';
import { ProgressCircle } from '../Progress';
import {
  PROGRESS_SIZE,
  PROGRESS_STATUS,
  PROGRESS_STATUSES,
  PROGRESS_SIZES
} from '../Progress/constants';
import FileUploadProgress from './FileUploadProgress';
import { UPLOAD_BAR_MODES, UPLOAD_BAR_MODE } from './constants';

const cx = classNames.bind(styles);

const baseClass = 'upload-bar';

class UploadBarComponent extends React.PureComponent {
  state = {
    isExpanded: false
  };

  componentDidUpdate(prevProps) {
    if (!this.isIsExpandedControlled()) {
      if (
        this.props.shouldExpandOnEndWithErrors &&
        prevProps.status !== PROGRESS_STATUS.error &&
        this.props.status === PROGRESS_STATUS.error
      ) {
        this.showDetailedView();
      }

      if (
        this.props.shouldCollapseOnEndWithSuccess &&
        prevProps.status !== PROGRESS_STATUS.success &&
        this.props.status === PROGRESS_STATUS.success
      ) {
        this.hideDetailedView();
      }
    }
  }

  getIsExpanded = (props = this.props, state = this.state) =>
    this.isIsExpandedControlled() ? props.isExpanded : state.isExpanded;

  getHeaderIcon = () => {
    const { status, percent } = this.props;

    if (status === PROGRESS_STATUS.success) {
      return (
        <div className={styles[`${baseClass}__success-icon`]}>
          <CheckIcon />
        </div>
      );
    }

    if (status === PROGRESS_STATUS.error) {
      return (
        <div className={styles[`${baseClass}__error-icon`]}>
          <AlertCircleIcon fill="#f4574c" />
        </div>
      );
    }

    return (
      <ProgressCircle
        status={status}
        percent={percent}
        size={PROGRESS_SIZE.small}
      />
    );
  };

  getHtmlProps = () => {
    const {
      className,
      children,
      icon,
      size,
      status,
      title,
      innerRef,
      percent,
      errorMessage,
      isExpanded,
      onCloseButtonClick,
      shouldExpandOnEndWithErrors,
      shouldCollapseOnEndWithSuccess,
      onCollapseButtonClick,
      onRetryButtonClick,
      mode,
      ...restProps
    } = this.props;

    return restProps;
  };

  handleCollapseButtonClick = e => {
    e.stopPropagation();

    if (this.isIsExpandedControlled()) {
      this.props.onCollapseButtonClick(e);
    } else {
      this.setState(prevState => ({
        isExpanded: !prevState.isExpanded
      }));
    }
  };

  handleRetryButtonClick = e => {
    e.stopPropagation();
    this.props.onRetryButtonClick(e);
  };

  handleCloseButtonClick = e => {
    e.stopPropagation();
    this.props.onCloseButtonClick(e);
  };

  isIsExpandedControlled = () => this.props.isExpanded !== undefined;

  showDetailedView = () => {
    this.setState({ isExpanded: true });
  };

  hideDetailedView = () => {
    this.setState({ isExpanded: false });
  };

  renderActionIcons = () => {
    const { mode, status, onCloseButtonClick, onRetryButtonClick } = this.props;

    const withError = status === PROGRESS_STATUS.error;

    if (!(withError && (onRetryButtonClick || onCloseButtonClick))) {
      if (mode !== UPLOAD_BAR_MODE.single) {
        return (
          <button
            className={styles[`${baseClass}__collapse-btn`]}
            type="button"
            onClick={this.handleCollapseButtonClick}
          >
            <CollapseIcon isExpanded={this.getIsExpanded()} />
          </button>
        );
      }

      return null;
    }

    return (
      <div className={styles[`${baseClass}__actions`]}>
        {onRetryButtonClick && (
          <button
            type="button"
            className={styles[`${baseClass}__retry`]}
            aria-label="Retry"
            onClick={this.handleRetryButtonClick}
          >
            <RefreshIcon />
          </button>
        )}

        {onCloseButtonClick && (
          <button
            type="button"
            className={styles[`${baseClass}__close`]}
            aria-label="Close"
            onClick={this.handleCloseButtonClick}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  };

  renderUploadBarSingleMode = () => {
    const {
      className,
      icon,
      status,
      title,
      innerRef,
      percent,
      size,
      errorMessage
    } = this.props;

    const htmlProps = this.getHtmlProps();

    const withError = status === PROGRESS_STATUS.error;
    const withSuccess = status === PROGRESS_STATUS.success;

    const mergedClassNames = getMergedClassNames(
      cx(baseClass, `${baseClass}--single`, {
        [`${baseClass}--error`]: withError,
        [`${baseClass}--success`]: withSuccess
      }),
      className
    );

    return (
      <div ref={innerRef} className={mergedClassNames} {...htmlProps}>
        <div
          className={styles[`${baseClass}__main`]}
          onClick={this.handleCollapseButtonClick}
        >
          <div className={styles[`${baseClass}__header`]}>
            <FileUploadProgress
              title={withError ? errorMessage || title : title}
              percent={percent}
              status={status}
              icon={icon}
              size={size}
            />
          </div>
          {this.renderActionIcons()}
        </div>
      </div>
    );
  };

  renderUploadBarMultipleMode = () => {
    const {
      className,
      children,
      status,
      title,
      innerRef,
      errorMessage
    } = this.props;

    const htmlProps = this.getHtmlProps();

    const withError = status === PROGRESS_STATUS.error;

    const mergedClassNames = getMergedClassNames(
      cx(baseClass, {
        [`${baseClass}--error`]: withError
      }),
      className
    );

    return (
      <div ref={innerRef} className={mergedClassNames} {...htmlProps}>
        <div
          className={styles[`${baseClass}__main`]}
          onClick={this.handleCollapseButtonClick}
        >
          <div className={styles[`${baseClass}__header`]}>
            {this.getHeaderIcon()}
            <div className={styles[`${baseClass}__title`]}>
              {withError ? errorMessage || title : title}
            </div>
          </div>
          {this.renderActionIcons()}
        </div>
        <TransitionGroup component={null}>
          {this.getIsExpanded() && (
            <CSSTransition
              timeout={300}
              classNames={{
                enter: styles[`${baseClass}__files--enter`],
                enterActive: styles[`${baseClass}__files--enter-active`],
                exit: styles[`${baseClass}__files--exit`],
                exitActive: styles[`${baseClass}__files--exit-active`],
                exitDone: styles[`${baseClass}__files--exit-done`]
              }}
            >
              <div className={styles[`${baseClass}__files`]}>
                <div className={styles[`${baseClass}__files-wrapper`]}>
                  <div className={styles[`${baseClass}__list`]}>{children}</div>
                </div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  };

  render() {
    if (this.props.mode === UPLOAD_BAR_MODE.single) {
      return this.renderUploadBarSingleMode();
    }

    return this.renderUploadBarMultipleMode();
  }
}

const basePropTypes = {
  className: PropTypes.string,
  /**
   * Error message visible when the status of the upload is equal 'error'
   */
  errorMessage: PropTypes.string,
  /**
   * Available in single mode, ie. svg file icon
   */
  icon: PropTypes.node,
  /**
   * `UploadBar`'s details visibility can be a controlled by `isExpanded` property. Any inside change (ie. click on the bar head) will trigger `onCollapseButtonClick` method
   * You can also use `UploadBar` without providing `isExpanded` property and it's state will be resolved with component's state
   */
  isExpanded: PropTypes.bool,
  /**
   * Multiple mode: use when user can upload a few files at the same time
   * Single mode: Useful on mobile devices or when upload of multiple files at the same time is not supported
   */
  mode: PropTypes.oneOf(UPLOAD_BAR_MODES),
  /**
   * Progress of upload presented on `ProgressCircle` (multiple mode) or `ProgressBar` (single mode)
   */
  percent: PropTypes.number.isRequired,
  /**
   * Available in single mode, the size of the `ProgressBar`
   */
  size: PropTypes.oneOf(PROGRESS_SIZES),
  /**
   * Available in multiple mode, when component isExpanded state is not controlled (`isExpanded` property is not defined)
   * When it's equal `true` `UploadBar` will expand and show details on upload end with error
   */
  shouldExpandOnEndWithErrors: PropTypes.bool,
  /**
   * Available in multiple mode, when component isExpanded state is not controlled (`isExpanded` property is not defined)
   * When it's equal `true` `UploadBar` will collapse and hide details on upload end with success
   */
  shouldCollapseOnEndWithSuccess: PropTypes.bool,
  /**
   * Multiple mode: Combined status of the upload
   * Single mode: Upload status of the file
   */
  status: PropTypes.oneOf(PROGRESS_STATUSES),
  /**
   * Multiple mode: Used to inform user about progress of the upload when UploadBar is collapsed
   * Single mode: Usually a file name
   */
  title: PropTypes.string.isRequired,
  /**
   * It's available when used together with `isExpanded` property.
   */
  onCollapseButtonClick: PropTypes.func,
  /**
   * Useful to cancel the file upload or to remove the file when it's upload resulted in an error
   * In the multiple mode it should be used to cancel all files
   * The button is visible when `status` property is equal 'error'
   */
  onCloseButtonClick: PropTypes.func,
  /**
   * Useful to retry the file upload
   * In the multiple mode it should be used to retry the upload of all files
   * The button is visible when `status` property is equal 'error'
   */
  onRetryButtonClick: PropTypes.func
};

const baseDefaultProps = {
  mode: UPLOAD_BAR_MODE.multiple // eslint-disable-line react/default-props-match-prop-types,
};

UploadBarComponent.propTypes = {
  ...basePropTypes,
  innerRef: PropTypes.instanceOf(
    typeof Element === 'undefined' ? () => {} : Element
  )
};

UploadBarComponent.defaultProps = baseDefaultProps;

const UploadBar = React.forwardRef((props, ref) => (
  <UploadBarComponent innerRef={ref} {...props} />
));

UploadBar.propTypes = basePropTypes;
UploadBar.defaultProps = baseDefaultProps;

export default UploadBar;
