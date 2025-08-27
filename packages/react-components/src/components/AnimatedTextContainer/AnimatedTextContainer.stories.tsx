import { Meta } from '@storybook/react-vite';

import { AnimatedTextContainer } from './AnimatedTextContainer';

export default {
  title: 'Components/AnimatedTextContainer',
  component: AnimatedTextContainer,
} as Meta<typeof AnimatedTextContainer>;

const TEXT =
  'We have prepared the playground ready for you to test all capabilities of chat section. If you have any question, just trigger me from the upper -right corner of the screen!';

export const Default = () => {
  return (
    <div
      style={{
        width: 360,
      }}
    >
      <AnimatedTextContainer text={TEXT} />
    </div>
  );
};
