import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const ProgressStatuses = ['normal', 'exception', 'active', 'success'];

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
      children,
      percent,
      strokeWidth,
      strokeColor,
      status,
      innerRef,
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
      height: strokeWidth || 6,
      borderRadius: '',
      backgroundColor: strokeColor || '#4384f5'
    };

    return (
      <div ref={innerRef} className={mergedClassNames} {...restProps}>
        <div className={styles[`${baseClass}__line`]}>
          <div
            className={styles[`${baseClass}__indicator`]}
            style={percentStyle}
          />
        </div>
        {children}
      </div>
    );
  }
}

const basePropTypes = {
  className: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.string,
  strokeColor: PropTypes.string,
  status: PropTypes.oneOf(ProgressStatuses)
};

ProgressBarComponent.propTypes = {
  ...basePropTypes,
  innerRef: PropTypes.instanceOf(
    typeof Element === 'undefined' ? () => {} : Element
  )
};

const ProgressBar = React.forwardRef((props, ref) => (
  <ProgressBarComponent innerRef={ref} {...props} />
));

ProgressBar.propTypes = basePropTypes;

export default ProgressBar;
