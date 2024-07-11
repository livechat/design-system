import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons';
import cx from 'clsx';

import noop from '../../../../utils/noop';
import { Icon } from '../../../Icon';
import { Text } from '../../../Typography';

import { SideNavigationItem } from './SideNavigationItem';
import { ISideNavigationListProps } from './types';

import styles from './SideNavigationList.module.scss';

const baseClass = 'side-navigation-list';

export const SideNavigationList: React.FC<ISideNavigationListProps> = ({
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
  const hadActiveListElementsRef = React.useRef(false);
  const localRightNode =
    typeof rightNode === 'function' ? rightNode(isOpen) : rightNode;
  const localLabel = typeof label === 'function' ? label(isOpen) : label;

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

  const listContent = (
    <div className={styles[baseClass]}>
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
        <Text onMouseEnter={onItemHover || noop}>{localLabel}</Text>
      )}

      <ul
        ref={onSetListNode}
        className={cx([
          styles[`${baseClass}__list`],
          {
            [styles[`${baseClass}__list--expanded`]]: isOpen,
            [styles[`${baseClass}__list--expanded-list-gap`]]:
              isOpen && isCollapsible,
          },
          className,
        ])}
      >
        {children}
      </ul>
    </div>
  );

  return listContent;
};
