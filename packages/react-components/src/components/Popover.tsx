import * as React from 'react';
import { usePopper } from 'react-popper';
import * as PopperCore from '@popperjs/core';
import cx from 'classnames';

type PopoverModifiers = {
  [key: string]: Partial<PopperCore.StrictModifiers>;
};
export interface IPopoverProps {
  children?: React.ReactNode;
  className?: string;
  closeOnEscPress?: boolean;
  isVisible?: boolean;
  modifiers: PopoverModifiers;
  placement?: PopperCore.Placement;
  triggerRenderer: () => React.ReactNode;
  onClose?: () => void;
}

export const Popover: React.FC<IPopoverProps> = (props) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const { triggerRenderer, isVisible, children, className, placement } = props;

  const buildPopperModifiers = (modifiers: PopoverModifiers) => {
    const { offset, flip, preventOverflow } = modifiers;

    const calculatedOffset = [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
          ...(offset?.options || {}),
        },
      },
    ];

    const calculateFlip = [
      {
        name: 'flip',
        options: {
          ...(flip?.options || {}),
        },
      },
    ];

    const calculatePreventOverflow = [
      {
        name: 'preventOverlow',
        options: {
          rootBoundary: 'viewport',
          ...(preventOverflow?.options || {}),
        },
      },
    ];

    return [...calculatedOffset, ...calculateFlip, ...calculatePreventOverflow];
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: buildPopperModifiers(props.modifiers),
    placement: placement,
  });

  const mergedClassNames = cx(
    `${className ? className : ''} popover ${
      isVisible ? 'popover__visible' : ''
    }`
  );

  return (
    <>
      {triggerRenderer && (
        <div ref={setReferenceElement}>{triggerRenderer()}</div>
      )}

      {isVisible && (
        <div
          ref={setPopperElement}
          className={mergedClassNames}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
          <div
            data-popper-placement={
              attributes.popper
                ? attributes.popper['data-popper-placement']
                : 'bottom'
            }
          />
        </div>
      )}
    </>
  );
};
