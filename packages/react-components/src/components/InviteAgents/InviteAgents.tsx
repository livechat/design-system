import { FC, memo, useMemo } from 'react';

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

const InviteAgentsComponent: FC<InviteAgentsProps> = ({
  agents,
  onAddAgentsClick,
  className,
}) => {
  const {
    availableAgentsNumber,
    unavailableAgentsNumber,
    unknownAgentsNumber,
    visibleAgents,
    additionalAgentsNumber,
  } = useMemo(() => {
    const availableAgentsNumber = agents.filter(
      (agent) => agent.status === 'available'
    ).length;
    const unavailableAgentsNumber = agents.filter(
      (agent) => agent.status === 'unavailable'
    ).length;
    const unknownAgentsNumber =
      agents.length - availableAgentsNumber - unavailableAgentsNumber;
    const sortedAgents = getSortedAgents(agents);
    const visibleAgents =
      sortedAgents.length > 4 ? sortedAgents.slice(0, 3) : sortedAgents;
    const additionalAgentsNumber = agents.length - visibleAgents.length;

    return {
      availableAgentsNumber,
      unavailableAgentsNumber,
      unknownAgentsNumber,
      visibleAgents,
      additionalAgentsNumber,
    };
  }, [agents]);

  return (
    <div className={cx(ThemeClassName.Dark, styles[baseClass], className)}>
      <Tooltip
        className={cx(ThemeClassName.Dark, styles[`${baseClass}__tooltip`])}
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
            {additionalAgentsNumber > 0 && (
              <Text
                className={
                  styles[`${baseClass}__tooltip-additional-agents-number`]
                }
              >
                {additionalAgentsNumber}
              </Text>
            )}
          </div>
        }
      >
        <Text
          bold
          size="md"
          className={styles[`${baseClass}__tooltip-heading`]}
        >
          Agent status
        </Text>
        <Text noMargin>
          <div
            className={cx(
              styles[`${baseClass}__tooltip-status`],
              styles[`${baseClass}__tooltip-status--available`]
            )}
          />
          {availableAgentsNumber} accept chats
        </Text>
        <Text noMargin>
          <div
            className={cx(
              styles[`${baseClass}__tooltip-status`],
              styles[`${baseClass}__tooltip-status--unavailable`]
            )}
          />
          {unavailableAgentsNumber} do not accept chats
        </Text>
        <Text noMargin>
          <div
            className={cx(
              styles[`${baseClass}__tooltip-status`],
              styles[`${baseClass}__tooltip-status--unknown`]
            )}
          />
          {unknownAgentsNumber} offline
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

export const InviteAgents = memo(InviteAgentsComponent);
