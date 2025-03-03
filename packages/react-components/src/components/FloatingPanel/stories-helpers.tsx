import { FC } from 'react';

import * as Icons from '@livechat/design-system-icons';

import { Icon } from '../Icon';
import { Switch } from '../Switch';
import { Tooltip } from '../Tooltip';
import { Text, Heading } from '../Typography';

interface IExampleAppContentProps {
  isBottomBarVisisble: boolean;
  isTopBarVisisble: boolean;
  isLeftBarVisisble: boolean;
  isRightBarVisisble: boolean;
  handleBarVisibilityChange: (kind: string) => void;
}

export const ExampleAppContent: FC<IExampleAppContentProps> = ({
  isBottomBarVisisble,
  isTopBarVisisble,
  isLeftBarVisisble,
  isRightBarVisisble,
  handleBarVisibilityChange,
}) => {
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
            <Text bold>Toggle bottom bar visibility</Text>
            <Switch
              size="compact"
              on={isBottomBarVisisble}
              onChange={() => handleBarVisibilityChange('bottom')}
            />
          </div>
          <div className="switch">
            <Text bold>Toggle top bar visibility</Text>
            <Switch
              size="compact"
              on={isTopBarVisisble}
              onChange={() => handleBarVisibilityChange('top')}
            />
          </div>
          <div className="switch">
            <Text bold>Toggle left bar visibility</Text>
            <Switch
              size="compact"
              on={isLeftBarVisisble}
              onChange={() => handleBarVisibilityChange('left')}
            />
          </div>
          <div className="switch">
            <Text bold>Toggle right bar visibility</Text>
            <Switch
              size="compact"
              on={isRightBarVisisble}
              onChange={() => handleBarVisibilityChange('right')}
            />
          </div>
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
