import * as React from 'react';

import { ISkeletonAvatar, SkeletonAvatar } from './SkeletonAvatar';

export default {
  title: 'Components/Skeleton/Avatar',
  component: SkeletonAvatar,
};

export const Avatar = (args: ISkeletonAvatar): React.ReactElement => (
  <SkeletonAvatar
    square={args.square}
    size={args.size}
    animated={args.animated}
  />
);
Avatar.args = {};
