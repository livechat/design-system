import { Meta } from '@storybook/react-vite';

import { Heading, Text } from '../Typography';

import { OverflowTooltipText } from './OverflowTooltipText';
import './OverflowTooltipTextStories.css';
import { OverflowTooltipTextProps } from './types';

export default {
  title: 'Components/OverflowTooltipText',
  component: OverflowTooltipText,
  render: (args: OverflowTooltipTextProps) => (
    <div className="text-container">
      <OverflowTooltipText {...args} />
    </div>
  ),
} as Meta<typeof OverflowTooltipText>;

export const Default = {
  args: {
    text: 'This is a text with a tooltip.',
  },
};

export const ShortText = {
  args: {
    text: 'No tooltip.',
  },
};

export const VeryLongText = {
  args: {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
};

export const WithTextElement = {
  render: (args: OverflowTooltipTextProps) => (
    <div className="text-container">
      <Text>
        <OverflowTooltipText {...args} />
      </Text>
    </div>
  ),
  args: {
    text: 'This is a text with a Text element and a tooltip.',
  },
};

export const WithHeadingElement = {
  render: (args: OverflowTooltipTextProps) => (
    <div className="text-container">
      <Heading>
        <OverflowTooltipText {...args} />
      </Heading>
    </div>
  ),
  args: {
    text: 'This is a text with a Heading element and a tooltip.',
  },
};

export const NoWhiteSpacesText = {
  args: {
    text: 'john.doensky.lorem.ipsum.lorem.ipsum.lorem.dolorem@gmail.com',
  },
};

export const SpecialCharacters = {
  args: {
    text: '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
  },
};
