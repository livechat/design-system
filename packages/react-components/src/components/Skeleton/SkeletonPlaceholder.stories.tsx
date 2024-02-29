import * as React from 'react';

import {
  ISkeletonPlaceholder,
  SkeletonPlaceholder,
} from './SkeletonPlaceholder';

export default {
  title: 'Components/Skeleton/Placeholder',
  component: SkeletonPlaceholder,
};

export const Text = (args: ISkeletonPlaceholder): React.ReactElement => (
  <SkeletonPlaceholder
    square={args.square}
    size={args.size}
    animated={args.animated}
  />
);
Text.args = {};
