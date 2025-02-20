import { CSSProperties, ReactElement, useReducer, useState } from 'react';

import { Placement } from '@floating-ui/react';
import * as Icons from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { AppFrame } from '../AppFrame';
import {
  Navigation,
  NavigationItem,
  NavigationGroup,
  ExpirationCounter,
  MobileNavigation,
} from '../AppFrame/components';
import {
  ExampleTopBar,
  getArchivesSubMenu,
  getBadgeContent,
  getChatsMenu,
  getEngageSubMenu,
} from '../AppFrame/stories-helpers';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ProductSwitcher, useProductSwitcher } from '../ProductSwitcher';
import { Tooltip } from '../Tooltip';

import { UserGuideBubbleStep, UserGuideStep } from './components';
import { AppContent } from './stories-helpers';
import { CursorTiming } from './types';
import { UserGuide } from './UserGuide';

import './UserGuideStories.css';

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
    layout: 'fullscreen',
  },
  subcomponents: { UserGuideStep, UserGuideBubbleStep },
} as Meta<typeof UserGuide>;

const navigationItems = [
  'home',
  'chats',
  'engage',
  'archives',
  'tickets',
  'team',
  'reports',
  'apps',
  'billing',
  'settings',
  'news',
];
const navigationItemsIcons = [
  Icons.LiveChatMono,
  Icons.Messages,
  Icons.Automation,
  Icons.Archives,
  Icons.Tickets,
  Icons.People,
  Icons.Report,
  Icons.Apps,
];
const secondaryNavigationIcons = [
  Icons.CreditCardOutline,
  Icons.Settings,
  Icons.Notifications,
];

const defaultImage =
  'https://cdn-labs.livechat-files.com/api/file/lc/img/100019504/df59da4b5b0cdb6030efb08787fd255d.jpg';

