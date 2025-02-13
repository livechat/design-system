import { forwardRef, useState, useEffect, ChangeEvent } from 'react';

import { Time } from '@livechat/design-system-icons';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Popover } from '../Popover';

import * as styles from './styles';
import { ITimePickerProps } from './types';

const hours = [...Array(24).keys()];
const minutes = [...Array(60).keys()];

export const TimePicker = forwardRef<HTMLInputElement, ITimePickerProps>(
  ({ id, name, min, max, required, ...inputProps }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
    const { onFocus, onBlur, onChange, disabled } = inputProps;

    useEffect(() => {
      if (selectedHour !== null && selectedMinute !== null) {
        const time = `${selectedHour
          .toString()
          .padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
        onChange?.({
          target: { value: time },
        } as ChangeEvent<HTMLInputElement>);
        setIsVisible(false);
        setSelectedHour(null);
        setSelectedMinute(null);
      }
    }, [selectedHour, selectedMinute]);

    return (
      <Popover
        isVisible={isVisible}
        placement="bottom-start"
        onClose={() => setIsVisible(false)}
        className={styles.popover}
        triggerClassName={styles.popoverTrigger}
        triggerRenderer={
          <div className={styles.inputBaseStyles(isFocused, disabled)}>
            <input
              {...inputProps}
              ref={ref}
              disabled={disabled}
              className={styles.inputElement}
              type="time"
              id={id}
              name={name}
              min={min}
              max={max}
              required={required}
              onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
            />
            <Button
              className={styles.button}
              kind="plain"
              size="xcompact"
              icon={<Icon source={Time} />}
              onClick={() => setIsVisible((v) => !v)}
            />
          </div>
        }
      >
        <div className={styles.timePicker}>
          <ul className={styles.list}>
            {hours.map((hour: number, id) => (
              <li key={id} className={styles.listItem}>
                <Button
                  kind="plain"
                  size="xcompact"
                  className={styles.listItemButton(hour === selectedHour)}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour.toString().padStart(2, '0')}
                </Button>
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {minutes.map((minute: number, id) => (
              <li key={id} className={styles.listItem}>
                <Button
                  kind="plain"
                  size="xcompact"
                  className={styles.listItemButton(minute === selectedMinute)}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute.toString().padStart(2, '0')}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Popover>
    );
  }
);
