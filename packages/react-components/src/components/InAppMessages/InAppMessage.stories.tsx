import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  InAppMessage as InAppMessageComponent,
  InAppMessageProps,
} from './InAppMessage';
import { Button } from '../Button';

export default {
  title: 'components/InAppMessage',
  component: InAppMessageComponent,
  parameters: {
    componentSubtitle: `
    Use InAppMessages to update users of new functionality or inform about system-level change. 
    It aims to focus all of the user’s attention on a significant and/or impactful changes. Keep 
    in mind the entire flow when using benefits modals. Always offer a dismiss option at each 
    point in the journey.
    `,
  },
} as ComponentMeta<typeof InAppMessageComponent>;

const StoryTemplate: Story<InAppMessageProps> = (args: InAppMessageProps) => {
  const [isInAppVisible, setIsInAppVisible] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsInAppVisible(true)}>Show InApp</Button>
      {isInAppVisible && (
        <InAppMessageComponent
          {...args}
          onClose={() => setIsInAppVisible(false)}
        >
          <div style={{ textAlign: 'center' }}>Example in app message</div>
        </InAppMessageComponent>
      )}
    </div>
  );
};

export const InAppMessage = StoryTemplate.bind({});
InAppMessage.args = {
  header: {
    avatar: {
      src: 'https://avatars2.githubusercontent.com/u/29309941?s=88&v=4',
      alt: 'Agent',
    },
    text: (
      <React.Fragment>
        <strong>Michał</strong> from LiveChat
      </React.Fragment>
    ),
  },
  footerButtons: {
    cta: {
      children: 'Check it out!',
      onClick: () => console.log('test'),
    },
    remind: {
      children: 'Remind me later!',
      onClick: () => console.log('test'),
    },
  },
};
