import { FC, MouseEvent } from 'react';
import * as React from 'react';

import { Info } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../../../Icon';
import { Tooltip } from '../../../Tooltip';
import { Text } from '../../../Typography';
import { useProductSwitcherShortcut } from '../../hooks/useProductSwitcherShortcut';
import { IProductOption, ProductId } from '../../types';
import { ProductTile } from '../ProductTile/ProductTile';

import styles from './ProductRow.module.scss';

type IProps = {
  onClick: (event: MouseEvent, id: ProductId) => void;
  product: IProductOption;
  isActive?: boolean;
};

const baseClass = 'product-row';

export const ProductRow: FC<IProps> = ({
  product: {
    id,
    icon,
    backgroundColors,
    notificationCount,
    name,
    url,
    withDivider,
    shortcutKey,
    expired,
    trialDaysLeft,
    nameAdornment,
  },
  onClick,
  isActive = false,
}) => {
  if (shortcutKey) {
    useProductSwitcherShortcut(shortcutKey, url);
  }

  return (
    <>
      {withDivider && <div className={styles[`${baseClass}__divider`]} />}
      <a
        href={url}
        target="_blank"
        aria-label={`Go to ${name} product`}
        onClick={(event) => onClick(event, id)}
        className={cx(styles[baseClass], {
          [styles[`${baseClass}--expired`]]: expired,
        })}
      >
        <div className={styles[`${baseClass}__heading`]}>
          <ProductTile
            id={id}
            icon={icon}
            expired={expired}
            backgroundColors={backgroundColors}
            notificationCount={notificationCount}
            withBorder={isActive}
          ></ProductTile>
          <Text as="div" bold className={styles[`${baseClass}__name`]}>
            {name}
            {expired && (
              <Tooltip
                triggerRenderer={
                  <Icon
                    source={Info}
                    className={styles[`${baseClass}__tooltip-icon`]}
                  />
                }
                placement="right"
              >
                Your licence is expired
              </Tooltip>
            )}
            {trialDaysLeft && (
              <Tooltip
                triggerRenderer={
                  <Icon
                    source={Info}
                    className={styles[`${baseClass}__tooltip-icon`]}
                  />
                }
                placement="right"
              >
                {trialDaysLeft} trial day(s) left in your trial. Time to upgrade
              </Tooltip>
            )}
            {nameAdornment}
          </Text>
        </div>
        {shortcutKey && (
          <Text size="sm" className={styles[`${baseClass}__shortcut`]}>
            ⌘{shortcutKey}
          </Text>
        )}
      </a>
    </>
  );
};
