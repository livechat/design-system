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
import { ExampleTopBar, getArchivesSubMenu, getBadgeContent, getChatsMenu, getEngageSubMenu } from '../AppFrame/stories-helpers';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ProductSwitcher, useProductSwitcher } from '../ProductSwitcher';
import { Tooltip } from '../Tooltip';

import { UserGuideStep } from './components/UserGuideStep';
import beautifulImage from './placeholder.png';
import { AppContent } from './stories-helpers';
import { CursorTiming } from './types';
import { UserGuide } from './UserGuide';

import './UserGuide.stories.css';

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
    layout: 'fullscreen'
  },
  subcomponents: { UserGuideStep },
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
        cursorTiming: 'moderate2',
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
        cursorTiming: 'moderate2',
      };
    }
    if (action.type === 'isVisible') {
      return {
        reference: 'reference1',
        isVisible: !state.isVisible,
        cursorPosition: 'left',
        cursorTiming: 'moderate2',
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    reference: 'reference1',
    isVisible: false,
    cursorPosition: 'left',
    cursorTiming: 'moderate2',
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
  const [topBarVisible, setTopBarVisible] = useState(true);
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
    if (action.type === 'home') {
      return {
        ...state,
        isVisible: !state.isVisible,
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
        reference: 'home',
        isVisible: !state.isVisible,
        cursorPosition: 'right-start',
        cursorTiming: 'moderate2',
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    reference: 'home',
    isVisible: false,
    cursorPosition: 'right-start',
    cursorTiming: 'moderate2',
  });
  
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
        <AppContent onStartGuideClick={() => dispatch({ type: 'home' })} />
      </AppFrame>
      <UserGuide
        isVisible={state.isVisible}
        parentElementName={`#${state.reference}`}
        cursorPosition={state.cursorPosition as Placement}
        cursorTiming={state.cursorTiming as CursorTiming}
        elementStyles={state.elementStyles}
        zIndex={100000}
      >
        {state.reference === 'home' ? (
          <UserGuideStep
            header="This is navigation item"
            text=""
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
            currentStep={2}
            stepMax={9}
            handleClickPrimary={() => dispatch({ type: 'user' })}
            handleCloseAction={() => dispatch({ type: 'isVisible' })}
          />
        ) : null}

        {state.reference === 'user' ? (
          <UserGuideStep
            header="This is user button"
            text="Some text, maximum 210 characters."
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
            handleClickPrimary={() => dispatch({ type: 'action-bar-area-menu-button' })}
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
            handleClickPrimary={() => dispatch({ type: 'isVisible' })}
            handleCloseAction={() => dispatch({ type: 'isVisible' })}
          />
        ) : null}
      </UserGuide>
    </>
  )
}
