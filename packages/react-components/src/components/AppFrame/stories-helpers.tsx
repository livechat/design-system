import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { useAppFrame } from '../../providers/AppFrameProvider';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { Switch } from '../Switch';
import { Tag } from '../Tag';
import { Tooltip } from '../Tooltip';
import { Heading, Text } from '../Typography';

import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationGroup,
} from './components';
import {
  ChameleonAlert,
  CustomBackgroundAlert,
  DisconnectedAlert,
  InfoAlert,
} from './components/NavigationTopBar/examples';
import { NavigationTopBar } from './components/NavigationTopBar/NavigationTopBar';

import './AppFrame.css';

interface ExampleAppContentProps {
  showToggle: boolean;
  alerts?: boolean[];
  topBarVisible: boolean;
  setTopBarVisible: (visible: boolean) => void;
  visibleAlert: number | null;
  setVisibleAlert: (index: number | null) => void;
}

export const ExampleAppContent: React.FC<ExampleAppContentProps> = ({
  showToggle,
  alerts,
  topBarVisible,
  setTopBarVisible,
  visibleAlert,
  setVisibleAlert,
}) => {
  const { isSideNavigationVisible, toggleSideNavigationVisibility } =
    useAppFrame();

  return (
    <div className="app-container">
      <Heading className="page-title" size="lg">
        App content
        <Tooltip
          triggerClassName="tooltip-trigger"
          triggerRenderer={<Icon source={Icons.Info} />}
        >
          Help info tooltip
        </Tooltip>
      </Heading>
      <div className="app-content-1">
        <div className="switchers">
          <div className="switch">
            <Text bold>Toggle top bar visibility</Text>
            <Switch
              size="compact"
              on={topBarVisible}
              onChange={() => setTopBarVisible(!topBarVisible)}
            />
          </div>
          {showToggle && (
            <div className="switch">
              <Text bold>Toogle sub-navigation visibility</Text>
              <Switch
                size="compact"
                on={isSideNavigationVisible}
                onChange={toggleSideNavigationVisibility}
              />
            </div>
          )}
          {alerts && (
            <>
              {alerts.map((_, index) => (
                <div key={index} className="switch">
                  <Text bold>Taggle alert {index + 1}</Text>
                  <Switch
                    size="compact"
                    on={index === visibleAlert}
                    onChange={() =>
                      setVisibleAlert(index === visibleAlert ? null : index)
                    }
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="app-content-2">
        <Text>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </Text>
        <Text>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </Text>
        <Text>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </Text>
        <Text>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </Text>
      </div>
    </div>
  );
};

export const ExampleTopBar: React.FC<{
  topBarVisible: boolean;
  visibleAlert: number | null;
  setVisibleAlert: (index: number | null) => void;
  id?: string;
}> = ({ topBarVisible, visibleAlert, setVisibleAlert, id }) => {
  const [kind, setKind] = React.useState<
    'info' | 'success' | 'warning' | 'error'
  >('warning');

  const closeAlert = () => setVisibleAlert(null);

  const changeKind = () => {
    setKind((prevKind) => {
      switch (prevKind) {
        case 'info':
          return 'success';
        case 'success':
          return 'warning';
        case 'warning':
          return 'error';
        case 'error':
          return 'info';
      }
    });
  };

  return (
    <NavigationTopBar
      additionalNodes={
        topBarVisible ? (
          <NavigationTopBar.Title>
            Example top bar content
          </NavigationTopBar.Title>
        ) : null
      }
    >
      <DisconnectedAlert
        id={id}
        show={visibleAlert === 0}
        onClose={() => closeAlert()}
      />
      <ChameleonAlert
        show={visibleAlert === 1}
        onClose={() => closeAlert()}
        kind={kind}
        changeKind={changeKind}
      />
      <CustomBackgroundAlert
        show={visibleAlert === 2}
        onClose={() => closeAlert()}
      />
      <InfoAlert show={visibleAlert === 3} onClose={() => closeAlert()} />
    </NavigationTopBar>
  );
};

export const getBadgeContent = (item: string) => {
  switch (item) {
    case 'chats':
      return 5;
    case 'engage':
      return 'dot';
    case 'archives':
      return 'alert';
    default:
      return undefined;
  }
};

const getSimpleNavElements = (
  activeSubItem: number,
  handler: (o: number) => void
) =>
  [...Array(4)].map((_, index) => (
    <SideNavigationItem
      key={index}
      label={`Option ${index + 1} ${
        index === 3 ? 'with very long label name' : ''
      }`}
      shouldKeepIconSpace={false}
      isActive={activeSubItem === index}
      onClick={() => handler(index)}
    />
  ));

export const getChatsMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Chats">
    {getSimpleNavElements(activeSubItem, handler)}
  </SideNavigation>
);

const getCustomLabel = (label: string, component: React.ReactNode) => (
  <span
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    }}
  >
    {label} {component}
  </span>
);

const getCustomLabelElement = (index: number) => {
  switch (index) {
    case 5:
      return <Badge count={1} size="compact" />;
    case 6:
      return <Badge type="alert" size="compact" />;
    case 7:
      return <Badge type="dot" size="compact" />;
    default:
      return null;
  }
};

const getLabelRightNode = (index: number) => {
  switch (index) {
    case 5:
      return <Badge count={5} kind="tertiary" />;
    case 6:
      return <Badge kind="tertiary" />;
    case 7:
      return <Tag size="small">NEW</Tag>;
    default:
      return null;
  }
};

const getAdvancedNavElements = (
  activeSubItem: number,
  handler: (o: number) => void
) =>
  [...Array(3)].map((_, index) => (
    <SideNavigationItem
      label={getCustomLabel(
        `Option ${index + 5}`,
        getCustomLabelElement(index + 5)
      )}
      leftNode={
        <Tooltip
          placement="top-start"
          floatingStrategy="fixed"
          triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
        >
          {`Option ${index + 5} custom tooltip`}
        </Tooltip>
      }
      rightNode={getLabelRightNode(index + 5)}
      isActive={activeSubItem === index + 5}
      onClick={() => handler(index + 5)}
    />
  ));

export const getEngageSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Engage">
    {getAdvancedNavElements(activeSubItem, handler)}
  </SideNavigation>
);

export const getArchivesSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Archives" customFooter={<h3>Custom footer</h3>}>
    <SideNavigationGroup
      label="Group 1 (non collapsible) with very long label name"
      rightNode={<Badge count={5} kind="tertiary" />}
    >
      {getSimpleNavElements(activeSubItem, handler)}
    </SideNavigationGroup>
    <SideNavigationGroup
      isCollapsible
      shouldOpenOnInit
      label="Group 2 with very long label name"
    >
      {getAdvancedNavElements(activeSubItem, handler)}
    </SideNavigationGroup>
    <SideNavigationGroup isCollapsible label="Group 3">
      {[...Array(5)].map((_, index) => (
        <SideNavigationItem
          key={index}
          label={`Option ${index + 8}`}
          isActive={activeSubItem === index + 8}
          onClick={() => handler(index + 8)}
        />
      ))}
    </SideNavigationGroup>
    {[...Array(3)].map((_, index) => (
      <SideNavigationItem
        key={index}
        label={`Option ${index + 13} (not grouped)`}
        isActive={activeSubItem === index + 13}
        onClick={() => handler(index + 13)}
        shouldKeepIconSpace={false}
      />
    ))}
    <SideNavigationGroup isCollapsible shouldOpenOnInit label="Group 4">
      {[...Array(5)].map((_, index) => (
        <SideNavigationItem
          key={index}
          label={`Option ${index + 16}`}
          isActive={activeSubItem === index + 16}
          onClick={() => handler(index + 16)}
        />
      ))}
    </SideNavigationGroup>
  </SideNavigation>
);
