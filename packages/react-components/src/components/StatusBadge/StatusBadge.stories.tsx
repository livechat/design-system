import * as React from 'react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import {
  IStatusBadgeProps,
  StatusBadge,
  StatusBadgeSizes,
} from './StatusBadge';

export default {
  title: 'Components/Badge/StatusBadge',
  component: StatusBadge,
};

const SIZES: StatusBadgeSizes[] = [
  '3XS',
  '2XS',
  'XS',
  'SM',
  'MD',
  'LG',
  'XL',
  '2XL',
  '3XL',
];

export const Default = (args: IStatusBadgeProps): React.ReactElement => (
  <StatusBadge {...args} />
);

export const KindsAndSizes = (): React.ReactElement => (
  <>
    {SIZES.map((size) => (
      <StoryDescriptor title={`${size}`}>
        <StatusBadge size={size} kind="accept" />
        <StatusBadge size={size} kind="not-accept" />
        <StatusBadge size={size} kind="offline" />
      </StoryDescriptor>
    ))}
  </>
);
