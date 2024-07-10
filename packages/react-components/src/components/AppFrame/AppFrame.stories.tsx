import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import { AppFrame } from './AppFrame';
import { Navigation, NavigationItem, NavigationList } from './components';
import {
  ExampleAppContent,
  ExampleTopBar,
  getArchivesSubMenu,
  getChatsMenu,
  getEngageSubMenu,
} from './stories-helpers';

const defaultImage =
  'https://cdn-labs.livechat-files.com/api/file/lc/img/100019504/df59da4b5b0cdb6030efb08787fd255d.jpg';

export default {
  title: 'Components/AppFrame',
  component: AppFrame,
  parameters: {
    layout: 'fullscreen',
  },
};

const SectionsWithToggle = ['chats', 'engage', 'archives'];

export const Default = (): React.ReactElement => {
  const [activeItem, setActiveItem] = React.useState('home');
  const [activeSubItem, setActiveSubItem] = React.useState(0);
  const [topBarVisible, setTopBarVisible] = React.useState(true);

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

  return (
    <AppFrame
      navigation={
        <Navigation>
          <NavigationList scrollable>
            <NavigationItem
              id="home"
              label="Home"
              disableTooltip
              icon={<Icon source={Icons.LiveChatMono} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'home'}
              href="#"
            />
            <NavigationItem
              id="chats"
              label="Chats"
              icon={<Icon source={Icons.Messages} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'chats'}
              badge="dot"
              href="#"
            />
            <NavigationItem
              id="engage"
              label="Engage"
              icon={<Icon source={Icons.Automation} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'engage'}
              badge="alert"
              href="#"
            />
            <NavigationItem
              id="archives"
              label="Archives"
              icon={<Icon source={Icons.Archives} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'archives'}
              badge={5}
              href="#"
            />
            <NavigationItem
              id="tickets"
              label="Tickets"
              icon={<Icon source={Icons.Tickets} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'tickets'}
              href="#"
            />
            <NavigationItem
              id="team"
              label="Team"
              icon={<Icon source={Icons.People} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'team'}
              href="#"
            />
            <NavigationItem
              id="reports"
              label="Reports"
              icon={<Icon source={Icons.Report} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'reports'}
              href="#"
            />
            <NavigationItem
              id="apps"
              label="Apps"
              icon={<Icon source={Icons.Apps} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'apps'}
              href="#"
            />
          </NavigationList>
          <NavigationList>
            <NavigationItem
              id="billing"
              label="Billing"
              icon={<Icon source={Icons.CreditCardOutline} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'billing'}
              href="#"
            />
            <NavigationItem
              id="settings"
              label="Settings"
              icon={<Icon source={Icons.Settings} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'settings'}
              href="#"
            />
            <NavigationItem
              id="news"
              label="News"
              icon={<Icon source={Icons.Notifications} />}
              onClick={(e, id) => {
                e.preventDefault();
                setActiveItem(id);
              }}
              isActive={activeItem === 'news'}
              href="#"
            />
            <NavigationItem
              id="user"
              label="User"
              disableOpacity
              disableTooltip
              icon={
                <Tooltip
                  floatingStrategy="fixed"
                  placement="right"
                  triggerRenderer={
                    <Avatar
                      status="available"
                      type="image"
                      src={defaultImage}
                      alt="User avatar"
                    />
                  }
                >
                  Custom element with tooltip
                </Tooltip>
              }
              onClick={(e) => e.preventDefault()}
              href="#"
            />
          </NavigationList>
        </Navigation>
      }
      sideNavigation={getSubNav()}
      topBar={topBarVisible && <ExampleTopBar />}
    >
      <ExampleAppContent
        showToggle={SectionsWithToggle.includes(activeItem)}
        topBarVisible={topBarVisible}
        handleTopBarButtonClick={() => setTopBarVisible((prev) => !prev)}
      />
    </AppFrame>
  );
};
