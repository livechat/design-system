import * as React from 'react';
import { ModalPortal, ModalPortalProps } from '../Modal/';
import { ITooltipProps, Tooltip } from './Tooltip';
import SpotlightOverlay from './SpotlightOverlay';
import cx from 'clsx';
import styles from './Tooltip.module.scss';
import { ClientRectObject } from '@floating-ui/core';
import { throttle } from '@livechat/data-utils';

const spotlightPadding = 200;
const baseClass = 'guide-tooltip';

interface IOwnProps {
  shouldSlide?: boolean;
  className?: string;
  disableSpotlightPointerEvents?: boolean;
}

interface IUserGuide
  extends IOwnProps,
    ITooltipProps,
    Omit<ModalPortalProps, 'children'> {}

export const UserGuide: React.FC<IUserGuide> = (props) => {
  const { shouldSlide, className, parentElementName } = props;

  const [parentElement, setParentElement] = React.useState<Element | null>(
    null
  );

  const [rect, setRect] = React.useState<DOMRect | null>(null);

  const handleViewportChange = () => {
    parentElement && setRect(parentElement.getBoundingClientRect());
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange);

    return () => {
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('resize', handleViewportChange);
    };
  }, []);

  React.useEffect(() => {
    const element = document.querySelector(parentElementName);
    setParentElement(element);
  }, [parentElementName]);

  React.useEffect(() => {
    parentElement && setRect(parentElement.getBoundingClientRect());
  }, [parentElement]);

  return parentElement ? (
    <ModalPortal
      parentElementName={props.parentElementName}
      zIndex={props.zIndex}
      style={{ height: '100px' }}
    >
      <SpotlightOverlay
        gap={rect}
        isVisible={true}
        slide={shouldSlide}
        disablePointerEvents={true}
      />
      <Tooltip
        {...props}
        referenceElement={{
          getBoundingClientRect: () => {
            return rect as ClientRectObject;
          },
          contextElement: parentElement,
        }}
        arrowOffsetY={25}
        className={cx({
          [styles[baseClass]]: true,
          [styles[`${baseClass}--slide`]]: shouldSlide,
          className: className,
        })}
      >
        {props.children}
      </Tooltip>
    </ModalPortal>
  ) : null;
};
