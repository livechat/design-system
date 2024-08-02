import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { Icon } from '../Icon';

import { OnboardingChecklist } from './OnboardingChecklist';
import { ChecklistItem } from './types';

export default {
  title: 'Components/OnboardingChecklist',
  component: OnboardingChecklist,
};

const getItems = (handler: (id: string) => void): ChecklistItem[] => [
  {
    id: '1',
    title: 'Run a test chat',
    description: 'Make it match your brand and website',
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => handler('1'),
    },
  },
  {
    id: '2',
    title: 'Install LiveChat on your website',
    description: 'Invite your team to help you with chats',
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => handler('2'),
    },
  },
  {
    id: '3',
    title: 'Invite your teammates',
    description: 'Save time by using prepared answers',
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => handler('3'),
    },
  },
  {
    id: '4',
    title: 'Set up a chatbot',
    description: 'Collect feedback from your customers',
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => handler('4'),
    },
  },
  {
    id: '5',
    title: 'Upload profile picture',
    description: 'Automate your customer service',
    primaryButton: {
      label: 'Chat with yourself',
      icon: <Icon source={Icons.OpenInNew} />,
      iconPosition: 'right',
      onClick: () => handler('5'),
    },
  },
];

export const Default = (): React.ReactElement => {
  const [activeItem, setActiveItem] = React.useState('1');
  const [checkedIds, setCheckedIds] = React.useState<string[]>([]);

  const handleCheckItem = (id: string) => {
    return setCheckedIds((prev) => [...prev, id]);
  };

  return (
    <OnboardingChecklist
      title="Here’s your getting started guide"
      titleLabel="Hello, Tim!"
      items={getItems(handleCheckItem)}
      activeId={activeItem}
      checkedId={checkedIds}
      onActiveChange={setActiveItem}
    />
  );
};
