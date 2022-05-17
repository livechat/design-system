import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  InAppMessage as InAppMessageComponent,
  InAppMessageProps,
} from './InAppMessage';
import { Button } from '../Button';
import { Text, Heading } from '../Typography';

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
          <Heading as="h2" size="lg">
            Product Cards for Shopify
          </Heading>
          <Text>
            Sync LiveChat with your Shopify products and send the Product Cards
            via chat. Save time on searching for links to products and see
            customers buy more at your store.
          </Text>
        </InAppMessageComponent>
      )}
    </div>
  );
};

export const InAppMessage = StoryTemplate.bind({});
InAppMessage.args = {
  image: {
    src: 'https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif',
    alt: 'InAppMessage',
  },
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
