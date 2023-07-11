import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { ITooltipProps, Tooltip } from './Tooltip';
import {
  ChevronDown,
  Smiles,
  CannedResponse,
  Attachment,
} from '@livechat/design-system-icons/react/tabler';

import { Icon } from '../Icon';

import './Tooltip.stories.css';
import beutifulImage from './placeholder.png';
import { Info, Interactive, Reports, Simple, UserGuide } from './components';
import { UserGuideStep } from './components/UserGuideStep';

const tooltipPlacements = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];

const isVisibleOptions = [true, false, undefined];

const tooltipThemes = ['invert', 'important', 'default'];

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: tooltipPlacements,
      control: {
        type: 'select',
        labels: 'Placement',
      },
    },
    theme: {
      options: tooltipThemes,
      control: {
        type: 'select',
        labels: 'Theme',
      },
    },
    isVisible: {
      options: isVisibleOptions,
      control: {
        type: 'select',
        labels: 'Visibility',
      },
    },
  },
  subcomponents: {
    Info,
    Interactive,
    Reports,
    Simple,
    UserGuide,
  },
} as ComponentMeta<typeof Tooltip>;

export const Default = (args: ITooltipProps): React.ReactElement => (
  <div className="tooltip-preview-container">
    <span className={'tooltip-icon-wrap'}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip
          {...args}
          triggerRenderer={() => <Icon source={Smiles}></Icon>}
        >
          <Simple text="Simple tooltip" />
        </Tooltip>
      </div>
    </span>
    <span className={'tooltip-icon-wrap'}>
      <Icon source={CannedResponse}></Icon>
    </span>
    <span className={'tooltip-icon-wrap'}>
      <Icon source={Attachment}></Icon>
    </span>
  </div>
);

Default.args = {
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

export const TooltipInfo = (): JSX.Element => (
  <div className="tooltip-preview-container">
    <Tooltip
      isVisible
      triggerRenderer={() => (
        <div>
          <Button
            icon={<Icon source={ChevronDown}></Icon>}
            iconPosition={'right'}
          >
            Open Tooltip
          </Button>
        </div>
      )}
    >
      <Info
        header="Header - concise and clear"
        text="Tooltip content is used to explain the details of elements or features."
        closeWithX
      />
    </Tooltip>
  </div>
);

export const TooltipInteractive = (): JSX.Element => (
  <div className="tooltip-preview-container">
    <Tooltip
      isVisible
      className="tooltip-interactive"
      triggerRenderer={() => (
        <div>
          <Button
            icon={<Icon source={ChevronDown}></Icon>}
            iconPosition={'right'}
          >
            Open Tooltip
          </Button>
        </div>
      )}
    >
      <Interactive
        header="Header - concise and clear"
        image={{
          src: beutifulImage,
          alt: 'image',
        }}
        text="Tooltip content is used to explain the details of elements or features."
        closeWithX
        primaryButton={{
          handleClick: () => console.log('primary click handler'),
          label: 'Primary Button',
          kind: 'primary',
        }}
        secondaryButton={{
          handleClick: () => console.log('secondary click handler'),
          label: 'Secondary',
          kind: 'secondary',
        }}
      />
    </Tooltip>
  </div>
);

export const TooltipReports = (): JSX.Element => (
  <div className="tooltip-preview-container">
    <Tooltip
      fullSpaceContent
      isVisible
      triggerRenderer={() => (
        <div>
          <Button
            icon={<Icon source={ChevronDown}></Icon>}
            iconPosition={'right'}
          >
            Open Tooltip
          </Button>
        </div>
      )}
    >
      <Reports title="Date or Series" description="Additional information">
        <div className="tooltip-preview-reports">Reports content</div>
      </Reports>
      <Reports title="Date or Series" description="Additional information">
        <div className="tooltip-preview-reports">Reports content</div>
      </Reports>
      <Reports title="Date or Series" description="Additional information">
        <div className="tooltip-preview-reports">Reports content</div>
      </Reports>
    </Tooltip>
  </div>
);

export const TooltipUserGuide = (args: ITooltipProps): JSX.Element => (
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
                src: beutifulImage,
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
                src: beutifulImage,
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
                src: beutifulImage,
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
