import * as React from 'react';

import { CheckCircle, ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Heading, Text } from '../Typography';

import { CheckListItem } from './components';
import { IOnboardingChecklistProps } from './types';

import styles from './OnboardingChecklist.module.scss';

const baseClass = 'onboarding-checklist';

export const OnboardingChecklist: React.FC<IOnboardingChecklistProps> = ({
  activeItemId,
  completedItemsIds,
  title,
  greetingText,
  items,
  onActiveChange,
  placeholderClassName,
  isCompleted = false,
  completionMessageData,
  className,
}) => {
  const [isChecklistCompleted, setIsChecklistCompleted] =
    React.useState(isCompleted);
  const [isOpen, setIsOpen] = React.useState(!isCompleted);
  const [currentContainerHeight, setCurrentContainerHeight] = React.useState<
    number | undefined
  >(undefined);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const COMPLETE_CONTAINER_HEIGHT = completionMessageData.height || 96;

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  React.useEffect(() => {
    const delay = completionMessageData.delay || 1500;
    const container = containerRef.current;

    if (isCompleted && container) {
      const currentHeight = container.offsetHeight;
      setCurrentContainerHeight(currentHeight);

      const timeoutId = setTimeout(() => {
        setIsChecklistCompleted(true);
        setIsOpen(false);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isCompleted]);

  return (
    <div
      ref={containerRef}
      className={cx(
        styles[baseClass],
        {
          [styles[`${baseClass}--complete`]]: isChecklistCompleted && !isOpen,
        },
        className
      )}
      style={{
        height:
          !isChecklistCompleted || isOpen
            ? currentContainerHeight
            : COMPLETE_CONTAINER_HEIGHT,
      }}
    >
      {isOpen && (
        <>
          <div className={styles[`${baseClass}__column`]}>
            <div className={styles[`${baseClass}__header`]}>
              {greetingText && (
                <Text
                  size="lg"
                  className={styles[`${baseClass}__header__label`]}
                >
                  {greetingText}
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
                  isActive={item.id === activeItemId}
                  isChecked={completedItemsIds.includes(item.id)}
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
            {!isCompleted && (
              <div className={styles[`${baseClass}__placeholder`]}>
                {items.find((item) => item.id === activeItemId)?.placeholder}
              </div>
            )}
            {isCompleted && (
              <div className={styles[`${baseClass}__placeholder`]}>
                {completionMessageData.placeholder}
              </div>
            )}
          </div>
        </>
      )}
      {!isOpen && (
        <>
          <div className={styles[`${baseClass}__complete`]}>
            <div>
              <Icon
                size="large"
                className={styles[`${baseClass}__complete__icon`]}
                source={CheckCircle}
              />
            </div>
            <div>
              {completionMessageData?.greetingText && (
                <Text
                  size="lg"
                  className={styles[`${baseClass}__complete__label`]}
                >
                  {completionMessageData.greetingText}
                </Text>
              )}
              <Heading
                size="sm"
                className={styles[`${baseClass}__complete__title`]}
              >
                {completionMessageData.title}
              </Heading>
            </div>
          </div>
        </>
      )}
      {isChecklistCompleted && (
        <Button
          kind={isOpen ? 'float' : 'text'}
          icon={
            <Icon
              source={ChevronDown}
              className={cx(
                styles[`${baseClass}__button__icon`],
                isOpen && styles[`${baseClass}__button__icon--open`]
              )}
            />
          }
          className={styles[`${baseClass}__button`]}
          onClick={handleButtonClick}
          aria-expanded={isOpen}
        />
      )}
    </div>
  );
};
