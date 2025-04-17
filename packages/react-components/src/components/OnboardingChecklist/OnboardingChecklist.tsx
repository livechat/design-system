import * as React from 'react';

import { CheckCircle, ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useAnimations, useHeightResizer } from '../../hooks';
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

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const completeContentRef = React.useRef<HTMLDivElement>(null);
  const { size, handleResizeRef } = useHeightResizer();

  const { isOpen: isContentVisible, isMounted } = useAnimations({
    isVisible: isOpen,
    elementRef: contentRef,
  });

  const { isOpen: isCompleteVisible, isMounted: isCompleteMounted } =
    useAnimations({
      isVisible: !isOpen,
      elementRef: completeContentRef,
    });

  const COMPLETE_CONTAINER_HEIGHT = completionMessageData.height || 96;

  React.useEffect(() => {
    if (isCompleted) {
      const delay = completionMessageData.delay || 1500;

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
    >
      <div
        className={styles[`${baseClass}__content-container`]}
        style={{
          maxHeight: isContentVisible ? size : 0,
          overflow: 'hidden',
          transition: 'max-height var(--transition-duration-moderate-1)',
        }}
        ref={contentRef}
      >
        <div ref={handleResizeRef}>
          {isMounted && (
            <div
              className={styles[`${baseClass}__content-wrapper`]}
              style={{
                opacity: isContentVisible ? 1 : 0,
                transition: 'opacity var(--transition-duration-moderate-1)',
              }}
            >
              <div className={styles[`${baseClass}__column`]}>
                <div className={styles[`${baseClass}__header`]}>
                  {greetingText && (
                    <Text
                      size="lg"
                      semiBold
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
                      customContent={item.customContent}
                      title={item.title}
                      titleHint={item.titleHint}
                      isActive={item.id === activeItemId}
                      isChecked={completedItemsIds.includes(item.id)}
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
                  {
                    [styles[`${baseClass}__column--right--completed`]]:
                      isCompleted,
                  },
                  placeholderClassName
                )}
              >
                {!isCompleted && (
                  <div className={styles[`${baseClass}__placeholder`]}>
                    {
                      items.find((item) => item.id === activeItemId)
                        ?.placeholder
                    }
                  </div>
                )}
                {isCompleted && (
                  <div className={styles[`${baseClass}__placeholder`]}>
                    {completionMessageData.placeholder}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={styles[`${baseClass}__complete-container`]}
        style={{
          maxHeight: isCompleteVisible ? COMPLETE_CONTAINER_HEIGHT : 0,
          overflow: 'hidden',
          transition: 'max-height var(--transition-duration-moderate-1)',
          position: 'relative',
        }}
        ref={completeContentRef}
      >
        {isCompleteMounted && (
          <div
            className={styles[`${baseClass}__complete`]}
            style={{
              opacity: isCompleteVisible ? 1 : 0,
              transition: 'opacity var(--transition-duration-moderate-1)',
            }}
          >
            <div>
              <Icon
                size="large"
                className={styles[`${baseClass}__complete__icon`]}
                source={CheckCircle}
              />
            </div>
            <div
              className={cx({
                [styles[`${baseClass}__complete__content--no-greeting`]]:
                  !completionMessageData?.greetingText,
              })}
            >
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
        )}
      </div>

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
          className={cx(styles[`${baseClass}__button`], {
            [styles[`${baseClass}__button--open`]]: isOpen,
            [styles[`${baseClass}__button--closed`]]: !isOpen,
          })}
          onClick={handleButtonClick}
          aria-expanded={isOpen}
        />
      )}
    </div>
  );
};
