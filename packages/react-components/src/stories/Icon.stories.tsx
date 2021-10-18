import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import Email from '@livechat/design-system-icons/dist/material/Email';

import {
  Icon as IconComponent,
  IconSizeName,
  IconTypeName,
  IIconProps,
} from '../components/Icon';

export default {
  title: 'Components/Icon',
  component: IconComponent,
} as ComponentMeta<typeof IconComponent>;

export const Icon = (args: IIconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <IconComponent {...args} />
  </div>
);

Icon.args = {
  source: Email,
  size: IconSizeName.Medium,
  iconType: IconTypeName.Primary,
};
