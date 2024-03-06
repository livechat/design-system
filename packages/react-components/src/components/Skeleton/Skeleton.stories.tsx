import * as React from 'react';

import { SkeletonAvatar } from './SkeletonAvatar';
import { SkeletonText } from './SkeletonText';
import { ISkeletonWrapper, SkeletonWrapper } from './SkeletonWrapper';

export default {
  title: 'Components/Skeleton',
  component: SkeletonWrapper,
  subcomponents: {
    SkeletonAvatar,
    SkeletonText,
  },
  argTypes: {
    children: {
      control: false,
    },
  },
};

export const Wrapper = (args: ISkeletonWrapper): React.ReactElement => (
  <SkeletonWrapper vertical={args.vertical} animated={args.animated}>
    <SkeletonAvatar size={36} />
    <SkeletonWrapper vertical>
      <SkeletonText />
      <SkeletonText />
    </SkeletonWrapper>
    <SkeletonAvatar square size={36} />
    <SkeletonText />
  </SkeletonWrapper>
);
Wrapper.args = {};
