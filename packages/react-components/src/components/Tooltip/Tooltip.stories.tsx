import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip as TooltipComponent } from './Tooltip';
import {
  ChevronDown,
  Smiles,
  CannedResponse,
  Attachment,
} from '@livechat/design-system-icons/react/tabler';

import { Icon } from '../Icon';

import './Tooltip.stories.css';
import { Simple } from './components/Simple';
import { Info as TooltipInfoComponent } from './components/Info';
import { Interactive as TooltipInteractiveComponent } from './components/Interactive';
import { UserGuide as TooltipUserGuideComponent } from './components/UserGuide/UserGuide';
import { UserGuideStep } from './components/UserGuide/UserGuideStep';
import beautifulImage from './placeholder.png';
import { ITooltipProps } from './types';

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

export const Tooltip = (args: ITooltipProps): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <span className={'tooltip-icon-wrap'}>
      <TooltipSimpleExample {...args}></TooltipSimpleExample>
    </span>
    <span className={'tooltip-icon-wrap'}>
      <Icon source={CannedResponse}></Icon>
    </span>
    <span className={'tooltip-icon-wrap'}>
      <Icon source={Attachment}></Icon>
    </span>
  </div>
);

Tooltip.args = {
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

export const TooltipInfo = (args: ITooltipProps): JSX.Element => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <TooltipInfoExample {...args}></TooltipInfoExample>
  </div>
);

TooltipInfo.args = {
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

export const TooltipInteractive = (args: ITooltipProps): JSX.Element => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <TooltipInteractiveExample {...args}></TooltipInteractiveExample>
  </div>
);

TooltipInteractive.args = {
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

export const TooltipUserGuide = (args: ITooltipProps): JSX.Element => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
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

const TooltipSimpleExample: React.FC<ITooltipProps> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TooltipComponent
        {...props}
        triggerRenderer={() => <Icon source={Smiles}></Icon>}
      >
        <Simple text="Simple tooltip" />
      </TooltipComponent>
    </div>
  );
};

const TooltipInteractiveExample: React.FC<ITooltipProps> = (props) => {
  return (
    <div
      style={{
        width: '500px',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TooltipComponent
        {...props}
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
        <TooltipInteractiveComponent
          header="Header - concise and clear"
          image={{
            src: beautifulImage,
            alt: 'image',
          }}
          theme={props.theme}
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
      </TooltipComponent>
    </div>
  );
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

        <TooltipUserGuideComponent
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
        </TooltipUserGuideComponent>
      </div>
    </div>
  );
};

const TooltipInfoExample: React.FC<ITooltipProps> = (props) => {
  return (
    <div
      style={{
        width: '500px',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TooltipComponent
        {...props}
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
        <TooltipInfoComponent
          header="Header - concise and clear"
          text="Tooltip content is used to explain the details of elements or features."
          closeWithX
        />
      </TooltipComponent>
    </div>
  );
};

export default {
  title: 'Components/Tooltip',
  component: TooltipSimpleExample,
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
} as ComponentMeta<typeof TooltipSimpleExample>;
