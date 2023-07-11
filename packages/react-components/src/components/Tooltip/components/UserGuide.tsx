import * as React from 'react';
import { ModalPortalProps } from '../../Modal/';
import { ITooltipProps, Tooltip } from '../Tooltip';
import SpotlightOverlay from '../SpotlightOverlay';
import cx from 'clsx';
import styles from '../Tooltip.module.scss';
import { ClientRectObject } from '@floating-ui/core';
import VirtualReference from '../virtualElementReference';

const spotlightPadding = 8;
const baseClass = 'guide-tooltip';

const virtualReference = (element: Element, padding: number) =>
  new VirtualReference(element, padding);
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
  const {
    className,
    parentElementName,
    isVisible = false,
    shouldSlide = true,
  } = props;

  const [parentElement, setParentElement] = React.useState<Element | null>(
    null
  );

  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [isSliding, setIsSliding] = React.useState<boolean>(shouldSlide);

  const handleViewportChange = () => {
    if (parentElement) {
      setRect(
        virtualReference(
          parentElement,
          spotlightPadding
        ).getBoundingClientRect() as DOMRect
      );
      setIsSliding(false);
    }
  };

  React.useEffect(() => {
    if (parentElement !== null) {
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('scroll', handleViewportChange);

      return () => {
        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('resize', handleViewportChange);
      };
    }
  }, [parentElement, parentElementName]);

  React.useEffect(() => {
    if (parentElementName) {
      const element = document.querySelector(parentElementName);
      setParentElement(element);
    }
  }, [parentElementName]);

  React.useEffect(() => {
    parentElement &&
      setRect(
        virtualReference(
          parentElement,
          spotlightPadding
        ).getBoundingClientRect() as DOMRect
      );
    setIsSliding(true);
  }, [parentElement]);

  return parentElement && isVisible ? (
    <div>
      <SpotlightOverlay
        gap={rect}
        isVisible={isVisible}
        slide={isSliding}
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
          [styles[`${baseClass}--slide`]]: isSliding,
          className: className,
        })}
      >
        {props.children}
      </Tooltip>
    </div>
  ) : null;
};
