import { type FC } from 'react';
import { useRef } from 'react';

import { useIsOverflow, useOnHover } from '../../hooks';
import { Tooltip } from '../Tooltip';

import { type OverflowTooltipTextProps } from './types';

import styles from './OverflowTooltipText.module.scss';

export const OverflowTooltipText: FC<OverflowTooltipTextProps> = ({ text }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow(wrapperRef);
  const { isHovered, handleMouseOut, handleMouseOver } = useOnHover(isOverflow);

  const renderChildren = (
    <div
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      ref={wrapperRef}
      className={styles.text}
    >
      {text}
    </div>
  );

  return (
    <Tooltip
      kind="invert"
      isVisible={isOverflow && isHovered}
      triggerRenderer={renderChildren}
    >
      <div className={styles.tooltipContent}>{text}</div>
    </Tooltip>
  );
};
