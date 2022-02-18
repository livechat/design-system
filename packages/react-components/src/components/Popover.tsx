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
  modifiers: PopoverModifiers;
  placement?: PopperCore.Placement;
  triggerRenderer: () => React.ReactNode;
}

export const Popover: React.FC<IPopoverProps> = (props) => {
  const { triggerRenderer, children, className, placement, closeOnEscPress } =
    props;

  const referenceRef = React.useRef<HTMLDivElement | null>(null);
  const popperRef = React.useRef<HTMLDivElement | null>(null);

  const [visible, setVisibility] = React.useState(false);

  function handleDropdownClick() {
    setVisibility(!visible);
  }

  function handleDocumentClick(event: any) {
    if (referenceRef.current?.contains(event.target)) {
      return;
    }

    setVisibility(false);
  }

  const handleHideOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscPress) {
      setVisibility(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleHideOnEscape);
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('keydown', handleHideOnEscape);
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

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

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      modifiers: buildPopperModifiers(props.modifiers),
      placement: placement,
    }
  );

  const mergedClassNames = cx(
    `${className ? className : ''} popover ${visible ? 'popover__visible' : ''}`
  );

  return (
    <>
      {triggerRenderer && (
        <div onClick={handleDropdownClick} ref={referenceRef}>
          {triggerRenderer()}
        </div>
      )}

      <div
        ref={popperRef}
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
    </>
  );
};
