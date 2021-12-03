import * as React from 'react';
import {
  Manager,
  Reference,
  Popper,
  PopperChildrenProps,
  ReferenceChildrenProps,
} from 'react-popper';
import * as PopperJS from 'popper.js';
import ResizeObserver from 'resize-observer-polyfill';
import { getMergedClassNames } from './helpers';
import { KeyCodes } from './constants';

export interface IDropdownProps {
  children?: React.ReactNode;
  className?: string;
  closeOnEscPress?: boolean;
  closeOnEnterPress?: boolean;
  closeKeyCodes?: number[];
  eventsEnabled?: boolean;
  isVisible?: boolean;
  modifiers: PopperJS.Modifiers;
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  referenceElement?: PopperJS.ReferenceObject;
  shouldUpdateOnResize?: boolean;
  triggerRenderer?: (props: ReferenceChildrenProps) => React.ReactNode;
  zIndex?: number;
  onClose?: () => void;
  popupRef?: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
  let computedModifiers;
  let popupRef: React.RefObject<HTMLElement>;
  let observer: ResizeObserver;
  let triggerRef: React.RefObject<HTMLElement>;
  let popperScheduleUpdate: () => void;

  React.useEffect(() => {
    if (props.isVisible) {
      addEventHandlers();
      attachResizeObserver();
    }

    return () => {
      removeEventHandlers();
      detachResizeObserver();
    };
  }, []);

  React.useEffect(() => {
    if (props.isVisible) {
      addEventHandlers();
      attachResizeObserver();
      if (popupRef.current) {
        popupRef.current.focus({ preventScroll: true });
      }
    } else {
      removeEventHandlers();
      detachResizeObserver();
    }
  });

  const addEventHandlers = () => {
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener(
      'click',
      handleDocumentClick as EventListener,
      true
    );
  };

  const setTriggerRef = (ref: React.RefObject<HTMLElement>) => {
    triggerRef = ref;
  };

  const attachResizeObserver = () => {
    // to boost component performance resize observer should be optional
    if (props.shouldUpdateOnResize && popupRef.current) {
      observer = new ResizeObserver(() => {
        if (popperScheduleUpdate) {
          popperScheduleUpdate();
        }
      });
      observer.observe(popupRef.current);
    }
  };

  const handleDocumentClick = (event: Event & { target: Element }) => {
    if (
      props.isVisible &&
      props.onClose &&
      popupRef &&
      triggerRef &&
      !popupRef.current?.contains(event.target) &&
      !triggerRef.current?.contains(event.target)
    ) {
      props.onClose();
    }
  };

  const buildPopperModifiers = (
    modifiers: PopperJS.Modifiers
  ): PopperJS.Modifiers => {
    const { offset, flip, hide, preventOverflow, arrow, ...rest } = modifiers;
    return {
      offset: {
        offset: (arrow || {}).enabled ? '0, 12' : '0, 4',
        ...(offset || {}),
      },
      flip: { enabled: true, behavior: 'flip', ...(flip || {}) },
      arrow: { enabled: false, ...(arrow || {}) },
      hide: { enabled: true, ...(hide || {}) },
      preventOverflow: {
        enabled: true,
        escapeWithReference: true,
        boundariesElement: 'viewport',
        ...(preventOverflow || {}),
      },
      ...rest,
    };
  };

  const setPopupRef = (ref: React.RefObject<HTMLElement>) => {
    popupRef = ref;
  };

  const handleKeyDown = (event: Event & { keyCode: number }) => {
    const { keyCode } = event;
    const { closeKeyCodes, closeOnEnterPress, closeOnEscPress, onClose } =
      props;

    if (onClose) {
      const isEscKeyPressed = keyCode === KeyCodes.esc;
      const isEnterKeyPressed = keyCode === KeyCodes.enter;
      const isCustomCloseKeyPressed =
        closeKeyCodes && closeKeyCodes.includes(keyCode);

      if (
        (closeOnEscPress && isEscKeyPressed) ||
        (closeOnEnterPress && isEnterKeyPressed) ||
        isCustomCloseKeyPressed
      ) {
        onClose();
        if (triggerRef) {
          triggerRef.current?.focus();
        }
      }
    }
  };

  const detachResizeObserver = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  const removeEventHandlers = () => {
    document.removeEventListener(
      'keydown',
      handleKeyDown as EventListener,
      true
    );
    document.removeEventListener(
      'click',
      handleDocumentClick as EventListener,
      true
    );
  };

  const renderDropdownContent = ({
    ref,
    style,
    placement,
    arrowProps,
    scheduleUpdate,
  }: PopperChildrenProps): React.ReactNode => {
    const { className, isVisible, zIndex, children, modifiers } = props;
    computedModifiers = buildPopperModifiers(modifiers);
    popperScheduleUpdate = scheduleUpdate;

    const mergedClassNames = getMergedClassNames(
      `${className ? className : ''} dropdown ${
        isVisible ? 'dropdown--visible' : ''
      }`
    );

    return (
      <div
        ref={ref}
        tabIndex={0}
        style={{ ...style, zIndex }}
        data-placement={placement}
        className={mergedClassNames}
      >
        {children}
        {computedModifiers.arrow?.enabled && (
          <div
            ref={arrowProps.ref}
            className={'dropdown__arrow'}
            data-placement={placement}
            style={arrowProps.style}
          />
        )}
      </div>
    );
  };

  const {
    placement,
    triggerRenderer,
    eventsEnabled,
    positionFixed,
    referenceElement,
    isVisible,
  } = props;

  return (
    <Manager>
      {triggerRenderer && (
        <Reference innerRef={setTriggerRef}>{triggerRenderer}</Reference>
      )}
      {isVisible && (
        <Popper
          innerRef={setPopupRef}
          placement={placement}
          modifiers={computedModifiers}
          eventsEnabled={eventsEnabled}
          positionFixed={positionFixed}
          referenceElement={referenceElement}
        >
          {renderDropdownContent}
        </Popper>
      )}
    </Manager>
  );
};

export default Dropdown;
