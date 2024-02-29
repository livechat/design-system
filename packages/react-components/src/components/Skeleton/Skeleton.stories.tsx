import * as React from 'react';

import { SkeletonPlaceholder } from './SkeletonPlaceholder';
import { SkeletonText } from './SkeletonText';
import { ISkeletonWrapper, SkeletonWrapper } from './SkeletonWrapper';

export default {
  title: 'Components/Skeleton',
  component: SkeletonWrapper,
  subcomponents: {
    SkeletonPlaceholder,
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
    <SkeletonPlaceholder size={36} />
    <SkeletonWrapper vertical>
      <SkeletonText />
      <SkeletonText />
    </SkeletonWrapper>
    <SkeletonPlaceholder square size={36} />
    <SkeletonText />
  </SkeletonWrapper>
);
Wrapper.args = {};
