import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { noticeAboutDeprecation } from '../../helpers/notice-about-deprecation'
import styles from './style.scss';

const noop = () => {};
const cx = classNames.bind(styles);

const TooltipBox = ({
  isVisible,
  xPosition,
  yPosition,
  contentRef,
  onContentMouseEnter,
  onContentMouseLeave,
  children
}) => {
  noticeAboutDeprecation('deprecated component - Tooltip, please use CSSTooltip or PopperTooltip instead');

  return  (
  <div
    className={cx({
      tooltip__box: true,
      'tooltip__box--visible': isVisible
    })}
    style={{ top: `${yPosition}px`, left: `${xPosition}px` }}
    onMouseEnter={onContentMouseEnter}
    onMouseLeave={onContentMouseLeave}
    ref={contentRef}
  >
    <div className={styles['tooltip__box-content']}>{children}</div>
  </div>
);}

TooltipBox.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  onContentMouseEnter: PropTypes.func,
  onContentMouseLeave: PropTypes.func,
  contentRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]).isRequired
};

TooltipBox.defaultProps = {
  onContentMouseEnter: noop,
  onContentMouseLeave: noop
};

export default TooltipBox;
