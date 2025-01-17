import { CSSProperties, FC, ReactElement, useReducer } from 'react';

import { Meta } from '@storybook/react';

import { Button } from '../Button';
import './UserGuide.stories.css';
import { ITooltipProps } from '../Tooltip';

import beautifulImage from './placeholder.png';
import { UserGuide } from './UserGuide';
import { UserGuideStep } from './UserGuideStep';

export default {
  title: 'Components/UserGuide',
  component: UserGuide,
  argTypes: {
    triggerRenderer: {
      control: false,
    },
    useDismissHookProps: {
      control: false,
    },
  },
  parameters: {
    controls: { expanded: true },
    chromatic: { delay: 300 },
  },
} as Meta<typeof UserGuide>;

export const Default = (): ReactElement => {
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

  const [state, dispatch] = useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
  });

  return (
    <div className="simple-user-guide-container">
      <Button onClick={() => dispatch({ type: 'isVisible' })}>
        Start guide
      </Button>
      <div className="guide-container">
        <div
          onClick={() => dispatch({ type: 'reference1' })}
          id="reference1"
          className="guide-reference"
        >
          Example reference 1
        </div>
        <div
          onClick={() => dispatch({ type: 'reference2' })}
          id="reference2"
          className="guide-reference"
        >
          Example reference 2
        </div>

        <div
          onClick={() => dispatch({ type: 'reference3' })}
          id="reference3"
          className="guide-reference"
        >
          Example reference 3
        </div>

        <UserGuide
          isVisible={state.isVisible}
          parentElementName={`#${state.reference}`}
          zIndex={1000}
        >
          {state.reference === 'reference1' ? (
            <Button onClick={() => dispatch({ type: 'reference2' })}>
              Next
            </Button>
          ) : null}

          {state.reference === 'reference2' ? (
            <Button onClick={() => dispatch({ type: 'reference3' })}>
              Next
            </Button>
          ) : null}

          {state.reference === 'reference3' ? (
            <Button onClick={() => dispatch({ type: 'isVisible' })}>
              Finish
            </Button>
          ) : null}
        </UserGuide>
      </div>
    </div>
  );
};

export const SlideAnimationWithColor = (): ReactElement => {
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

  const [state, dispatch] = useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
  });

  return (
    <div className="simple-user-guide-container">
      <Button onClick={() => dispatch({ type: 'isVisible' })}>
        Start guide
      </Button>
      <div className="guide-container">
        <div
          onClick={() => dispatch({ type: 'reference1' })}
          id="reference1"
          className="guide-reference"
        >
          Example reference 1
        </div>
        <div
          onClick={() => dispatch({ type: 'reference2' })}
          id="reference2"
          className="guide-reference-2"
        >
          Example reference 2
        </div>

        <div
          onClick={() => dispatch({ type: 'reference3' })}
          id="reference3"
          className="guide-reference"
        >
          Example reference 3
        </div>

        <UserGuide
          isVisible={state.isVisible}
          parentElementName={`#${state.reference}`}
          zIndex={1000}
        >
          {state.reference === 'reference1' ? (
            <Button onClick={() => dispatch({ type: 'reference2' })}>
              Next
            </Button>
          ) : null}

          {state.reference === 'reference2' ? (
            <Button onClick={() => dispatch({ type: 'reference3' })}>
              Next
            </Button>
          ) : null}

          {state.reference === 'reference3' ? (
            <Button onClick={() => dispatch({ type: 'isVisible' })}>
              Finish
            </Button>
          ) : null}
        </UserGuide>
      </div>
    </div>
  );
};

export const ExtendedContentUserGuide = (args: ITooltipProps): ReactElement => (
  <div className="preview-container">
    <UserGuideWithTooltip {...args}></UserGuideWithTooltip>
  </div>
);

ExtendedContentUserGuide.args = {
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

export const UserGuideWithCustomStylesForSpotlightElement = (
  args: ITooltipProps
): ReactElement => (
  <div className="preview-container">
    <TooltipUserGuideExampleWithCustomStyles
      {...args}
    ></TooltipUserGuideExampleWithCustomStyles>
  </div>
);

ExtendedContentUserGuide.args = {
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

const UserGuideWithTooltip: FC<ITooltipProps> = (props) => {
  const reducer = (
    state: {
      isVisible: boolean;
      reference: string;
    },
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

  const [state, dispatch] = useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
  });

  return (
    <div>
      <Button onClick={() => dispatch({ type: 'isVisible' })}>
        Start guide
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
            borderRadius: '24px',
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

const TooltipUserGuideExampleWithCustomStyles: FC<ITooltipProps> = (props) => {
  const reducer = (
    state: {
      isVisible: boolean;
      reference: string;
      elementStyles?: CSSProperties;
    },
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
        elementStyles: {
          boxShadow:
            '0px -4px 22px 1px rgba(0, 102, 255, 0.3), 0px 12px 32px 1px rgba(113, 111, 255, 0.6), 0px 0px 0px 1px rgba(145, 70, 255, 1) inset',
        },
      };
    }
    if (action.type === 'reference3') {
      return {
        ...state,
        reference: 'reference3',
        elementStyles: {
          transform: 'scale(1.1)',
          backgroundColor: 'blue',
        },
      };
    }
    if (action.type === 'isVisible') {
      return {
        reference: 'reference1',
        isVisible: !state.isVisible,
        elementStyles: { boxShadow: '0 0 0 2px yellow' },
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
    elementStyles: { boxShadow: '0 0 0 2px yellow' },
  });

  return (
    <div>
      <Button onClick={() => dispatch({ type: 'isVisible' })}>
        Start guide
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
            borderRadius: '24px',
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
          elementStyles={state.elementStyles}
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
