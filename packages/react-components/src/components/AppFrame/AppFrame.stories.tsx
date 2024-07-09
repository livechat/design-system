import * as React from 'react';

import { AppFrameProvider } from '../../providers/AppFrameProvider';

import { AppFrame } from './AppFrame';
import {
  ExampleAppContent,
  getArchivesSubMenu,
  getBottomNavOptions,
  getChatsMenu,
  getEngageSubMenu,
  getMainNavOptions,
} from './stories-helpers';

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
        activeOptionKey={activeItem}
        navBarOptions={getMainNavOptions(setActiveItem)}
        bottomNavBarOptions={getBottomNavOptions(setActiveItem)}
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
