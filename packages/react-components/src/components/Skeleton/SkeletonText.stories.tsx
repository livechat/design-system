import * as React from 'react';

import { ISkeletonText, SkeletonText } from './SkeletonText';

export default {
  title: 'Components/Skeleton/Text',
  component: SkeletonText,
};

export const Text = (args: ISkeletonText): React.ReactElement => (
  <SkeletonText
    width={args.width}
    height={args.height}
    animated={args.animated}
  />
);
Text.args = {};
