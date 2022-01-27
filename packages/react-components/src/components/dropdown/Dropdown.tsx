import * as React from 'react';
import { usePopper } from 'react-popper';
import * as PopperCore from '@popperjs/core';
import cx from 'classnames';

type DropdownModifiers = {
  [key: string]: Partial<PopperCore.StrictModifiers>;
};
export interface IDropdownProps {
  children?: React.ReactNode;
  className?: string;
  closeOnEscPress?: boolean;
  closeOnEnterPress?: boolean;
  closeKeyCodes?: number[];
  eventsEnabled?: boolean;
  isVisible?: boolean;
  modifiers: DropdownModifiers; //;
  placement?: PopperCore.Placement;
  positionFixed?: boolean;
  shouldUpdateOnResize?: boolean;
  triggerRenderer: () => React.ReactNode;
  zIndex?: number;
  onClose?: () => void;
  popupRef?: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  );

  const { triggerRenderer, isVisible, children, className, placement } = props;

  const buildPopperModifiers = (modifiers: DropdownModifiers) => {
    const { offset, arrow, flip, preventOverflow } = modifiers;

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

    return [
      ...calculatedOffset,
      ...calculateFlip,
      ...calculatePreventOverflow,
    ];
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: buildPopperModifiers(props.modifiers),
    placement: placement,
  });

  const mergedClassNames = cx(
    `${className ? className : ''} dropdown ${
      isVisible ? 'dropdown--visible' : ''
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
            ref={setArrowElement}
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

export default Dropdown;
