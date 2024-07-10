import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { AppFrameProvider } from '../../providers/AppFrameProvider';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

import { AppFrame } from './AppFrame';
import { NavBarItem, NavBarList } from './components';
import {
  ExampleAppContent,
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
    <AppFrameProvider>
      <AppFrame
        topNavBarNode={
          <NavBarList>
            <NavBarItem
              label="Home"
              disableTooltip
              icon={<Icon source={Icons.LiveChatMono} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('home');
              }}
              isActive={activeItem === 'home'}
              href="#"
            />
            <NavBarItem
              label="Chats"
              icon={<Icon source={Icons.Messages} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('chats');
              }}
              isActive={activeItem === 'chats'}
              badge="dot"
              href="#"
            />
            <NavBarItem
              label="Engage"
              icon={<Icon source={Icons.Automation} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('engage');
              }}
              isActive={activeItem === 'engage'}
              badge="alert"
              href="#"
            />
            <NavBarItem
              label="Archives"
              icon={<Icon source={Icons.Archives} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('archives');
              }}
              isActive={activeItem === 'archives'}
              badge={5}
              href="#"
            />
            <NavBarItem
              label="Tickets"
              icon={<Icon source={Icons.Tickets} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('tickets');
              }}
              isActive={activeItem === 'tickets'}
              href="#"
            />
            <NavBarItem
              label="Team"
              icon={<Icon source={Icons.People} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('team');
              }}
              isActive={activeItem === 'team'}
              href="#"
            />
            <NavBarItem
              label="Reports"
              icon={<Icon source={Icons.Report} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('reports');
              }}
              isActive={activeItem === 'reports'}
              href="#"
            />
            <NavBarItem
              label="Apps"
              icon={<Icon source={Icons.Apps} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('apps');
              }}
              isActive={activeItem === 'apps'}
              href="#"
            />
          </NavBarList>
        }
        bottomNavBarNode={
          <NavBarList>
            <NavBarItem
              label="Billing"
              icon={<Icon source={Icons.CreditCardOutline} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('billing');
              }}
              isActive={activeItem === 'billing'}
              href="#"
            />
            <NavBarItem
              label="Settings"
              icon={<Icon source={Icons.Settings} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('settings');
              }}
              isActive={activeItem === 'settings'}
              href="#"
            />
            <NavBarItem
              label="News"
              icon={<Icon source={Icons.Notifications} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('news');
              }}
              isActive={activeItem === 'news'}
              href="#"
            />
            <NavBarItem
              label="News"
              icon={<Icon source={Icons.Notifications} />}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem('news');
              }}
              isActive={activeItem === 'news'}
              href="#"
            />
            <NavBarItem
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
          </NavBarList>
        }
        subNavBar={getSubNav()}
        topBarNode={
          topBarVisible && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h3>Top bar node</h3>
            </div>
          )
        }
      >
        <ExampleAppContent
          showToggle={SectionsWithToggle.includes(activeItem)}
          topBarVisible={topBarVisible}
          handleTopBarButtonClick={() => setTopBarVisible((prev) => !prev)}
        />
      </AppFrame>
    </AppFrameProvider>
  );
};
