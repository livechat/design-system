import * as React from 'react';

import { Check } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Checkbox } from '../../Checkbox';
import { Icon } from '../../Icon';
import { Heading, Text } from '../../Typography';
import { SELECT_ALL_OPTION_KEY } from '../constants';
import { IPickerListItem } from '../types';

import styles from './PickerListItem.module.scss';

interface IPickerListItemProps {
  index: number;
  isActive: boolean;
  isSelected: boolean;
  numberOfItems: number;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  onSelect: (key: string) => void;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  item: IPickerListItem;
}

const itemClassName = `picker-list__item`;

export const PickerListItem: React.FC<IPickerListItemProps> = ({
  index,
  isActive,
  isSelected,
  listElementsRef,
  onSelect,
  getItemProps,
  item,
  numberOfItems,
}) => {
  const getOptionContent = (item: IPickerListItem) => {
    if (item?.customElement) {
      return (
        <div className={styles[`${itemClassName}__custom`]}>
          {item.customElement.listItemBody}
        </div>
      );
    }

    return (
      <>
        {item.showCheckbox && (
          <Checkbox
            className={styles[`${itemClassName}__checkbox`]}
            checked={isSelected}
          />
        )}
        {item.icon && (
          <Icon
            className={styles[`${itemClassName}__icon`]}
            kind="link"
            source={item.icon}
          />
        )}
        {item.avatarSrc && (
          <img
            className={cx(styles[`${itemClassName}__avatar`])}
            src={item.avatarSrc}
            alt={item.name}
          />
        )}
        <div className={styles[`${itemClassName}__label-container`]}>
          <span
            className={cx({
              [styles[`${itemClassName}__main-label`]]: item.secondaryText,
            })}
            aria-disabled={item.disabled}
          >
            {item.name}
          </span>
          {item.secondaryText && (
            <span className={styles[`${itemClassName}__secondary-label`]}>
              {item.secondaryText}
            </span>
          )}
        </div>
      </>
    );
  };

  if (item.groupHeader) {
    return (
      <div
        id={`item-${index}`}
        key={item.key}
        role="group"
        className={styles[`${itemClassName}__header`]}
        {...getItemProps()}
      >
        <Heading size="2xs" uppercase bold as="div">
          {item.name}
        </Heading>
      </div>
    );
  }

  const handleOnClick = (key: string) => {
    !item.disabled && onSelect(key);
  };

  return (
    <div
      id={item.key}
      key={item.key}
      tabIndex={isActive ? 0 : -1}
      ref={(node) => {
        if (node) {
          listElementsRef.current[index] = node;
        }
      }}
      role="option"
      aria-setsize={numberOfItems}
      aria-posinset={index + 1}
      {...getItemProps({
        onClick: () => handleOnClick(item.key),
      })}
      className={cx(styles[`item-wrapper`], {
        [styles[`item-wrapper__first`]]: index === 0 && !item.groupHeader,
        [styles[`item-wrapper__last`]]:
          index === numberOfItems - 1 && !item.groupHeader,
      })}
    >
      <div
        aria-selected={isSelected}
        aria-disabled={item.disabled}
        aria-current={isActive && !item.disabled}
        className={cx(styles[itemClassName], {
          [styles[`${itemClassName}__custom`]]: item.customElement,
          [styles[`${itemClassName}--select-all`]]:
            item.key === SELECT_ALL_OPTION_KEY,
        })}
      >
        <Text as="span" className={styles[`${itemClassName}__content`]}>
          {getOptionContent(item)}
        </Text>
        {isSelected && !item.showCheckbox && (
          <Icon
            kind="link"
            source={Check}
            customColor="var(--content-basic-info)"
          />
        )}
      </div>
    </div>
  );
};
