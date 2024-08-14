import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { Button } from '../Button';
import { Icon } from '../Icon';

import { OnboardingChecklist } from './OnboardingChecklist';
import { IChecklistItemProps } from './types';

export default {
  title: 'Components/OnboardingChecklist',
  component: OnboardingChecklist,
};

const getItems = (
  primaryHandler: (id: string) => void,
  secondaryHandler: (id: string) => void
): IChecklistItemProps[] => [
  {
    id: '1',
    title: 'Run a test chat',
    description: 'Make it match your brand and website',
    placeholder: <Icon size="xxxlarge" source={Icons.LiveChatColored} />,
    cta: (
      <>
        <Button
          kind="high-contrast"
          icon={<Icon source={Icons.OpenInNew} />}
          iconPosition="right"
          onClick={() => primaryHandler('1')}
        >
          Chat with yourself
        </Button>
        <Button kind="plain" onClick={() => secondaryHandler('2')}>
          Skip
        </Button>
      </>
    ),
  },
  {
    id: '2',
    title: 'Install LiveChat on your website',
    description: 'Invite your team to help you with chats',
    placeholder: <Icon size="xxxlarge" source={Icons.HelpDeskColored} />,
    cta: (
      <>
        <Button
          kind="high-contrast"
          icon={<Icon source={Icons.OpenInNew} />}
          iconPosition="right"
          onClick={() => primaryHandler('2')}
        >
          Chat with yourself
        </Button>
      </>
    ),
  },
  {
    id: '3',
    title: 'Invite your teammates',
    titleHint: 'recommended: 5',
    description: 'Save time by using prepared answers',
    placeholder: <Icon size="xxxlarge" source={Icons.ChatBotColored} />,
    cta: (
      <>
        <Button
          kind="high-contrast"
          icon={<Icon source={Icons.OpenInNew} />}
          iconPosition="right"
          onClick={() => primaryHandler('3')}
        >
          Chat with yourself
        </Button>
      </>
    ),
  },
  {
    id: '4',
    title: 'Set up a chatbot',
    description: 'Collect feedback from your customers',
    placeholder: <Icon size="xxxlarge" source={Icons.KnowledgeBaseColored} />,
    cta: (
      <>
        <Button
          kind="high-contrast"
          icon={<Icon source={Icons.OpenInNew} />}
          iconPosition="right"
          onClick={() => primaryHandler('4')}
        >
          Chat with yourself
        </Button>
      </>
    ),
  },
  {
    id: '5',
    title: 'Upload profile picture',
    description: 'Automate your customer service',
    placeholder: <Icon size="xxxlarge" source={Icons.OneColored} />,
    cta: (
      <>
        <Button
          kind="high-contrast"
          icon={<Icon source={Icons.OpenInNew} />}
          iconPosition="right"
          onClick={() => primaryHandler('5')}
        >
          Chat with yourself
        </Button>
      </>
    ),
  },
];

export const Default = (): React.ReactElement => {
  const [activeItem, setActiveItem] = React.useState<string>('1');
  const [checkedIds, setCheckedIds] = React.useState<string[]>([]);
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);

  const handlePrimaryClick = (id: string) => {
    setCheckedIds((prev) => [...prev, id]);
    setActiveItem((prev) => (parseInt(prev) + 1).toString());

    if (checkedIds.length === 4) {
      setIsCompleted(true);
    }
  };

  const handleSecondaryClick = (id: string) => setActiveItem(id);

  return (
    <OnboardingChecklist
      title="Here’s your getting started guide"
      greetingText="Hello, Tim!"
      items={getItems(handlePrimaryClick, handleSecondaryClick)}
      activeItemId={activeItem}
      completedItemsIds={checkedIds}
      onActiveChange={handleSecondaryClick}
      isCompleted={isCompleted}
      completionMessageData={{
        title: 'Your getting started guide is completed. ',
        greetingText: 'Hey Tim, nice work!',
        placeholder: <Icon size="xxxlarge" source={Icons.HelloColored} />,
      }}
    />
  );
};
