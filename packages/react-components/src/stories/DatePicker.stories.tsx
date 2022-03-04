import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  DatePicker as DatePickerComponent,
  IProps as IDatePickerProps,
} from '../components/DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePickerComponent,
} as ComponentMeta<typeof DatePickerComponent>;

type IDatePickerArgs = IDatePickerProps;

export const DatePicker = (args: IDatePickerArgs): React.ReactElement => {
  return (
    <div style={{ width: '300px' }}>
      <DatePickerComponent {...args} />
    </div>
  );
};

DatePicker.args = {
  title: 'Title goes here',
  img: 'https://via.placeholder.com/100',
  children: (
    <p style={{ margin: 0 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore
    </p>
  ),
} as IDatePickerArgs;
