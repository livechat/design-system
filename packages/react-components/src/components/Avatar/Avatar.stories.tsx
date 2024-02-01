import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Avatar, AvatarProps } from './Avatar';

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
    <StoryDescriptor title="XXXSmall">
      <Avatar type="text" text={defaultName} size="xxxsmall" />
    </StoryDescriptor>
    <StoryDescriptor title="XXSmall">
      <Avatar type="text" text={defaultName} size="xxsmall" />
    </StoryDescriptor>
    <StoryDescriptor title="XSmall">
      <Avatar type="text" text={defaultName} size="xsmall" />
    </StoryDescriptor>
    <StoryDescriptor title="Small">
      <Avatar type="text" text={defaultName} size="small" />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Avatar type="text" text={defaultName} size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Avatar type="text" text={defaultName} size="large" />
    </StoryDescriptor>
    <StoryDescriptor title="XLarge">
      <Avatar type="text" text={defaultName} size="xlarge" />
    </StoryDescriptor>
    <StoryDescriptor title="XXLarge">
      <Avatar type="text" text={defaultName} size="xxlarge" />
    </StoryDescriptor>
    <StoryDescriptor title="XXXLarge">
      <Avatar type="text" text={defaultName} size="xxxlarge" />
    </StoryDescriptor>
  </>
);

export const Statuses = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Available">
      <Avatar type="text" text={defaultName} status="available" />
    </StoryDescriptor>
    <StoryDescriptor title="Unavailable">
      <Avatar type="text" text={defaultName} status="unavailable" />
    </StoryDescriptor>
    <StoryDescriptor title="Unknown">
      <Avatar type="text" text={defaultName} status="unknown" />
    </StoryDescriptor>
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

export const SizesWithStatus = (): React.ReactElement => (
  <>
    <StoryDescriptor title="XXXSmall">
      <Avatar
        type="image"
        src={defaultImage}
        size="xxxsmall"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxxsmall"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="XXSmall">
      <Avatar
        type="image"
        src={defaultImage}
        size="xxsmall"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxsmall"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="XSmall">
      <Avatar
        type="image"
        src={defaultImage}
        size="xsmall"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xsmall"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="Small">
      <Avatar type="image" src={defaultImage} size="small" status="available" />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="small"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Avatar
        type="image"
        src={defaultImage}
        size="medium"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="medium"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Avatar type="image" src={defaultImage} size="large" status="available" />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="large"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="XLarge">
      <Avatar
        type="image"
        src={defaultImage}
        size="xlarge"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xlarge"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="XXLarge">
      <Avatar
        type="image"
        src={defaultImage}
        size="xxlarge"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxlarge"
        status="available"
      />
    </StoryDescriptor>
    <StoryDescriptor title="XXXLarge">
      <Avatar
        type="image"
        src={defaultImage}
        size="xxxlarge"
        status="available"
      />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxxlarge"
        status="available"
      />
    </StoryDescriptor>
  </>
);

export const SizesWithRim = (): React.ReactElement => (
  <>
    <StoryDescriptor title="XXXSmall">
      <Avatar type="image" src={defaultImage} size="xxxsmall" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxxsmall"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="XXSmall">
      <Avatar type="image" src={defaultImage} size="xxsmall" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxsmall"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="XSmall">
      <Avatar type="image" src={defaultImage} size="xsmall" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xsmall"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="Small">
      <Avatar type="image" src={defaultImage} size="small" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="small"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Avatar type="image" src={defaultImage} size="medium" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="medium"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Avatar type="image" src={defaultImage} size="large" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="large"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="XLarge">
      <Avatar type="image" src={defaultImage} size="xlarge" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xlarge"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="XXLarge">
      <Avatar type="image" src={defaultImage} size="xxlarge" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxlarge"
        withRim
      />
    </StoryDescriptor>
    <StoryDescriptor title="XXXLarge">
      <Avatar type="image" src={defaultImage} size="xxxlarge" withRim />
      <Avatar
        type="text"
        text={defaultName}
        shape="rounded-square"
        size="xxxlarge"
        withRim
      />
    </StoryDescriptor>
  </>
);
