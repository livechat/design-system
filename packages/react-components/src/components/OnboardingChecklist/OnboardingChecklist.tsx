import * as React from 'react';

import cx from 'clsx';

import { Heading, Text } from '../Typography';

import { CheckListItem } from './components';
import { IOnboardingChecklistProps } from './types';

import styles from './OnboardingChecklist.module.scss';

const baseClass = 'onboarding-checklist';

export const OnboardingChecklist: React.FC<IOnboardingChecklistProps> = ({
  activeId,
  checkedId,
  title,
  titleLabel,
  items,
  onActiveChange,
}) => {
  return (
    <div className={styles[baseClass]}>
      <div className={styles[`${baseClass}__column`]}>
        <div className={styles[`${baseClass}__header`]}>
          {titleLabel && (
            <Text size="lg" className={styles[`${baseClass}__header__label`]}>
              {titleLabel}
            </Text>
          )}
          <Heading size="lg" className={styles[`${baseClass}__header__title`]}>
            {title}
          </Heading>
        </div>
        <div className={styles[`${baseClass}__checklist`]}>
          {items.map((item, index) => (
            <CheckListItem
              key={index}
              id={item.id}
              description={item.description}
              title={item.title}
              isActive={item.id === activeId}
              isChecked={checkedId.includes(item.id)}
              isLastElement={index === items.length - 1}
              onClick={onActiveChange}
              primaryButton={item.primaryButton}
              secondaryButton={item.secondaryButton}
            />
          ))}
        </div>
      </div>
      <div
        className={cx(
          styles[`${baseClass}__column`],
          styles[`${baseClass}__column--right`]
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cx(styles[`${baseClass}__placeholder`], {
              [styles[`${baseClass}__placeholder--active`]]:
                item.id === activeId,
            })}
          >
            {item.placeholder}
          </div>
        ))}
      </div>
    </div>
  );
};
