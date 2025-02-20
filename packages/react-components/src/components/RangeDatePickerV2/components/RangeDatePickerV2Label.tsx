import { FC } from 'react';

import cx from 'clsx';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Text } from '../../Typography';

import styles from './RangeDatePickerV2Label.module.scss';

const baseClass = 'range-date-picker-v2-label';

interface IRangeDatePickerV2LabelProps {
  tempDate?: DateRange;
  date?: DateRange;
  selectedOptionName?: string;
}

export const RangeDatePickerV2Label: FC<IRangeDatePickerV2LabelProps> = ({
  tempDate,
  date,
  selectedOptionName,
}) => {
  const getStartDate = () => {
    if (tempDate?.from) {
      return `${format(tempDate.from, 'dd-MM-yy')}`;
    }

    if (date?.from) {
      return `${format(date.from, 'dd-MM-yy')}`;
    }

    return 'Start date';
  };

  const getEndDate = () => {
    if (tempDate?.to) {
      return `${format(tempDate.to, 'dd-MM-yy')}`;
    }

    if (date?.to) {
      return `${format(date.to, 'dd-MM-yy')}`;
    }

    return 'End date';
  };

  return (
    <Text
      className={cx(styles[`${baseClass}`], {
        [styles[`${baseClass}--selected`]]: date?.from && date?.to,
      })}
    >
      {getStartDate()} - {getEndDate()}{' '}
      {selectedOptionName && `(${selectedOptionName})`}
    </Text>
  );
};
