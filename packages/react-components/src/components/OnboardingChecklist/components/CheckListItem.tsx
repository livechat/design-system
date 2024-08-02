import * as React from 'react';

import { Check } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Heading, Text } from '../../Typography';
import { ICheckListItem } from '../types';

import styles from './CheckListItem.module.scss';

const baseClass = 'checklist-item';

export const CheckListItem: React.FC<ICheckListItem> = ({
  id,
  isActive,
  isChecked,
  title,
  description,
  onClick,
  primaryButton,
}) => {
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);

  React.useEffect(() => {
    if (
      descriptionRef.current &&
      size !== descriptionRef.current.offsetHeight
    ) {
      setSize(descriptionRef.current.offsetHeight);
    }
  }, [descriptionRef]);

  return (
    <div
      className={cx(styles[baseClass], {
        [styles[`${baseClass}--active`]]: isActive,
      })}
    >
      <span
        className={cx(styles[`${baseClass}__check-mark`], {
          [styles[`${baseClass}__check-mark--checked`]]: isChecked,
        })}
      >
        {isChecked && <Icon size="small" source={Check} />}
      </span>
      <div
        onClick={() => onClick(id)}
        className={cx(styles[`${baseClass}__content`], {
          [styles[`${baseClass}__content--open`]]: isActive,
        })}
      >
        <Heading
          size="xs"
          className={cx(styles[`${baseClass}__content__label`], {
            [styles[`${baseClass}__content__label--open`]]: isActive,
          })}
        >
          {title}
        </Heading>
        <div
          className={styles[`${baseClass}__content__inner`]}
          style={{ maxHeight: isActive ? size : 0 }}
        >
          <span ref={descriptionRef}>
            <Text
              size="lg"
              className={styles[`${baseClass}__content__inner__description`]}
            >
              {description}
            </Text>
            <div className={styles[`${baseClass}__content__inner__cta`]}>
              {primaryButton && (
                <Button
                  kind="high-contrast"
                  onClick={primaryButton.onClick}
                  icon={primaryButton.icon}
                  iconPosition={primaryButton.iconPosition}
                >
                  {primaryButton.label}
                </Button>
              )}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
