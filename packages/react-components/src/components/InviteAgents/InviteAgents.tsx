import { FC } from 'react';

import { Add } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ThemeClassName } from '../../providers';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import { getSortedAgents } from './helpers';
import { InviteAgentsProps } from './types';

import styles from './InviteAgents.module.scss';

const baseClass = 'invite-agents';

export const InviteAgents: FC<InviteAgentsProps> = ({
  agents,
  onAddAgentsClick,
  className,
}) => {
  const availableAgentsNumber = agents.filter(
    (agent) => agent.status === 'available'
  ).length;

  const visibleAgents = getSortedAgents(agents).slice(0, 3);
  const additionalAgentsNumber = agents.length - visibleAgents.length;

  return (
    <div className={cx(ThemeClassName.Dark, styles[baseClass], className)}>
      <Tooltip
        className={ThemeClassName.Dark}
        offsetMainAxis={11}
        triggerRenderer={
          <div className={styles[`${baseClass}__tooltip-trigger`]}>
            <div className={styles[`${baseClass}__avatar-container`]}>
              {visibleAgents.map((agent, index) => (
                <Avatar
                  className={styles[`${baseClass}__avatar`]}
                  key={agent.email}
                  type="image"
                  size="xsmall"
                  status={agent.status}
                  src={agent.avatar}
                  style={{ zIndex: agents.length - index }}
                />
              ))}
            </div>
            <Text
              noMargin
              className={styles[`${baseClass}__available-agents-number`]}
            >
              +{additionalAgentsNumber}
            </Text>
          </div>
        }
      >
        <Text noMargin>
          {availableAgentsNumber} of {agents.length} agents accepting chats
        </Text>
      </Tooltip>

      <Button
        kind="secondary"
        className={styles[`${baseClass}__invite-button`]}
        icon={<Icon source={Add} />}
        onClick={onAddAgentsClick}
      >
        Invite team
      </Button>
    </div>
  );
};
