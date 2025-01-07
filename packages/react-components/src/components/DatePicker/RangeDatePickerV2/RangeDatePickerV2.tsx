import { FC, useState, useCallback } from 'react';

import { Check, Calendar } from '@livechat/design-system-icons';
import cx from 'clsx';
import { format, startOfToday } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { DatePicker, RangeDatePicker } from '../../DatePicker';
import { Icon } from '../../Icon';
import { Popover } from '../../Popover';
import { Text } from '../../Typography';

import { OPTIONS } from './helpers';
import { IRangeDatePickerV2Props, RANGE_DATE_PICKER_OPTION_ID } from './types';

import styles from './RangeDatePickerV2.module.scss';

const baseClass = 'range-date-picker';

const todayDate = startOfToday();

export const RangeDatePickerV2: FC<IRangeDatePickerV2Props> = ({
  selectedId,
  onRangeSelect,
}) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState<
    RANGE_DATE_PICKER_OPTION_ID | undefined
  >(selectedId);

  const handleOnOptionMouseEnter = useCallback(({ from, to }: DateRange) => {
    setDate({ from, to });
  }, []);

  const handleOnOptionClick = useCallback(
    ({ from, to }: DateRange, id: RANGE_DATE_PICKER_OPTION_ID) => {
      onRangeSelect({ from, to });
      setIsVisible(false);

      if (!selectedId) {
        setCurrentSelectedId(id);
      }
    },
    []
  );

  const handleOnRangeSelect = useCallback((range: DateRange | null) => {
    if (!range) {
      return;
    }

    setDate(range);
    onRangeSelect(range);
    setIsVisible(false);
  }, []);

  const getTriggerLavel = useCallback(() => {
    if (date?.from && date?.to) {
      return `${format(date.from, 'dd-MM-yy')} - ${format(
        date.to,
        'dd-MM-yy'
      )}`;
    }

    return 'DD-MM-YYYY - DD-MM-YYYY';
  }, [date]);

  return (
    <div className={styles[baseClass]}>
      <Popover
        isVisible={isVisible}
        onOpen={() => setIsVisible(true)}
        onClose={() => setIsVisible(false)}
        className={styles[`${baseClass}__popover`]}
        placement="bottom-start"
        triggerRenderer={() => (
          <div
            className={cx(styles[`${baseClass}__trigger`], {
              [styles[`${baseClass}__trigger--active`]]: isVisible,
            })}
          >
            <Text className={styles[`${baseClass}__trigger__label`]}>
              {getTriggerLavel()}
            </Text>
            <div className={styles[`${baseClass}__trigger__right-node`]}>
              <Icon source={Calendar} />
            </div>
          </div>
        )}
      >
        <div className={styles[`${baseClass}__date-picker`]}>
          <ul role="menu" className={styles[`${baseClass}__date-picker__list`]}>
            {OPTIONS.map((option) => (
              <li role="none" key={option.id}>
                <button
                  role="menuitem"
                  className={cx(
                    styles[`${baseClass}__date-picker__list__item`],
                    {
                      [styles[
                        `${baseClass}__date-picker__list__item--selected`
                      ]]: currentSelectedId === option.id,
                    }
                  )}
                  onClick={() => handleOnOptionClick(option.value, option.id)}
                  onMouseEnter={() => handleOnOptionMouseEnter(option.value)}
                  onMouseLeave={() => setDate(undefined)}
                >
                  {option.label}
                  {currentSelectedId === option.id && (
                    <div
                      // data-testid={`${option.id}-selected-icon`}
                      className={
                        styles[`${baseClass}__date-picker__list__item__icon`]
                      }
                    >
                      <Icon source={Check} kind="action-primary" />
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles[`${baseClass}__date-picker__callendar`]}>
            <RangeDatePicker
              onRangeSelect={handleOnRangeSelect}
              customTempFromDate={date?.from}
              customTempToDate={date?.to}
              initialToDate={todayDate}
            >
              {({ datepicker }) => <DatePicker {...datepicker} />}
            </RangeDatePicker>
          </div>
        </div>
      </Popover>
    </div>
  );
};
