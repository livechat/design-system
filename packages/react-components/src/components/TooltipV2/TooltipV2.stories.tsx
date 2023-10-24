import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import noop from '../../utils/noop';
import { Button } from '../Button';
import { Info, Interactive, Reports } from '../Tooltip/components';
import beautifulImage from '../Tooltip/placeholder.png';

import './Tooltip.stories.css';
import { ITooltipV2Props, TooltipV2 } from './TooltipV2';

export default {
  title: 'Components/TooltipV2',
  component: TooltipV2,
  argTypes: {
    triggerRenderer: {
      control: false,
    },
    kind: {
      options: ['invert', 'important', undefined],
      control: {
        type: 'select',
        labels: 'Kind',
      },
    },
    visible: {
      options: [true, false, undefined],
      control: {
        type: 'select',
        labels: 'Visible',
      },
    },
  },
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
} as ComponentMeta<typeof TooltipV2>;

export const Default = (args: ITooltipV2Props): React.ReactElement => (
  <TooltipV2 {...args} triggerRenderer={<Button>Trigger</Button>}>
    Simple text content
  </TooltipV2>
);
Default.args = {
  visible: true,
};

export const TooltipInfo = (args: ITooltipV2Props): React.ReactElement => (
  <TooltipV2 {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Info
      header="Header - concise and clear"
      text="Tooltip content is used to explain the details of elements or features."
      closeWithX
    />
  </TooltipV2>
);
TooltipInfo.args = {
  visible: true,
};

export const TooltipInteractive = (
  args: ITooltipV2Props
): React.ReactElement => (
  <TooltipV2 {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Interactive
      header="Header - concise and clear"
      image={{
        src: beautifulImage,
        alt: 'image',
      }}
      text="Tooltip content is used to explain the details of elements or features."
      closeWithX
      primaryButton={{
        handleClick: noop,
        label: 'Primary Button',
      }}
      secondaryButton={{
        handleClick: noop,
        label: 'Secondary',
      }}
    />
  </TooltipV2>
);
TooltipInteractive.args = {
  visible: true,
};

export const TooltipReports = (args: ITooltipV2Props): React.ReactElement => (
  <TooltipV2 {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Reports title="Date or Series" description="Additional information">
      <div className="tooltip-preview-reports">Reports component content</div>
    </Reports>
    <Reports title="Date or Series" description="Additional information">
      <div className="tooltip-preview-reports">Reports component content</div>
    </Reports>
    <Reports title="Date or Series" description="Additional information">
      <div className="tooltip-preview-reports">Reports component content</div>
    </Reports>
  </TooltipV2>
);
TooltipReports.args = {
  visible: true,
  fullSpaceContent: true,
};
