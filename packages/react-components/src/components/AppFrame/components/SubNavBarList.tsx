import * as React from 'react';

import cx from 'clsx';

import noop from '../../../utils/noop';
import { Text } from '../../Typography';
import { ISubNavBarListProps } from '../types';

import { SubNavBarListItem } from './SubNavBarListItem';

import styles from './SubNavBarList.module.scss';

const baseClass = 'sub-nav-bar-list';

export const SubNavBarList: React.FC<ISubNavBarListProps> = ({
  label,
  rightNode,
  className,
  children,
  isCollapsible,
  onItemHover,
  // tourStep,
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
        <SubNavBarListItem
          icon={
            <div
              className={cx(styles[`${baseClass}__chevron`], {
                [styles[`${baseClass}__chevron--active`]]: isOpen,
              })}
            >
              {/* <ChevronRight width={16} height={16} /> */}
              test
            </div>
          }
          label={<Text bold>{localLabel}</Text>}
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

  // return tourStep ? (
  //   <UserGuidedTourStep tourId={tourStep.id} step={tourStep.step}>
  //     {listContent}
  //   </UserGuidedTourStep>
  // ) : (
  return listContent;
  // );
};
