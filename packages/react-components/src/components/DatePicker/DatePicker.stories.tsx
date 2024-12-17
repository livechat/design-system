import * as React from 'react';

import { Meta } from '@storybook/react';

import { DatePicker } from './DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
} as Meta<typeof DatePicker>;

export const Default = (): React.ReactElement => <DatePicker />;

export const WithCustomCurrentDate = () => (
  <DatePicker today={new Date('01/20/2024')} />
);

export const WithDatesBetweenTwoMonths = () => (
  <DatePicker
    startMonth={new Date('11/20/2023')}
    endMonth={new Date('03/20/2024')}
  />
);

export const WithCustomFirstDayOfWeek = () => <DatePicker weekStartsOn={0} />;
