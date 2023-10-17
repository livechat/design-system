import * as React from 'react';

import {
  useFloating,
  Placement,
  flip,
  offset,
  autoUpdate,
} from '@floating-ui/react-dom';import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';

import { IActionMenuOption } from './types';

import styles from './ActionMenu.module.scss';

export interface ActionMenuProps {
  /**
   * The CSS class for menu container
   */
  className?: string;
  /**
   * Array of menu options
   */
  options: IActionMenuOption[];
  /**
   * Trigger element
   */
  triggerRenderer: React.ReactElement;
  /**
   * The menu placement
   */
  placement?: Placement;
  /**
   * Will open menu on component initialization
   */
  openedOnInit?: boolean;
  /**
   * Menu will stay open after option click
   */
  keepOpenOnClick?: boolean;
  /**
   * Set the menu placement to keep it in view
   */
  flipOptions?: Parameters<typeof flip>[0];
  /**
   * Set to control the menu visibility
   */
  visible?: boolean;
  /**
   * Optional handler called on menu close
   */
  onClose?: () => void;
  /**
   * Optional handler called on menu open
   */
  onOpen?: () => void
}

const baseClass = 'action-menu';

export const ActionMenu: React.FC<ActionMenuProps> = ({
  className,
  options,
  triggerRenderer,
  placement = 'bottom-end',
  openedOnInit = false,
  keepOpenOnClick,
  flipOptions,
  visible,
  onClose,
  onOpen,
  ...props
}) => {
  const isControlled = visible !== undefined;
  const [isVisible, setIsVisible] = React.useState(openedOnInit);
  const indexRef = React.useRef<number>(-1);
  const ref = React.useRef<HTMLUListElement | null>(null);
  const currentVisibility = isControlled ? visible : isVisible;
  const mergedClasNames = cx(
    styles[baseClass],
    currentVisibility && styles[`${baseClass}--visible`]
  );
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    refs,
    update,
    placement: updatedPlacement,
  } = useFloating({
    middleware: [offset(4), flip(flipOptions)],
    placement: placement,
  });

  function handleDocumentClick(event: MouseEvent) {
    const isListElementClick = refs.floating.current && (refs.floating.current as Node).contains(event.target as Node);
    const isTriggerElementClick = refs.reference.current && (refs.reference.current as Node).contains(event.target as Node);

    if (isListElementClick) {
      return;
    } else if (isTriggerElementClick) {
      if (currentVisibility) {
        onClose?.();
        !isControlled && setIsVisible(false);
      } else {
        onOpen?.();
        !isControlled &&  setIsVisible(true);
      }
    } else {
      onClose?.();
      !isControlled && setIsVisible(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isVisible, visible]);

  React.useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, updatedPlacement, isVisible, visible]);

  const getIndex = (val: number): number => {
    const currentValue = indexRef.current;
    let newValue = currentValue + val;

    while (options[newValue]?.disabled || options[newValue]?.groupHeader) {
      newValue += val;

      if (newValue === -1) {
        newValue = currentValue;
        break;
      }
    }

    return newValue;
  };

  const focusElement = (val: number) => {
    indexRef.current = getIndex(val);
    const elements = ref.current?.children;
    const elementToFocus =
      elements &&
      (elements[indexRef.current]?.children[0] as HTMLButtonElement);

    return elementToFocus?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();
      focusElement(-1);
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < options.length) {
      e.preventDefault();
      focusElement(+1);
    }
  };

  React.useEffect(() => {
    if (currentVisibility) {
      document.addEventListener('keydown', onKeyDown);

      return () => document.removeEventListener('keydown', onKeyDown);
    } else {
      indexRef.current = -1;
    }
  }, [isVisible, visible, onKeyDown]);

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    indexRef.current = index;
    itemOnClick?.();

    if (!isControlled && !keepOpenOnClick) {
      setIsVisible(false);
      onClose?.();
    }
  };

  const getOptionElement = (option: IActionMenuOption, index: number) => {
    if (option.groupHeader) {
      return (
        <li
          key={option.key}
          role="none"
          className={styles[`${baseClass}__list__group-header`]}
        >
          {option.element}
        </li>
      );
    }

    return (
      <li key={option.key} role="none">
        <button
          data-testid={option.key}
          tabIndex={-1}
          key={option.key}
          disabled={option.disabled}
          onClick={() => handleItemClick(index, option.onClick)}
          role="menuitem"
          className={cx(styles[`${baseClass}__list__item`], {
            [styles[`${baseClass}__list__item--disabled`]]: option.disabled,
            [styles[`${baseClass}__list__item--with-divider`]]:
              option.withDivider,
          })}
        >
          {option.element}
        </button>
      </li>
    );
  };

  return (
    <>
      <div ref={reference}>
        {triggerRenderer}
      </div>
      <div
        ref={floating}
        className={mergedClasNames}
        style={{
          position: strategy,
          top: y !== null && y !== undefined ? y : '',
          left: x !== null && x !== undefined ? x : '',
        }}
      >
        <ul
          {...props}
          className={cx(styles[`${baseClass}__list`], className)}
          role="menu"
          aria-hidden={!isVisible}
          ref={ref}
        >
          {options.map(getOptionElement)}
        </ul>
      </div>
    </>
  )
};
