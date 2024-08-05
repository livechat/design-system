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
  isLastElement,
  title,
  description,
  onClick,
  primaryButton,
  secondaryButton,
}) => {
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);

  React.useEffect(() => {
    const hasIOSupport = !!window.ResizeObserver;

    if (descriptionRef.current && hasIOSupport) {
      const resizeObserver = new ResizeObserver(() => {
        if (
          descriptionRef.current &&
          size !== descriptionRef.current.offsetHeight
        ) {
          setSize(descriptionRef.current.offsetHeight);
        }
      });

      resizeObserver.observe(descriptionRef.current);

      return () => resizeObserver.disconnect();
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
        {!isLastElement && (
          <span className={styles[`${baseClass}__check-mark__line`]} />
        )}
      </span>
      <div
        onClick={!isActive ? () => onClick(id) : undefined}
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
          <div ref={descriptionRef}>
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
              {secondaryButton && (
                <Button
                  kind="plain"
                  onClick={secondaryButton.onClick}
                  icon={secondaryButton.icon}
                  iconPosition={secondaryButton.iconPosition}
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
