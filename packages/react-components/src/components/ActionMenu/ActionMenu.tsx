import * as React from 'react';

import {
  useFloating,
  Placement,
  flip,
  offset,
  autoUpdate,
  useClick,
  useInteractions,
  useDismiss,
  useRole,
  useTransitionStyles,
  Strategy,
} from '@floating-ui/react';
import { Check } from '@livechat/design-system-icons';
import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { ComponentCoreProps } from '../../utils/types';
import { Icon } from '../Icon';

import { IActionMenuOption } from './types';

import styles from './ActionMenu.module.scss';

export interface ActionMenuProps extends ComponentCoreProps {
  /**
   * The CSS class for trigger container
   */
  triggerClassName?: string;
  /**
   * Array of menu options
   */
  options: IActionMenuOption[];
  /**
   * Array of selected menu options keys
   */
  selectedOptions?: string[];
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
  onOpen?: () => void;
  /**
   * Set the type of CSS position property to use
   * https://floating-ui.com/docs/usefloating#strategy
   */
  floatingStrategy?: Strategy;
}

const baseClass = 'action-menu';

export const ActionMenu: React.FC<ActionMenuProps> = ({
  className,
  triggerClassName,
  options,
  triggerRenderer,
  placement = 'bottom-end',
  openedOnInit = false,
  keepOpenOnClick,
  flipOptions,
  visible,
  onClose,
  onOpen,
  floatingStrategy,
  selectedOptions,
  ...props
}) => {
  const isControlled = visible !== undefined;
  const [isVisible, setIsVisible] = React.useState(openedOnInit);
  const indexRef = React.useRef<number>(-1);
  const ref = React.useRef<HTMLUListElement | null>(null);
  const currentlyVisible = isControlled ? visible : isVisible;

  const handleMenuStateChange = () => {
    if (currentlyVisible) {
      onClose?.();
      !isControlled && setIsVisible(false);
    } else {
      onOpen?.();
      !isControlled && setIsVisible(true);
    }
  };

  const { x, y, strategy, refs, context } = useFloating({
    middleware: [offset(4), flip(flipOptions)],
    placement: placement,
    open: currentlyVisible,
    strategy: floatingStrategy,
    onOpenChange: handleMenuStateChange,
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    enabled: currentlyVisible,
  });
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);
  const { styles: transitionStyles } = useTransitionStyles(context, {
    initial: ({ side }) => ({
      opacity: 0,
      ...((side === 'bottom' && {
        marginTop: -10,
      }) ||
        (side === 'top' && {
          marginTop: 10,
        }) ||
        (side === 'left' && {
          marginLeft: 10,
        }) ||
        (side === 'right' && {
          marginLeft: -10,
        })),
    }),
  });

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
    if (currentlyVisible) {
      document.addEventListener('keydown', onKeyDown);

      return () => document.removeEventListener('keydown', onKeyDown);
    } else {
      indexRef.current = -1;
    }
  }, [currentlyVisible, onKeyDown]);

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
            [styles[`${baseClass}__list__item--selected`]]:
              selectedOptions?.includes(option.key),
          })}
        >
          {option.element}
          {selectedOptions?.includes(option.key) && (
            <div className={styles[`${baseClass}__list__item__icon`]}>
              <Icon source={Check} kind="action-primary" />
            </div>
          )}
        </button>
      </li>
    );
  };

  return (
    <>
      <div
        aria-label="Toggle menu"
        data-testid="action-menu-trigger-button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={triggerClassName}
      >
        {triggerRenderer}
      </div>
      {currentlyVisible && (
        <div
          ref={refs.setFloating}
          className={styles[baseClass]}
          style={{
            position: strategy,
            top: y !== null && y !== undefined ? y : '',
            left: x !== null && x !== undefined ? x : '',
            ...transitionStyles,
          }}
          {...getFloatingProps()}
        >
          <ul
            {...props}
            className={cx(styles[`${baseClass}__list`], className)}
            role="menu"
            ref={ref}
          >
            {options.map(getOptionElement)}
          </ul>
        </div>
      )}
    </>
  );
};
