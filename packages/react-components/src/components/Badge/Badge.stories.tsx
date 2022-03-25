import * as React from 'react';
import { Badge as BadgeComponent, BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: BadgeComponent,
};

export const Badge = (args: BadgeProps): React.ReactElement => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      alignContent: 'center',
    }}
  >
    <BadgeComponent {...args} />
  </div>
);

Badge.args = {
  secondary: false,
  children: '7',
};
