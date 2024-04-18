import * as React from 'react';

import { FloatingPortal } from '@floating-ui/react';
import cx from 'clsx';

import { ModalPortalProps } from '../../../Modal';
import { Tooltip } from '../../Tooltip';
import styles from '../../Tooltip.module.scss';
import { ITooltipProps } from '../../types';

import SpotlightOverlay from './SpotlightOverlay';
import VirtualReference from './virtualElementReference';

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
    Omit<ITooltipProps, 'triggerRenderer'>,
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
        window.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('scroll', handleViewportChange);
      };
    }
  }, [parentElement]);

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

  return parentElement && isVisible && rect ? (
    <FloatingPortal>
      <SpotlightOverlay
        gap={rect}
        isVisible={isVisible}
        slide={isSliding}
        disablePointerEvents
      />
      <Tooltip
        {...props}
        triggerRenderer={<></>}
        referenceElement={{
          getBoundingClientRect: () => {
            return rect;
          },
          contextElement: parentElement,
        }}
        className={cx({
          [styles[baseClass]]: true,
          [styles[`${baseClass}--slide`]]: isSliding,
          className: className,
        })}
      >
        {props.children}
      </Tooltip>
    </FloatingPortal>
  ) : null;
};
