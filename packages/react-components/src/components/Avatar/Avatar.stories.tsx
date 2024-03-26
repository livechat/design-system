import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Avatar, AvatarProps } from './Avatar';
import { AvatarSizes, AvatarStatuses } from './types';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const Default = (args: AvatarProps): React.ReactElement => (
  <Avatar {...args} />
);

const defaultImage =
  'https://cdn-labs.livechat-files.com/api/file/lc/img/100019504/df59da4b5b0cdb6030efb08787fd255d.jpg';
const defaultName = 'John Doe';

Default.args = {
  type: 'text',
  text: defaultName,
};

export const Types = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Image">
      <Avatar type="image" src={defaultImage} alt="User avatar" />
    </StoryDescriptor>
    <StoryDescriptor title="Text">
      <Avatar type="text" text={'Support Heroes'} />
    </StoryDescriptor>
  </>
);

export const Shapes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Circle">
      <Avatar type="text" text={defaultName} shape="circle" />
    </StoryDescriptor>
    <StoryDescriptor title="Rounded square">
      <Avatar type="text" text={'Support Heroes'} shape="rounded-square" />
    </StoryDescriptor>
  </>
);

export const Sizes = (): React.ReactElement => (
  <>
    {AvatarSizes.map((size) => (
      <StoryDescriptor title={size} key={size}>
        <Avatar type="text" text={defaultName} size={size} />
      </StoryDescriptor>
    ))}
  </>
);

export const Statuses = (): React.ReactElement => (
  <>
    {AvatarStatuses.map((status) => (
      <StoryDescriptor title={status} key={status}>
        <Avatar type="text" text={defaultName} status={status} />
      </StoryDescriptor>
    ))}
  </>
);

export const Colors = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Light">
      <Avatar type="text" text={defaultName} color="#faf8ff" />
      <Avatar type="text" text={defaultName} color="#eba3a3" />
      <Avatar type="text" text={defaultName} color="var(--surface-avatar-3)" />
    </StoryDescriptor>
    <StoryDescriptor title="Dark">
      <Avatar type="text" text={defaultName} color="#424d57" />
      <Avatar type="text" text={defaultName} color="#6b5aba" />
      <Avatar type="text" text={defaultName} color="var(--surface-avatar-1)" />
    </StoryDescriptor>
    <StoryDescriptor title="Default based on initials">
      <Avatar type="text" text={'Albert'} />
      <Avatar type="text" text={'Barbara'} />
      <Avatar type="text" text={'Carl'} />
      <Avatar type="text" text={'Diana'} />
      <Avatar type="text" text={'Edward'} />
      <Avatar type="text" text={'Francesca'} />
      <Avatar type="text" text={'George'} />
      <Avatar type="text" text={'Hannah'} />
      <Avatar type="text" text={'Ivan'} />
      <Avatar type="text" text={'Jessica'} />
    </StoryDescriptor>
  </>
);

export const FallbackAvatar = (): React.ReactElement => (
  <Avatar type="image" src="https://example.com/not-a-proper-image.png" />
);

export const Rim = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Rim">
      <Avatar withRim type="image" src={defaultImage} />
    </StoryDescriptor>{' '}
    <StoryDescriptor title="Rim with status">
      <Avatar withRim status="available" type="image" src={defaultImage} />
    </StoryDescriptor>
  </>
);

export const SizesWithStatus = (): React.ReactElement => {
  return (
    <>
      {AvatarSizes.map((size) => (
        <StoryDescriptor title={size} key={size}>
          <Avatar
            type="image"
            src={defaultImage}
            size={size}
            status="available"
          />
          <Avatar
            type="text"
            text={defaultName}
            shape="rounded-square"
            size={size}
            status="available"
          />
        </StoryDescriptor>
      ))}
    </>
  );
};

export const SizesWithRim = (): React.ReactElement => {
  return (
    <>
      {AvatarSizes.map((size) => (
        <StoryDescriptor title={size} key={size} gap="12px">
          <Avatar type="image" src={defaultImage} size={size} withRim />
          <Avatar
            type="text"
            text={defaultName}
            shape="rounded-square"
            size={size}
            withRim
          />
        </StoryDescriptor>
      ))}
    </>
  );
};
