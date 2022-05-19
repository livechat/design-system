import * as React from 'react';
import { ModalPortal, ModalPortalProps } from '../Modal/';
import { ITooltipProps, Tooltip } from './Tooltip';
import SpotlightOverlay from './SpotlightOverlay';
import cx from 'clsx';
import styles from './Tooltip.module.scss';

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
  React.useEffect(() => {
    const element = document.querySelector(parentElementName);
    setParentElement(element);
  }, [parentElementName]);

  return parentElement ? (
    <ModalPortal
      parentElementName={props.parentElementName}
      zIndex={props.zIndex}
      style={{ height: '100px' }}
    >
      <SpotlightOverlay
        gap={parentElement.getBoundingClientRect()}
        isVisible={true}
        slide={shouldSlide}
        disablePointerEvents={true}
      />
      <Tooltip
        {...props}
        referenceElement={{
          getBoundingClientRect: () => {
            return parentElement.getBoundingClientRect();
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
      <SpotlightOverlay />
    </ModalPortal>
  ) : null;
};
