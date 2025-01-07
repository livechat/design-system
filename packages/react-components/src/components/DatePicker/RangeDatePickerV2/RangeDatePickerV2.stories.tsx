import * as React from 'react';

import { Meta } from '@storybook/react';

import { RangeDatePickerV2 } from './RangeDatePickerV2';

export default {
  title: 'Components/DatePicker/RangeDatePickerV2',
  component: RangeDatePickerV2,
} as Meta<typeof RangeDatePickerV2>;

export const Default = (): React.ReactElement => (
  <RangeDatePickerV2 onRangeSelect={() => alert('selected')} />
);
