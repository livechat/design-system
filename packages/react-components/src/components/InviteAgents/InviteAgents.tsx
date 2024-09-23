import { FC } from 'react';

import { Add } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ThemeClassName } from '../../providers';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';

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

  return (
    <div className={cx(ThemeClassName.Dark, styles[baseClass], className)}>
      <Tooltip
        className={ThemeClassName.Dark}
        triggerRenderer={
          <div className={styles[`${baseClass}__tooltip-trigger`]}>
            <div className={styles[`${baseClass}__avatar-container`]}>
              {agents.map((agent) => (
                <Avatar
                  key={agent.email}
                  type="image"
                  size="xsmall"
                  status={agent.status}
                  src={agent.avatar}
                />
              ))}
            </div>
            <Text
              noMargin
              className={styles[`${baseClass}__available-agents-number`]}
            >
              {availableAgentsNumber}
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
