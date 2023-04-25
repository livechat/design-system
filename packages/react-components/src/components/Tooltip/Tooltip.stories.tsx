import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { ITooltipProps, Tooltip as TooltipComponent } from './Tooltip';
import { Help } from '@livechat/design-system-icons/react/material';

import { Icon } from '../Icon';

import './Tooltip.stories.css';
import { Info as TooltipInfoComponent } from './Info';
import { Interactive as TooltipInteractiveComponent } from './Interactive';
import { UserGuide as TooltipUserGuideComponent } from './UserGuide';
import { UserGuideStep } from './UserGuideStep';
import interactiveImage from './docs/gift.svg';
import docs from './docs/Tooltip.mdx';
import noop from '../../utils/noop';

export default {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  subcomponents: {
    Interactive: TooltipInteractiveComponent,
    Info: TooltipInfoComponent,
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
} as ComponentMeta<typeof TooltipComponent>;

export const Default = (args: ITooltipProps): React.ReactElement => (
  <TooltipComponent
    {...args}
    triggerRenderer={() => (
      <div>
        <Icon source={Help}></Icon>
      </div>
    )}
  >
    <div>Simple tooltip</div>
  </TooltipComponent>
);
Default.argTypes = {
  referenceElement: {
    control: {
      disable: true,
    },
  },
};
Default.parameters = {
  layout: 'centered',
};

export const WithControlledVisibility = (): React.ReactElement => (
  <div
    style={{
      marginTop: 50,
      marginBottom: 30,
    }}
  >
    <TooltipComponent
      theme="invert"
      placement="top"
      isVisible
      triggerRenderer={() => (
        <div>
          <Icon source={Help}></Icon>
        </div>
      )}
    >
      <div>Simple tooltip</div>
    </TooltipComponent>
  </div>
);
WithControlledVisibility.args = {
  theme: 'invert',
  placement: 'top',
  isVisible: true,
};
WithControlledVisibility.parameters = {
  layout: 'centered',
};

export const TooltipInteractive = (): React.ReactElement => (
  <div
    style={{
      marginTop: 250,
      marginBottom: 250,
    }}
  >
    <TooltipComponent
      placement="top"
      isVisible
      triggerRenderer={() => (
        <div>
          <Icon source={Help}></Icon>
        </div>
      )}
    >
      <TooltipInteractiveComponent
        header="Header - concise and clear"
        image={{
          src: interactiveImage,
          alt: 'Gift image',
        }}
        text="Tooltip content is used to explain the details of elements or features"
        primaryButton={{
          handleClick: noop,
          label: 'Primary Button',
          kind: 'primary',
        }}
        secondaryButton={{
          handleClick: noop,
          label: 'Link',
          kind: 'plain',
        }}
      />
    </TooltipComponent>
  </div>
);
TooltipInteractive.parameters = {
  layout: 'centered',
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
                src: interactiveImage,
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
                src: interactiveImage,
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
                src: interactiveImage,
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
