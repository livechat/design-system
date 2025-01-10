import { ChevronDown } from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { Popover as PopoverComponent } from './Popover';

import './Popover.stories.css';

const placements = [
  'top',
  'right',
  'bottom',
  'left',
  'top-start',
  'right-start',
  'bottom-start',
  'left-start',
  'top-end',
  'right-end',
  'bottom-end',
  'left-end',
];

export default {
  title: 'Components/Popover',
  component: PopoverComponent,
  argTypes: {
    placement: {
      options: placements,
      control: {
        type: 'select',
        labels: placements,
      },
    },
    flipOptions: {
      control: false,
    },
    isVisible: {
      options: [true, false, undefined],
      control: {
        type: 'select',
        labels: 'Visible',
      },
    },
    triggerRenderer: { control: false },
    useDismissHookProps: { control: false },
    useClickHookProps: { control: false },
  },
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    chromatic: { delay: 300 },
  },
  decorators: [
    (Story: StoryFn) => (
      <div className="popper-story default">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof PopoverComponent>;

const Template: StoryFn<typeof PopoverComponent> = (args) => (
  <PopoverComponent
    {...args}
    triggerRenderer={() => (
      <Button icon={<Icon source={ChevronDown}></Icon>} iconPosition={'right'}>
        Open Popover
      </Button>
    )}
  >
    <div className="content-wrapper">
      <div className="content">
        <Text>Popover content</Text>
      </div>
    </div>
  </PopoverComponent>
);

export const Default = Template.bind({});
export const CustomAnimation = Template.bind({});

Default.args = {
  placement: 'bottom-start',
  isVisible: undefined,
  openedOnInit: true,
};

CustomAnimation.args = {
  placement: 'bottom-start',
  isVisible: undefined,
  openedOnInit: true,
  transitionOptions: {
    duration: 2000,
    initial: {
      opacity: 0,
    },
  },
};
