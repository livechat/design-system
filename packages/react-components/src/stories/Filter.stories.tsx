import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Filter as FilterComponent, IFilterProps } from '../components/Filter';

export default {
  title: 'Components/Filter',
  component: FilterComponent,
} as ComponentMeta<typeof FilterComponent>;

export const Filter = ({
  children,
  ...args
}: IFilterProps): React.ReactElement => {
  return (
    <div style={{ display: 'inline-block' }}>
      <FilterComponent {...args}>{children}</FilterComponent>
    </div>
  );
};

Filter.args = {
  placeholder: 'Tag input placeholder',
  error: false,
  size: 'medium',
  children: 'Example tag',
  dismissible: false,
} as IFilterProps;
