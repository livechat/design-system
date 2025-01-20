import { ReactElement, useReducer } from 'react';

import { Placement } from '@floating-ui/react';
import { Meta } from '@storybook/react';

import { Button } from '../Button';
import './UserGuide.stories.css';

import { UserGuideStep } from './components/UserGuideStep';
import beautifulImage from './placeholder.png';
import { CursorTiming } from './types';
import { UserGuide } from './UserGuide';

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
    state: {
      isVisible: boolean;
      reference: string;
      cursorPosition?: string;
      cursorTiming?: string;
    },
    action: { type: string }
  ) => {
    if (action.type === 'reference1') {
      return {
        ...state,
        reference: 'reference1',
        cursorPosition: 'left',
        cursorTiming: 'fast1',
      };
    }
    if (action.type === 'reference2') {
      return {
        ...state,
        reference: 'reference2',
        cursorPosition: 'right-start',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'reference3') {
      return {
        ...state,
        reference: 'reference3',
        cursorPosition: 'left-end',
        cursorTiming: 'fast2',
      };
    }
    if (action.type === 'isVisible') {
      return {
        reference: 'reference1',
        isVisible: !state.isVisible,
        cursorPosition: 'left',
        cursorTiming: 'fast1',
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
    cursorPosition: 'left',
    cursorTiming: 'fast1',
  });

  return (
    <div className="simple-user-guide-container">
      <Button onClick={() => dispatch({ type: 'isVisible' })}>
        Start guide
      </Button>
      <div style={{ display: 'flex' }}>
        <div style={{ marginTop: 300 }}>
          <div
            onClick={() => dispatch({ type: 'reference1' })}
            id="reference1"
            className="guide-reference"
          >
            Example reference 1
          </div>
        </div>
        <div style={{ marginTop: 50 }}>
          <div
            onClick={() => dispatch({ type: 'reference2' })}
            id="reference2"
            className="guide-reference"
          >
            Example reference 2
          </div>
        </div>
        <div style={{ marginTop: 500 }}>
          <div
            onClick={() => dispatch({ type: 'reference3' })}
            id="reference3"
            className="guide-reference"
          >
            Example reference 3
          </div>
        </div>

        <UserGuide
          isVisible={state.isVisible}
          parentElementName={`#${state.reference}`}
          cursorPosition={state.cursorPosition as Placement}
          cursorTiming={state.cursorTiming as CursorTiming}
          zIndex={1000}
        >
          {state.reference === 'reference1' ? (
            <UserGuideStep
              header="Title text goes here"
              text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
              image={{
                src: beautifulImage,
                alt: 'image',
              }}
              currentStep={1}
              stepMax={3}
              handleClickPrimary={() => dispatch({ type: 'reference2' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'reference2' ? (
            <UserGuideStep
              header="Title text goes here"
              text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
              image={{
                src: beautifulImage,
                alt: 'image',
              }}
              currentStep={2}
              stepMax={3}
              handleClickPrimary={() => dispatch({ type: 'reference3' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'reference3' ? (
            <UserGuideStep
              header="Title text goes here"
              text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
              image={{
                src: beautifulImage,
                alt: 'image',
              }}
              currentStep={3}
              stepMax={3}
              handleClickPrimary={() => dispatch({ type: 'isVisible' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}
        </UserGuide>
      </div>
    </div>
  );
};
