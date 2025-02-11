import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';
import noop from '../../utils/noop';
import { Button } from '../Button';

import './Tooltip.stories.css';
import { Info, Interactive, Reports, Simple } from './components';
import exampleVideo from './onboarding_final.mp4';
import beautifulImage from './placeholder.png';
import { Tooltip } from './Tooltip';
import { ITooltipProps } from './types';

const kinds: Array<ITooltipProps['kind']> = [undefined, 'invert', 'important'];

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    triggerRenderer: {
      control: false,
    },
    useDismissHookProps: {
      control: false,
    },
    theme: {
      options: ['invert', 'important', undefined],
      control: {
        type: 'select',
        labels: 'Theme',
      },
    },
    kind: {
      options: ['invert', 'important', undefined],
      control: {
        type: 'select',
        labels: 'Kind',
      },
    },
    isVisible: {
      options: [true, false, undefined],
      control: {
        type: 'select',
        labels: 'Visible',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    chromatic: { delay: 300 },
  },
  subcomponents: {
    Info,
    Interactive,
    Reports,
    Simple,
  },
} as Meta<typeof Tooltip>;

export const Default = (args: ITooltipProps): React.ReactElement => (
  <Tooltip {...args} triggerRenderer={<Button>Trigger</Button>}>
    Simple text content
  </Tooltip>
);
Default.args = {
  isVisible: true,
};
Default.decorators = [
  (Story: StoryFn) => (
    <div className="tooltip-story default">
      <Story />
    </div>
  ),
];

export const Kinds = (): React.ReactElement => (
  <>
    {kinds.map((kind) => {
      const title = kind
        ? kind.charAt(0).toUpperCase() + kind.slice(1)
        : 'Default';

      return (
        <StoryDescriptor title={title}>
          <Tooltip
            placement="right"
            isVisible
            kind={kind}
            triggerRenderer={<Button>Trigger</Button>}
          >
            Simple text content
          </Tooltip>
        </StoryDescriptor>
      );
    })}
  </>
);

export const TooltipInfo = (args: ITooltipProps): React.ReactElement => (
  <Tooltip {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Info
      theme={args.kind || args.theme}
      header="Header - concise and clear"
      text="Tooltip content is used to explain the details of elements or features."
      handleCloseAction={noop}
    />
  </Tooltip>
);
TooltipInfo.args = {
  isVisible: true,
};
TooltipInfo.decorators = [
  (Story: StoryFn) => (
    <div className="tooltip-story info">
      <Story />
    </div>
  ),
];

export const TooltipInteractiveWithImage = (
  args: ITooltipProps
): React.ReactElement => (
  <Tooltip {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Interactive
      theme={args.kind || args.theme}
      header="Header - concise and clear"
      image={{
        src: beautifulImage,
        alt: 'image',
      }}
      text="Tooltip content is used to explain the details of elements or features."
      handleCloseAction={noop}
      primaryButton={{
        handleClick: noop,
        label: 'Primary Button',
      }}
      secondaryButton={{
        handleClick: noop,
        label: 'Secondary',
      }}
    />
  </Tooltip>
);
TooltipInteractiveWithImage.args = {
  isVisible: true,
};
TooltipInteractiveWithImage.decorators = [
  (Story: StoryFn) => (
    <div className="tooltip-story interactive">
      <Story />
    </div>
  ),
];

export const TooltipInteractiveWithVideo = (
  args: ITooltipProps
): React.ReactElement => (
  <Tooltip {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Interactive
      theme={args.kind || args.theme}
      header="Header - concise and clear"
      video={exampleVideo}
      text="Tooltip content is used to explain the details of elements or features."
      handleCloseAction={noop}
      primaryButton={{
        handleClick: noop,
        label: 'Primary Button',
      }}
    />
  </Tooltip>
);
TooltipInteractiveWithVideo.args = {
  isVisible: true,
};
TooltipInteractiveWithVideo.decorators = [
  (Story: StoryFn) => (
    <div className="tooltip-story interactive">
      <Story />
    </div>
  ),
];

export const TooltipReports = (args: ITooltipProps): React.ReactElement => (
  <div style={{ height: customHeightForChromatic('1500px') }}>
    <Tooltip {...args} triggerRenderer={<Button>Trigger</Button>}>
      <Reports title="Date or Series" description="Additional information">
        <div className="tooltip-preview-reports">Reports component content</div>
      </Reports>
      <Reports title="Date or Series" description="Additional information">
        <div className="tooltip-preview-reports">Reports component content</div>
      </Reports>
      <Reports title="Date or Series" description="Additional information">
        <div className="tooltip-preview-reports">Reports component content</div>
      </Reports>
    </Tooltip>
  </div>
);
TooltipReports.args = {
  isVisible: true,
  fullSpaceContent: true,
};
TooltipReports.decorators = [
  (Story: StoryFn) => (
    <div className="tooltip-story reports">
      <Story />
    </div>
  ),
];