export const Example = (): ReactElement => {
  const [activeItem, setActiveItem] = useState('archives');
  const [activeSubItem, setActiveSubItem] = useState(0);
  const [topBarVisible] = useState(true);
  const [visibleAlert, setVisibleAlert] = useState<number | null>(0);

  const { products } = useProductSwitcher({
    env: 'labs',
    installedProducts: [
      {
        product: 'ChatBot',
      },
      {
        product: 'HelpDesk',
      },
      {
        product: 'KnowledgeBase',
      },
      {
        product: 'LiveChat',
      },
      {
        product: 'OpenWidget',
      },
    ],
    organizationId: 'organizationId',
    subscriptions: {
      livechat: { status: 'active' },
      chatbot: { status: 'expired' },
    },
    mainProductId: 'livechat',
  });

  const getSubNav = () => {
    switch (activeItem) {
      case 'chats':
        return getChatsMenu(activeSubItem, setActiveSubItem);
      case 'engage':
        return getEngageSubMenu(activeSubItem, setActiveSubItem);
      case 'archives':
        return getArchivesSubMenu(activeSubItem, setActiveSubItem);
      default:
        return null;
    }
  };

  const reducer = (
    state: {
      isVisible: boolean;
      reference: string;
      cursorPosition?: string;
      cursorTiming?: string;
      elementStyles?: CSSProperties;
    },
    action: { type: string }
  ) => {
    if (action.type === 'first-step') {
      return {
        ...state,
        reference: 'first-step',
        isVisible: true,
        cursorPosition: 'right-end',
      };
    }
    if (action.type === 'last-step') {
      return {
        ...state,
        reference: 'last-step',
      };
    }
    if (action.type === 'home') {
      return {
        ...state,
        reference: 'home',
        cursorPosition: 'right-start',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'archives') {
      return {
        ...state,
        reference: 'archives',
        cursorPosition: 'right-start',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'user') {
      return {
        ...state,
        reference: 'user',
        cursorPosition: 'right-end',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'chat-list-column') {
      return {
        ...state,
        reference: 'chat-list-column',
        cursorPosition: 'right',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'text-area') {
      return {
        ...state,
        reference: 'text-area',
        cursorPosition: 'top',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'action-bar-area') {
      return {
        ...state,
        reference: 'action-bar-area',
        cursorPosition: 'left',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'one') {
      return {
        ...state,
        reference: 'one',
        cursorPosition: 'bottom-end',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'action-bar-area-menu-button') {
      return {
        ...state,
        reference: 'action-bar-area-menu-button',
        cursorPosition: 'bottom-end',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'accordion') {
      return {
        ...state,
        reference: 'accordion',
        cursorPosition: 'left',
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'isVisible') {
      return {
        reference: 'first-step',
        isVisible: !state.isVisible,
        cursorPosition: 'right-end',
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    reference: 'first-step',
    isVisible: false,
  });

  const [isCompleted, setisCompleted] = useState(false);

  return (
    <>
      <AppFrame
        navigation={
          <Navigation>
            <NavigationGroup scrollable>
              <li className="product-switcher-height">
                <ProductSwitcher
                  mainProductId="livechat"
                  productOptions={products}
                />
              </li>
              {navigationItems.slice(0, 8).map((item, index) => (
                <NavigationItem
                  key={item}
                  id={item}
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                  icon={<Icon source={navigationItemsIcons[index]} />}
                  onClick={(e, id) => {
                    e.preventDefault();
                    setActiveItem(id);
                  }}
                  isActive={activeItem === item}
                  badge={getBadgeContent(item)}
                />
              ))}
            </NavigationGroup>
            <NavigationGroup>
              <ExpirationCounter
                id="expiration"
                daysLeft={7}
                onClick={(e, id) => {
                  e.preventDefault();
                  setActiveItem(id);
                }}
              />
              {navigationItems.slice(8, 11).map((item, index) => (
                <NavigationItem
                  key={item}
                  id={item}
                  disabled={index % 2 === 0}
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                  icon={<Icon source={secondaryNavigationIcons[index]} />}
                  onClick={(e, id) => {
                    e.preventDefault();
                    setActiveItem(id);
                  }}
                  isActive={activeItem === item}
                />
              ))}
              <NavigationItem
                id="user"
                disableOpacity
                icon={
                  <Tooltip
                    floatingStrategy="fixed"
                    placement="right"
                    triggerRenderer={
                      <Avatar
                        className="avatar"
                        status="available"
                        type="image"
                        src={defaultImage}
                        alt="User avatar"
                      />
                    }
                  >
                    Custom element with own tooltip (native nav tooltip is
                    disabled)
                  </Tooltip>
                }
                onClick={(e) => e.preventDefault()}
              />
            </NavigationGroup>
          </Navigation>
        }
        mobileNavigation={
          <MobileNavigation>
            {navigationItems.slice(0, 5).map((item, index) => (
              <NavigationItem
                key={item}
                id={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                icon={<Icon source={navigationItemsIcons[index]} />}
                onClick={(e, id) => {
                  e.preventDefault();
                  setActiveItem(id);
                }}
                isActive={activeItem === item}
                badge={getBadgeContent(item)}
              />
            ))}
          </MobileNavigation>
        }
        sideNavigation={getSubNav()}
        topBar={
          topBarVisible ? (
            <ExampleTopBar
              topBarVisible={topBarVisible}
              visibleAlert={visibleAlert}
              setVisibleAlert={setVisibleAlert}
            />
          ) : null
        }
      >
        <AppContent
          onStartGuideClick={() => dispatch({ type: 'first-step' })}
        />
      </AppFrame>
      {state.isVisible && (
        <UserGuide
          isVisible={state.isVisible}
          parentElementName={`#${state.reference}`}
          cursorPosition={state.cursorPosition as Placement}
          cursorTiming={state.cursorTiming as CursorTiming}
          elementStyles={state.elementStyles}
          isFirstStep={state.reference === 'first-step'}
          isLastStep={state.reference === 'last-step'}
        >
          {state.reference === 'first-step' ? (
            <UserGuideBubbleStep
              headerMessage="Welcome to chats section"
              headerIcon={<Icon source={Icons.OneColored} />}
              message="We have prepared the playground ready for you to test all capabilities of chat section. If you have any question, just trigger me from the upper -right corner of the screen!"
              cta={
                <>
                  <Button
                    kind="high-contrast"
                    size="large"
                    onClick={() => dispatch({ type: 'home' })}
                  >
                    Let's dive in
                  </Button>
                  <Button
                    kind="plain"
                    size="large"
                    onClick={() => dispatch({ type: 'isVisible' })}
                  >
                    Maybe later
                  </Button>
                </>
              }
            />
          ) : null}

          {state.reference === 'last-step' ? (
            <UserGuideBubbleStep
              isCompleted={isCompleted}
              handleAnimationComplete={() => setisCompleted(true)}
              headerMessage="Thanks for joining my tour"
              headerIcon={<Icon source={Icons.OneColored} />}
              message="We have prepared the playground ready for you to test all capabilities of chat section. If you have any question, just trigger me from the upper -right corner of the screen!"
              cta={
                <>
                  <Button
                    kind="high-contrast"
                    size="large"
                    onClick={() => {
                      dispatch({ type: 'isVisible' });
                      setisCompleted(false);
                    }}
                  >
                    Finish
                  </Button>
                  <Button
                    kind="plain"
                    size="large"
                    onClick={() => {
                      dispatch({ type: 'first-step' });
                      setisCompleted(false);
                    }}
                  >
                    Start again
                  </Button>
                </>
              }
            />
          ) : null}

          {state.reference === 'home' ? (
            <UserGuideStep
              header="This is navigation item"
              text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
              typingAnimation
              currentStep={1}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'archives' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'archives' ? (
            <UserGuideStep
              header="This is selected navigation item"
              text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
              typingAnimation
              currentStep={2}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'user' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'user' ? (
            <UserGuideStep
              header="This is user button"
              text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
              typingAnimation
              currentStep={3}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'chat-list-column' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'chat-list-column' ? (
            <UserGuideStep
              header="This is chat list column"
              text="Some text, maximum 210 characters."
              currentStep={4}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'text-area' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'text-area' ? (
            <UserGuideStep
              header="This is text area component"
              text="Some text, maximum 210 characters."
              currentStep={5}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'action-bar-area' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'action-bar-area' ? (
            <UserGuideStep
              header="This is action bar component"
              text="Some text, maximum 210 characters."
              currentStep={6}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'one' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'one' ? (
            <UserGuideStep
              header="This is action bar button"
              text="Some text, maximum 210 characters."
              currentStep={7}
              stepMax={9}
              handleClickPrimary={() =>
                dispatch({ type: 'action-bar-area-menu-button' })
              }
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'action-bar-area-menu-button' ? (
            <UserGuideStep
              header="This is action bar menu trigger button"
              text="Some text, maximum 210 characters."
              currentStep={8}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'accordion' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}

          {state.reference === 'accordion' ? (
            <UserGuideStep
              header="This is accordion component"
              text="Some text, maximum 210 characters."
              currentStep={9}
              stepMax={9}
              handleClickPrimary={() => dispatch({ type: 'last-step' })}
              handleCloseAction={() => dispatch({ type: 'isVisible' })}
            />
          ) : null}
        </UserGuide>
      )}
    </>
  );
};

export const UserGuideStepExample = (): ReactElement => {
  return (
    <UserGuideStep
      aria-label="Navigation guide step"
      header="This is navigation item"
      text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
      currentStep={1}
      stepMax={9}
      handleClickPrimary={() => {}}
      handleCloseAction={() => {}}
    />
  );
};
UserGuideStepExample.parameters = {
  layout: 'centered',
};

export const UserGuideStepExampleWithImage = (): ReactElement => {
  return (
    <UserGuideStep
      image={{
        src: 'https://placehold.co/600x300',
        alt: 'test image',
      }}
      aria-label="Navigation guide step"
      header="This is navigation item"
      text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
      currentStep={1}
      stepMax={9}
      handleClickPrimary={() => {}}
      handleCloseAction={() => {}}
    />
  );
};
UserGuideStepExampleWithImage.parameters = {
  layout: 'centered',
};

export const UserGuideStepExampleWithVideo = (): ReactElement => {
  return (
    <UserGuideStep
      video={{
        src: 'https://cdn.livechat-static.com/api/file/lc/img/default/assets/copilot-popover.mp4',
        playsInline: true,
        autoPlay: true,
        muted: true,
        loop: true,
        controls: true,
      }}
      aria-label="Navigation guide step"
      header="This is navigation item"
      text="Some text, maximum 210 characters. But can be divided into couple of message. More or less can be up to 4 lines. So let’s see how it looks like and let’s make it 4 lines. Ok, cool."
      currentStep={1}
      stepMax={9}
      handleClickPrimary={() => {}}
      handleCloseAction={() => {}}
    />
  );
};
UserGuideStepExampleWithVideo.parameters = {
  layout: 'centered',
};

export const UserGuideBubbleStepExample = (): ReactElement => {
  return (
    <UserGuideBubbleStep
      aria-label="Welcome guide step"
      headerMessage="Welcome to chats section"
      headerIcon={<Icon source={Icons.OneColored} />}
      message="We have prepared the playground ready for you to test all capabilities of chat section. If you have any question, just trigger me from the upper -right corner of the screen!"
      cta={
        <>
          <Button kind="high-contrast" size="large" onClick={() => {}}>
            Let's dive in
          </Button>
          <Button kind="plain" size="large" onClick={() => {}}>
            Maybe later
          </Button>
        </>
      }
    />
  );
};
UserGuideBubbleStepExample.parameters = {
  layout: 'centered',
};
