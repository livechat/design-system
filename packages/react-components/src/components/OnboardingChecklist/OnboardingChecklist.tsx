import * as React from 'react';

import { CheckCircle } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';
import { Heading, Text } from '../Typography';

import { CheckListItem } from './components';
import { IOnboardingChecklistProps } from './types';

import styles from './OnboardingChecklist.module.scss';

const baseClass = 'onboarding-checklist';
const COMPLETE_CONTAINER_EIGHT = 96;

export const OnboardingChecklist: React.FC<IOnboardingChecklistProps> = ({
  activeId,
  checkedId,
  title,
  titleLabel,
  items,
  onActiveChange,
  placeholderClassName,
  isCompleted = false,
  completeItem,
}) => {
  const [complete, setComplete] = React.useState(isCompleted);
  const [currentContainerHeight, setCurrentContainerHeight] = React.useState<
    number | undefined
  >(undefined);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const delay = completeItem?.delay || 1500;
    const container = containerRef.current;

    if (isCompleted && container) {
      const currentHeight = container.offsetHeight;
      setCurrentContainerHeight(currentHeight);

      setTimeout(() => {
        setComplete(true);
      }, delay);
    }
  }, [isCompleted]);

  return (
    <div
      ref={containerRef}
      className={cx(styles[baseClass], {
        [styles[`${baseClass}--complete`]]: complete,
      })}
      style={{
        height: !complete ? currentContainerHeight : COMPLETE_CONTAINER_EIGHT,
      }}
    >
      {!complete && (
        <>
          <div className={styles[`${baseClass}__column`]}>
            <div className={styles[`${baseClass}__header`]}>
              {titleLabel && (
                <Text
                  size="lg"
                  className={styles[`${baseClass}__header__label`]}
                >
                  {titleLabel}
                </Text>
              )}
              <Heading
                size="lg"
                className={styles[`${baseClass}__header__title`]}
              >
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
                  cta={item.cta}
                />
              ))}
            </div>
          </div>
          <div
            className={cx(
              styles[`${baseClass}__column`],
              styles[`${baseClass}__column--right`],
              placeholderClassName
            )}
          >
            {!isCompleted &&
              items.map((item, index) => {
                return (
                  item.id === activeId && (
                    <div
                      key={index}
                      className={styles[`${baseClass}__placeholder`]}
                    >
                      {item.placeholder}
                    </div>
                  )
                );
              })}
            {isCompleted && completeItem && (
              <div className={styles[`${baseClass}__placeholder`]}>
                {completeItem.placeholder}
              </div>
            )}
          </div>
        </>
      )}
      {complete && (
        <div className={styles[`${baseClass}__complete`]}>
          <div>
            <Icon
              size="large"
              className={styles[`${baseClass}__complete__icon`]}
              source={CheckCircle}
            />
          </div>
          <div>
            {completeItem?.titleLabel && (
              <Text
                size="lg"
                className={styles[`${baseClass}__complete__label`]}
              >
                {completeItem.titleLabel}
              </Text>
            )}
            <Heading
              size="sm"
              className={styles[`${baseClass}__complete__title`]}
            >
              {completeItem.title}
            </Heading>
          </div>
        </div>
      )}
    </div>
  );
};
