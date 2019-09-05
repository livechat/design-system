import * as React from 'react';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import RefreshIcon from 'react-material-icon-svg/dist/RefreshIcon';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { Loader } from '../Loader';

const cx = classNames.bind(styles);

const ProgressStatuses = ['normal', 'error', 'active', 'success'];

const baseClass = 'upload-bar';

class UploadBarComponent extends React.PureComponent {
  state = {
    isExpanded: false
  };

  handleCollapseButtonClick = e => {
    e.stopPropagation();
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  render() {
    const {
      className,
      children,
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

    return (
      <div ref={innerRef} className={mergedClassNames} {...restProps}>
        <div
          className={styles[`${baseClass}__main`]}
          onClick={this.handleCollapseButtonClick}
        >
          <Loader label="1/3 files uploaded" />
          <button
            className={styles[`${baseClass}__collapse-btn`]}
            type="button"
            onClick={this.handleCollapseButtonClick}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className={cx(styles['collapse-icon'], {
                [styles['collapse-icon--expanded']]: this.state.isExpanded
              })}
            >
              <path
                className={styles['collapse-icon__top-arrow']}
                d="M7 18V16H3.41L7.91 11.5L6.5 10.09L2 14.59V11H0V18H7Z"
              />
              <path
                className={styles['collapse-icon__bottom-arrow']}
                d="M11.5001 7.91L16.0001 3.41V7H18.0001V0H11.0001V2H14.5901L10.0901 6.5L11.5001 7.91Z"
              />
            </svg>
          </button>
        </div>
        <TransitionGroup component={null}>
          {this.state.isExpanded && (
            <CSSTransition
              timeout={600}
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
  }
}

const basePropTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.string,
  strokeColor: PropTypes.string,
  status: PropTypes.oneOf(ProgressStatuses)
};

const baseDefaultProps = {
  strokeWidth: '4px' // eslint-disable-line react/default-props-match-prop-types
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
