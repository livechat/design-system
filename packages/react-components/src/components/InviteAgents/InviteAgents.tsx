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
  animatedInviteButton = false,
  tooltipArrowOffset = 13,
}) => {
  const shouldAnimateInviteButton = animatedInviteButton && agents.length > 0;
  const {
    availableAgentsNumber,
    unavailableAgentsNumber,
    unknownAgentsNumber,
    visibleAgents,
    additionalAgentsNumber,
    hasOnlyUnavailableAgents,
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
    const hasOnlyUnavailableAgents =
      agents.length > 0 &&
      unavailableAgentsNumber > 0 &&
      availableAgentsNumber === 0;

    return {
      availableAgentsNumber,
      unavailableAgentsNumber,
      unknownAgentsNumber,
      visibleAgents,
      additionalAgentsNumber,
      hasOnlyUnavailableAgents,
    };
  }, [agents]);

  return (
    <div
      className={cx(
        ThemeClassName.Dark,
        styles[baseClass],
        {
          [styles[`${baseClass}--empty`]]: agents.length === 0,
          [styles[`${baseClass}--only-unavailable`]]: hasOnlyUnavailableAgents,
        },
        className
      )}
    >
      {agents.length > 0 && (
        <Tooltip
          offsetMainAxis={tooltipArrowOffset}
          floatingStrategy="fixed"
          hoverOnDelay={50}
          className={cx(ThemeClassName.Dark, styles[`${baseClass}__tooltip`])}
          triggerRenderer={
            hasOnlyUnavailableAgents ? (
              <div className={styles[`${baseClass}__not-accepting`]}>
                <div
                  className={cx(
                    styles[`${baseClass}__tooltip-status`],
                    styles[`${baseClass}__tooltip-status--unavailable`],
                    styles[`${baseClass}__tooltip-status--unavailable--border`]
                  )}
                />
                <Text noMargin bold size="sm">
                  Not accepting
                </Text>
              </div>
            ) : (
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
                    className={styles[`${baseClass}__available-agents-number`]}
                  >
                    +{additionalAgentsNumber}
                  </Text>
                )}
              </div>
            )
          }
        >
          <Text
            bold
            size="md"
            className={styles[`${baseClass}__tooltip-heading`]}
          >
            {hasOnlyUnavailableAgents
              ? 'No one assist your customers'
              : 'Team status'}
          </Text>
          {!!availableAgentsNumber && (
            <Text noMargin>
              <div
                className={cx(
                  styles[`${baseClass}__tooltip-status`],
                  styles[`${baseClass}__tooltip-status--available`]
                )}
              />
              {availableAgentsNumber} accepting chats
            </Text>
          )}
          {!!unavailableAgentsNumber && (
            <Text noMargin>
              <div
                className={cx(
                  styles[`${baseClass}__tooltip-status`],
                  styles[`${baseClass}__tooltip-status--unavailable`]
                )}
              />
              {unavailableAgentsNumber} not accepting chats
            </Text>
          )}
          {!!unknownAgentsNumber && (
            <Text noMargin>
              <div
                className={cx(
                  styles[`${baseClass}__tooltip-status`],
                  styles[`${baseClass}__tooltip-status--unknown`]
                )}
              />
              {unknownAgentsNumber} offline
            </Text>
          )}
        </Tooltip>
      )}

      <Button
        animatedLabel={shouldAnimateInviteButton}
        kind="secondary"
        size="xcompact"
        className={cx(styles[`${baseClass}__invite-button`], {
          [styles[`${baseClass}__invite-button--animated`]]:
            shouldAnimateInviteButton,
        })}
        icon={<Icon source={Add} />}
        onClick={onAddAgentsClick}
      >
        Invite team
      </Button>
    </div>
  );
};

export const InviteAgents = memo(InviteAgentsComponent);
