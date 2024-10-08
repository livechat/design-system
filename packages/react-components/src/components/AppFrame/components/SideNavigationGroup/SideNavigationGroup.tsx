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
  children,
  isCollapsible,
  onItemHover,
  shouldOpenOnInit = false,
}) => {
  const [initialMount, setInitialMount] = React.useState<boolean>(true);
  const [hasActiveElements, setHasActiveElements] =
    React.useState<boolean>(false);
  const [listHeight, setListHeight] = React.useState<number>(0);
  const hadActiveListElementsRef = React.useRef(false);
  const listWrapperRef = React.useRef<HTMLDivElement>(null);
  const { isOpen, isMounted, setShouldBeVisible } = useAnimations({
    isVisible: !isCollapsible || shouldOpenOnInit,
    elementRef: listWrapperRef,
  });
  const localRightNode =
    typeof rightNode === 'function' ? rightNode(isOpen) : rightNode;
  const localLabel = typeof label === 'function' ? label(isOpen) : label;
  const shouldRenderList = initialMount ? initialMount : isMounted;

  const openList = (): void => setShouldBeVisible(true);

  const toggle = (): void => {
    if (!isCollapsible) return;
    setShouldBeVisible((prev) => !prev);
  };

  const onSetListNode = (node: HTMLUListElement): void => {
    const listElements = node?.getElementsByTagName('li');
    const hasListActiveElements = listElements?.length
      ? [...listElements].some(
          (el) => el.getAttribute('data-active') === 'true'
        )
      : false;

    setHasActiveElements(hasListActiveElements);

    const newListHeight = (listElements?.length || 0) * SINGLE_ELEMENT_SIZE;
    setListHeight(newListHeight);
    setInitialMount(false);
  };

  React.useEffect(() => {
    if (!hadActiveListElementsRef.current && hasActiveElements) {
      openList();
    }

    hadActiveListElementsRef.current = hasActiveElements;
  }, [hasActiveElements, hadActiveListElementsRef.current, shouldOpenOnInit]);

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
        {shouldRenderList && (
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
