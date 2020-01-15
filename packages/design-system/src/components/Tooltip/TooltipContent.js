import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { ARROW_POSITION, ALIGMENT } from '../../constants/tooltip';
import { getArrowOffsetStyle } from './helpers';
import styles from './style.scss';

import { noticeAboutDeprecation } from '../../helpers/notice-about-deprecation'

const cx = classNames.bind(styles);

const TooltipContent = ({
  backgroundColor,
  className,
  fontColor,
  arrowPosition,
  children,
  arrowOffset,
  arrowAlign
}) => {
  const mergedClassNames = getMergedClassNames(
    cx({
      tooltip__content: true
    }),
    className
  );
  
  noticeAboutDeprecation('deprecated component - Tooltip, please use CSSTooltip or PopperTooltip instead');

  return (
    <div
      className={mergedClassNames}
      style={{
        backgroundColor,
        color: fontColor,
        borderColor: backgroundColor
      }}
    >
      <div
        className={cx({
          tooltip__arrow: true,
          [`tooltip__arrow--${arrowPosition}`]: true
        })}
        style={getArrowOffsetStyle(arrowOffset, arrowPosition, arrowAlign)}
      />
      {children}
    </div>
  );
};

TooltipContent.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  fontColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  arrowPosition: PropTypes.oneOf([
    ARROW_POSITION.Left,
    ARROW_POSITION.Right,
    ARROW_POSITION.Top,
    ARROW_POSITION.Bottom
  ]),
  arrowAlign: PropTypes.oneOf([
    ALIGMENT.Top,
    ALIGMENT.Bottom,
    ALIGMENT.Left,
    ALIGMENT.Right,
    ALIGMENT.Center
  ]),
  arrowOffset: PropTypes.number
};

TooltipContent.defaultProps = {
  arrowPosition: ARROW_POSITION.Left,
  className: ''
};

export default TooltipContent;
