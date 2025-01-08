import { FC, useState, useCallback } from 'react';

import { Check, Calendar, Close } from '@livechat/design-system-icons';
import cx from 'clsx';
import { startOfToday } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Button } from '../../Button';
import { DatePicker, RangeDatePicker } from '../../DatePicker';
import { Icon } from '../../Icon';
import { Popover } from '../../Popover';

import { RangeDatePickerV2Label } from './components/RangeDatePickerV2Label';
import { OPTIONS } from './helpers';
import { IRangeDatePickerV2Props, RANGE_DATE_PICKER_OPTION_ID } from './types';

import styles from './RangeDatePickerV2.module.scss';

const baseClass = 'range-date-picker';

const todayDate = startOfToday();

export const RangeDatePickerV2: FC<IRangeDatePickerV2Props> = ({
  selectedId,
  onRangeSelect,
  ...props
}) => {
  const { initialFromDate, initialToDate, ...restProps } = props;
  const [date, setDate] = useState<DateRange | undefined>({
    from: initialFromDate,
    to: initialToDate,
  });
  const [tempDate, setTempDate] = useState<DateRange | undefined>();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSelectedId, setCurrentSelectedId] = useState<
    RANGE_DATE_PICKER_OPTION_ID | undefined
  >(selectedId);

  const handleRangeSelecting = (range: DateRange | null) => {
    setDate(range ? range : undefined);
    onRangeSelect(range);
    setTempDate(undefined);
    setCurrentSelectedId(undefined);
  };

  const handleClosing = () => {
    setTempDate(undefined);
    setIsVisible(false);
  };

  const handleOnOptionClick = useCallback(
    ({ from, to }: DateRange, id: RANGE_DATE_PICKER_OPTION_ID) => {
      handleRangeSelecting({ from, to });
      handleClosing();

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

    handleRangeSelecting(range);
    handleClosing();
  }, []);

  return (
    <div className={styles[baseClass]}>
      <Popover
        isVisible={isVisible}
        onOpen={() => setIsVisible(true)}
        onClose={handleClosing}
        className={styles[`${baseClass}__popover`]}
        placement="bottom-start"
        triggerRenderer={() => (
          <div
            className={cx(styles[`${baseClass}__trigger`], {
              [styles[`${baseClass}__trigger--active`]]: isVisible,
            })}
          >
            <RangeDatePickerV2Label tempDate={tempDate} date={date} />
            <div
              className={cx(
                styles[`${baseClass}__trigger__right-node`],
                date && styles[`${baseClass}__trigger__right-node--active`]
              )}
            >
              <Icon
                source={Calendar}
                className={styles[`${baseClass}__trigger__right-node__icon`]}
              />
              {date && (
                <Button
                  size="xcompact"
                  kind="plain"
                  icon={<Icon size="xsmall" source={Close} />}
                  className={
                    styles[`${baseClass}__trigger__right-node__button`]
                  }
                  onClick={() => handleRangeSelecting(null)}
                />
              )}
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
                  onMouseEnter={() => setTempDate(option.value)}
                  onMouseLeave={() => setTempDate(undefined)}
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
              customTempFromDate={tempDate?.from || date?.from}
              customTempToDate={tempDate?.to || date?.to}
              onCustomTempDateRangeChange={setTempDate}
              initialToDate={todayDate}
              {...restProps}
            >
              {({ datepicker }) => <DatePicker {...datepicker} />}
            </RangeDatePicker>
          </div>
        </div>
      </Popover>
    </div>
  );
};
