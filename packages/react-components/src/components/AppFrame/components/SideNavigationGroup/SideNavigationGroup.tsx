import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons';
import cx from 'clsx';

import noop from '../../../../utils/noop';
import { Icon } from '../../../Icon';
import { Text } from '../../../Typography';
import { SideNavigationItem } from '../SideNavigationItem/SideNavigationItem';

import { ISideNavigationGroupProps } from './types';

import styles from './SideNavigationGroup.module.scss';

const baseClass = 'side-navigation-group';
const singleElementSize = 34;

export const SideNavigationGroup: React.FC<ISideNavigationGroupProps> = ({
  label,
  rightNode,
  className,
  children,
  isCollapsible,
  onItemHover,
  shouldOpenOnInit = false,
  shouldOpenOnActive = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(
    !isCollapsible || shouldOpenOnInit
  );
  const [hasActiveElements, setHasActiveElements] =
    React.useState<boolean>(false);
  const [listHeight, setListHeight] = React.useState<number>(0);
  const [isGroupMounted, setIsGroupMounted] = React.useState(isOpen);
  const hadActiveListElementsRef = React.useRef(false);
  const listWrapperRef = React.useRef<HTMLDivElement>(null);
  const localRightNode =
    typeof rightNode === 'function' ? rightNode(isOpen) : rightNode;
  const localLabel = typeof label === 'function' ? label(isOpen) : label;

  React.useEffect(() => {
    const sideNavWrapper = listWrapperRef.current;

    if (!isOpen && sideNavWrapper) {
      const handleTransitionEnd = () => setIsGroupMounted(false);

      sideNavWrapper.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        sideNavWrapper.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
    }

    if (isOpen) {
      setIsGroupMounted(true);
      requestAnimationFrame(() => setIsOpen(true));

      return;
    }

    return setIsOpen(false);
  }, [isOpen]);

  const openList = (): void => setIsOpen(true);

  const toggle = (): void => {
    if (!isCollapsible) return;
    setIsOpen((prev) => !prev);
  };

  const onSetListNode = (node: HTMLUListElement): void => {
    const listElements = node?.getElementsByTagName('li');
    const hasListActiveElements = listElements?.length
      ? [...listElements].some(
          (el) => el.getAttribute('data-active') === 'true'
        )
      : false;

    setHasActiveElements(hasListActiveElements);

    const newListHeight = (listElements?.length || 0) * singleElementSize;
    setListHeight(newListHeight);
  };

  React.useEffect(() => {
    if (!shouldOpenOnActive) {
      return;
    }

    if (!hadActiveListElementsRef.current && hasActiveElements) {
      openList();
    }

    hadActiveListElementsRef.current = hasActiveElements;
  }, [hasActiveElements, shouldOpenOnActive]);

  return (
    <div data-testid="side-navigation-group" className={styles[baseClass]}>
      {isCollapsible ? (
        <SideNavigationItem
          leftNode={
            <div
              className={cx(styles[`${baseClass}__chevron`], {
                [styles[`${baseClass}__chevron--active`]]: isOpen,
              })}
            >
              <Icon source={ChevronRight} size="small" />
            </div>
          }
          label={
            <Text className={styles[`${baseClass}__label`]} bold>
              {localLabel}
            </Text>
          }
          isMainEntry
          onClick={toggle}
          onItemHover={onItemHover}
          rightNode={localRightNode}
        />
      ) : (
        <Text
          bold
          className={styles[`${baseClass}__simple-label`]}
          onMouseEnter={onItemHover || noop}
        >
          {localLabel}
        </Text>
      )}

      <div
        ref={listWrapperRef}
        className={cx([
          styles[`${baseClass}__list-wrapper`],
          {
            [styles[`${baseClass}__list-wrapper--expanded`]]: isOpen,
          },
        ])}
        style={{ maxHeight: isOpen ? listHeight : 0 }}
      >
        {isGroupMounted && (
          <ul
            className={cx(styles[`${baseClass}__list`], className)}
            ref={onSetListNode}
          >
            {children}
          </ul>
        )}
      </div>
    </div>
  );
};
