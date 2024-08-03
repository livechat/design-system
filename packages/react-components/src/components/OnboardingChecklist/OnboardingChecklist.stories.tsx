import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

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
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => primaryHandler('1'),
    },
    secondaryButton: {
      label: 'Skip',
      onClick: () => secondaryHandler('2'),
    },
  },
  {
    id: '2',
    title: 'Install LiveChat on your website',
    description: 'Invite your team to help you with chats',
    placeholder: <Icon size="xxxlarge" source={Icons.HelpDeskColored} />,
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => primaryHandler('2'),
    },
  },
  {
    id: '3',
    title: 'Invite your teammates',
    description: 'Save time by using prepared answers',
    placeholder: <Icon size="xxxlarge" source={Icons.ChatBotColored} />,
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => primaryHandler('3'),
    },
  },
  {
    id: '4',
    title: 'Set up a chatbot',
    description: 'Collect feedback from your customers',
    placeholder: <Icon size="xxxlarge" source={Icons.KnowledgeBaseColored} />,
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => primaryHandler('4'),
    },
  },
  {
    id: '5',
    title: 'Upload profile picture',
    description: 'Automate your customer service',
    placeholder: <Icon size="xxxlarge" source={Icons.OneColored} />,
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => primaryHandler('5'),
    },
  },
];

export const Default = (): React.ReactElement => {
  const [activeItem, setActiveItem] = React.useState<string>('1');
  const [checkedIds, setCheckedIds] = React.useState<string[]>([]);

  const handlePrimaryClick = (id: string) => {
    setCheckedIds((prev) => [...prev, id]);
    setActiveItem((prev) => (parseInt(prev) + 1).toString());
  };

  const handleSecondaryClick = (id: string) => setActiveItem(id);

  return (
    <OnboardingChecklist
      title="Here’s your getting started guide"
      titleLabel="Hello, Tim!"
      items={getItems(handlePrimaryClick, handleSecondaryClick)}
      activeId={activeItem}
      checkedId={checkedIds}
      onActiveChange={handleSecondaryClick}
    />
  );
};
