import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useAnimations } from '../../../../hooks';
import noop from '../../../../utils/noop';
import { Icon } from '../../../Icon';
import { Text } from '../../../Typography';
import { SideNavigationItem } from '../SideNavigationItem/SideNavigationItem';

import { ISideNavigationGroupProps } from './types';

import styles from './SideNavigationGroup.module.scss';

const baseClass = 'side-navigation-group';
const SINGLE_ELEMENT_SIZE = 34;

export const SideNavigationGroup: React.FC<ISideNavigationGroupProps> = ({
  label,
  rightNode,
  className,
  labelClassName,
  labelWrapperClassName,
  listWrapperClassName,
  children,
  isCollapsible,
  isLinkLabel,
  isActive,
  isOpen: isListOpen,
  isMounted: isListMounted,
  setShouldBeVisible: setListShouldBeVisible,
  onItemHover,
  onClick,
  listWrapperRef: externalListWrapperRef,
  shouldOpenOnInit = false,
}) => {
  const [hasActiveElements, setHasActiveElements] =
    React.useState<boolean>(false);
  const [listHeight, setListHeight] = React.useState<number>(0);
  const hadActiveListElementsRef = React.useRef(false);
  const listWrapperRef = React.useRef<HTMLDivElement>(null);
  const localListWrapperRef = externalListWrapperRef ?? listWrapperRef;
  const { isOpen, isMounted, setShouldBeVisible } = useAnimations({
    isVisible: !isCollapsible || shouldOpenOnInit,
    elementRef: localListWrapperRef,
  });

  const localIsOpen = isListOpen ?? isOpen;
  const localIsMounted = isListMounted ?? isMounted;
  const localSetShouldBeVisible = setListShouldBeVisible ?? setShouldBeVisible;
  const localRightNode =
    typeof rightNode === 'function' ? rightNode(localIsOpen) : rightNode;
  const localLabel = typeof label === 'function' ? label(localIsOpen) : label;

  const openList = (): void => localSetShouldBeVisible(true);
  const toggle = (): void => {
    if (!isCollapsible) return;
    localSetShouldBeVisible((prev) => !prev);
  };

  const handleClick = (): void => (onClick ? onClick({ toggle }) : toggle());

  React.useEffect(() => {
    if (!children || !isCollapsible) {
      return;
    }

    const listElements = React.Children.toArray(
      children
    ) as React.ReactElement[];
    const hasListActiveElements = !!listElements?.some(
      (el) => el.props?.isActive
    );

    setHasActiveElements(hasListActiveElements);

    const newListHeight = (listElements?.length || 0) * SINGLE_ELEMENT_SIZE;
    setListHeight(newListHeight);
  }, [children]);

  React.useEffect(() => {
    if (!hadActiveListElementsRef.current && hasActiveElements) {
      openList();
    }

    hadActiveListElementsRef.current = hasActiveElements;
  }, [hasActiveElements, hadActiveListElementsRef.current, shouldOpenOnInit]);

  return (
    <div data-testid="side-navigation-group" className={styles[baseClass]}>
      {isCollapsible || isLinkLabel ? (
        <SideNavigationItem
          leftNode={
            <div
              className={cx(styles[`${baseClass}__chevron`], {
                [styles[`${baseClass}__chevron--active`]]: localIsOpen,
              })}
            >
              {isCollapsible ? (
                <Icon source={ChevronRight} size="small" />
              ) : null}
            </div>
          }
          label={
            <Text
              className={cx(styles[`${baseClass}__label`], labelClassName)}
              bold
            >
              {localLabel}
            </Text>
          }
          isActive={isActive}
          isMainEntry
          onClick={handleClick}
          onItemHover={onItemHover}
          rightNode={localRightNode}
          className={labelWrapperClassName}
        />
      ) : (
        <span
          className={cx(
            styles[`${baseClass}__simple-label-wrapper`],
            labelWrapperClassName
          )}
        >
          <Text
            bold
            className={cx(styles[`${baseClass}__simple-label`], labelClassName)}
            onMouseEnter={onItemHover || noop}
          >
            {localLabel}
          </Text>
          {localRightNode && (
            <span className={styles[`${baseClass}__right-node`]}>
              {localRightNode}
            </span>
          )}
        </span>
      )}

      <div
        ref={localListWrapperRef}
        className={cx([
          styles[`${baseClass}__list-wrapper`],
          {
            [styles[`${baseClass}__list-wrapper--expanded`]]: localIsOpen,
          },
          listWrapperClassName,
        ])}
        style={
          isCollapsible
            ? { maxHeight: localIsOpen ? listHeight : 0 }
            : undefined
        }
      >
        {localIsMounted && (
          <ul className={cx(styles[`${baseClass}__list`], className)}>
            {children}
          </ul>
        )}
      </div>
    </div>
  );
};
