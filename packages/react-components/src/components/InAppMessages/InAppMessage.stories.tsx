import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  InAppMessage as InAppMessageComponent,
  InAppMessageProps,
} from './InAppMessage';
import { Button } from '../Button';
import { Text, Heading } from '../Typography';
import { InAppMessageHeader } from './InAppMessageHeader';
import { InAppMessageFooter } from './InAppMessageFooter';
import { InAppMessageImage } from './InAppMessageImage';

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

export const DefaultInApp = (args: InAppMessageProps): React.ReactElement => {
  const [isInAppVisible, setIsInAppVisible] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsInAppVisible(true)}>Open InApp</Button>
      {isInAppVisible && (
        <InAppMessageComponent
          {...args}
          onClose={() => setIsInAppVisible(false)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
    </div>
  );
};
DefaultInApp.args = {};

export const InAppWithHeader = (): React.ReactElement => {
  const [isInAppVisible, setIsInAppVisible] = React.useState<
    'avatar' | 'text' | 'all' | null
  >(null);

  return (
    <div>
      <div className="spacer">
        <Button onClick={() => setIsInAppVisible('avatar')}>
          InApp with avatar
        </Button>
        <Button onClick={() => setIsInAppVisible('text')}>
          InApp with text
        </Button>
        <Button onClick={() => setIsInAppVisible('all')}>InApp with all</Button>
      </div>
      {isInAppVisible === 'avatar' && (
        <InAppMessageComponent
          header={
            <InAppMessageHeader
              avatar={{
                src: 'https://avatars2.githubusercontent.com/u/29309941?s=88&v=4',
                alt: 'Agent',
              }}
              onCloseButtonClick={() => setIsInAppVisible(null)}
            />
          }
          onClose={() => setIsInAppVisible(null)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
      {isInAppVisible === 'text' && (
        <InAppMessageComponent
          header={
            <InAppMessageHeader
              text={
                <React.Fragment>
                  <strong>Michał</strong> from LiveChat
                </React.Fragment>
              }
              onCloseButtonClick={() => setIsInAppVisible(null)}
            />
          }
          onClose={() => setIsInAppVisible(null)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
      {isInAppVisible === 'all' && (
        <InAppMessageComponent
          header={
            <InAppMessageHeader
              avatar={{
                src: 'https://avatars2.githubusercontent.com/u/29309941?s=88&v=4',
                alt: 'Agent',
              }}
              text={
                <React.Fragment>
                  <strong>Michał</strong> from LiveChat
                </React.Fragment>
              }
              onCloseButtonClick={() => setIsInAppVisible(null)}
            />
          }
          onClose={() => setIsInAppVisible(null)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
    </div>
  );
};

export const InAppWithButtons = (): React.ReactElement => {
  const [isInAppVisible, setIsInAppVisible] = React.useState<
    'single' | 'all' | null
  >(null);

  return (
    <div>
      <div className="spacer">
        <Button onClick={() => setIsInAppVisible('single')}>
          InApp with single button
        </Button>
        <Button onClick={() => setIsInAppVisible('all')}>
          InApp with all buttons
        </Button>
      </div>
      {isInAppVisible === 'single' && (
        <InAppMessageComponent
          footer={
            <InAppMessageFooter
              primary={{
                children: 'Check it out!',
                onClick: () => setIsInAppVisible(null),
              }}
            />
          }
          onClose={() => setIsInAppVisible(null)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
      {isInAppVisible === 'all' && (
        <InAppMessageComponent
          footer={
            <InAppMessageFooter
              primary={{
                children: 'Check it out!',
                onClick: () => setIsInAppVisible(null),
              }}
              secondary={{
                children: 'Remind me later!',
                onClick: () => setIsInAppVisible(null),
              }}
            />
          }
          onClose={() => setIsInAppVisible(null)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
    </div>
  );
};

export const InAppWithImage = (): React.ReactElement => {
  const [isInAppVisible, setIsInAppVisible] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsInAppVisible(true)}>Open InApp</Button>
      {isInAppVisible && (
        <InAppMessageComponent
          image={
            <InAppMessageImage
              src="https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif"
              alt="InAppMessage"
            />
          }
          onClose={() => setIsInAppVisible(false)}
        >
          <Text>Example content</Text>
        </InAppMessageComponent>
      )}
    </div>
  );
};

export const InAppWithEverything = (): React.ReactElement => {
  const [isInAppVisible, setIsInAppVisible] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsInAppVisible(true)}>Open InApp</Button>
      {isInAppVisible && (
        <InAppMessageComponent
          header={
            <InAppMessageHeader
              avatar={{
                src: 'https://avatars2.githubusercontent.com/u/29309941?s=88&v=4',
                alt: 'Agent',
              }}
              text={
                <React.Fragment>
                  <strong>Michał</strong> from LiveChat
                </React.Fragment>
              }
              onCloseButtonClick={() => setIsInAppVisible(null)}
            />
          }
          image={
            <InAppMessageImage
              src="https://cdn.livechat-static.com/api/file/v2/lc/att-old/8656216/fe28d6850106f65c9207f3dcea091099/product-cards-shopify-preview.gif"
              alt="InAppMessage"
            />
          }
          footer={
            <InAppMessageFooter
              primary={{
                children: 'Check it out!',
                onClick: () => setIsInAppVisible(false),
              }}
              secondary={{
                children: 'Remind me later!',
                onClick: () => setIsInAppVisible(false),
              }}
            />
          }
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
