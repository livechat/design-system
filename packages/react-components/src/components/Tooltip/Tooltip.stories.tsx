import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';
import noop from '../../utils/noop';
import { Button } from '../Button';

import './Tooltip.stories.css';
import { Info, Interactive, Reports, Simple, UserGuide } from './components';
import { UserGuideStep } from './components/UserGuide/UserGuideStep';
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
    layout: 'top',
    controls: { expanded: true },
    chromatic: { delay: 300 },
  },
  subcomponents: {
    Info,
    Interactive,
    Reports,
    Simple,
    UserGuide,
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
      closeWithX
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

export const TooltipInteractive = (args: ITooltipProps): React.ReactElement => (
  <Tooltip {...args} triggerRenderer={<Button>Trigger</Button>}>
    <Interactive
      theme={args.kind || args.theme}
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
  </Tooltip>
);
TooltipInteractive.args = {
  isVisible: true,
};
TooltipInteractive.decorators = [
  (Story: StoryFn) => (
    <div className="tooltip-story interactive">
      <Story />
    </div>
  ),
];

export const TooltipReports = (args: ITooltipProps): React.ReactElement => (
  <span style={{ height: customHeightForChromatic('1500px') }}>
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
  </span>
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

export const TooltipUserGuide = (args: ITooltipProps): React.ReactElement => (
  <div className="tooltip-preview-container">
    <TooltipUserGuideExample {...args}></TooltipUserGuideExample>
  </div>
);

TooltipUserGuide.args = {
  placement: 'bottom',
  isVisible: true,
  theme: 'default',
  triggerOnClick: false,
  arrowOffsetY: 0,
  arrowOffsetX: 0,
  offsetMainAxis: 8,
  withFadeAnimation: true,
  transitionDuration: 200,
  transitionDelay: 0,
  hoverOutDelayTimeout: 100,
};

const TooltipUserGuideExample: React.FC<ITooltipProps> = (props) => {
  const reducer = (
    state: { isVisible: boolean; reference: string },
    action: { type: string }
  ) => {
    if (action.type === 'reference1') {
      return {
        ...state,
        reference: 'reference1',
      };
    }
    if (action.type === 'reference2') {
      return {
        ...state,
        reference: 'reference2',
      };
    }
    if (action.type === 'reference3') {
      return {
        ...state,
        reference: 'reference3',
      };
    }
    if (action.type === 'isVisible') {
      return {
        reference: 'reference1',
        isVisible: !state.isVisible,
      };
    }

    return state;
  };

  const [state, dispatch] = React.useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
  });

  return (
    <div>
      <Button onClick={() => dispatch({ type: 'isVisible' })}>
        {state.isVisible ? 'Hide' : 'Show'}
      </Button>
      <div
        style={{
          width: '500px',
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          onClick={() => dispatch({ type: 'reference1' })}
          id="reference1"
          style={{
            display: 'block',
            backgroundColor: 'red',
            height: '50px',
            width: '100px',
          }}
        ></div>
        <div
          onClick={() => dispatch({ type: 'reference2' })}
          id="reference2"
          style={{
            display: 'block',
            backgroundColor: 'red',
            height: '50px',
            width: '100px',
            alignSelf: 'flex-start',
          }}
        ></div>

        <div
          onClick={() => dispatch({ type: 'reference3' })}
          id="reference3"
          style={{
            display: 'block',
            backgroundColor: 'red',
            height: '50px',
            width: '100px',
          }}
        ></div>

        <UserGuide
          {...props}
          isVisible={state.isVisible}
          parentElementName={`#${state.reference}`}
          zIndex={1000}
          shouldSlide={true}
        >
          {state.reference === 'reference1' ? (
            <UserGuideStep
              header="Header - concise and clear"
              image={{
                src: beautifulImage,
                alt: 'image',
              }}
              text="Tooltip content is used to explain the details of elements or features."
              handleClickPrimary={() => dispatch({ type: 'reference2' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
              currentStep={1}
              stepMax={3}
              closeWithX
            />
          ) : null}

          {state.reference === 'reference2' ? (
            <UserGuideStep
              header="Header - concise and clear"
              image={{
                src: beautifulImage,
                alt: 'image',
              }}
              text="Tooltip content is used to explain the details of elements or features."
              handleClickPrimary={() => dispatch({ type: 'reference3' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
              currentStep={2}
              stepMax={3}
              closeWithX
            />
          ) : null}

          {state.reference === 'reference3' ? (
            <UserGuideStep
              header="Header - concise and clear"
              image={{
                src: beautifulImage,
                alt: 'image',
              }}
              text="Tooltip content is used to explain the details of elements or features."
              handleClickPrimary={() => dispatch({ type: 'isVisible' })}
              handleCloseAction={() => {
                dispatch({ type: 'isVisible' });
              }}
              currentStep={3}
              stepMax={3}
              closeWithX
            />
          ) : null}
        </UserGuide>
      </div>
    </div>
  );
};
