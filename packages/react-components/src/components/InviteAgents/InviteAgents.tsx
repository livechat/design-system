import { FC, memo, useMemo, useState } from 'react';

import { Add, ChatBotColored, PersonAdd } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ThemeClassName } from '../../providers';
import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Interactive, Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import { getAvailableAgentsTooltipText, getSortedAgents } from './helpers';
import { InviteAgentsProps } from './types';

import styles from './InviteAgents.module.scss';

const baseClass = 'invite-agents';

const InviteAgentsComponent: FC<InviteAgentsProps> = ({
  agents,
  onSetUpChatbotClick,
  onAddTeammateClick,
  className,
  animatedInviteButton = false,
  tooltipArrowOffset = 13,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldAnimateInviteButton =
    animatedInviteButton && agents.length > 0 && !isMenuOpen;
  const {
    availableAgentsNumber,
    visibleAgents,
    additionalAgentsNumber,
    hasOnlyUnavailableAgents,
  } = useMemo(() => {
    const availableAgents = agents.filter(
      (agent) => agent.status === 'available'
    );
    const sortedAgents = getSortedAgents(availableAgents);
    const availableAgentsNumber = availableAgents.length;

    const visibleAgents =
      sortedAgents.length > 4 ? sortedAgents.slice(0, 3) : sortedAgents;
    const additionalAgentsNumber = availableAgentsNumber - visibleAgents.length;
    const hasOnlyUnavailableAgents =
      agents.length > 0 && availableAgentsNumber === 0;

    return {
      availableAgentsNumber,
      visibleAgents,
      additionalAgentsNumber,
      hasOnlyUnavailableAgents,
    };
  }, [agents]);

  const menuOptions = [
    {
      key: 'chatbot',
      onClick: onSetUpChatbotClick,
      element: (
        <ActionMenuItem leftNode={<Icon source={ChatBotColored} />}>
          Set up ChatBot
        </ActionMenuItem>
      ),
    },
    {
      key: 'teammate',
      element: (
        <ActionMenuItem leftNode={<Icon source={PersonAdd} />}>
          Invite teammate
        </ActionMenuItem>
      ),
      onClick: onAddTeammateClick,
    },
  ];

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
          isVisible={isMenuOpen ? false : undefined}
          offsetMainAxis={tooltipArrowOffset}
          floatingStrategy="fixed"
          hoverOnDelay={50}
          className={cx(ThemeClassName.Dark, styles[`${baseClass}__tooltip`])}
          triggerRenderer={
            hasOnlyUnavailableAgents ? (
              <div className={styles[`${baseClass}__not-accepting`]}>
                <div
                  className={cx(
                    styles[`${baseClass}__not-accepting-status-dot`]
                  )}
                />
                <Text noMargin bold size="sm">
                  No active agents
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
          {hasOnlyUnavailableAgents ? (
            <Interactive
              header="No one's available to assist customers"
              text="Offer 24/7 support with ChatBot."
              primaryButton={{
                handleClick: onSetUpChatbotClick,
                label: 'Set up ChatBot',
              }}
            />
          ) : (
            <Text noMargin size="md">
              {getAvailableAgentsTooltipText(availableAgentsNumber)}
            </Text>
          )}
        </Tooltip>
      )}

      <ActionMenu
        visible={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
        options={menuOptions}
        triggerRenderer={
          <Button
            animatedLabel={shouldAnimateInviteButton}
            kind="secondary"
            size="xcompact"
            className={cx(styles[`${baseClass}__invite-button`], {
              [styles[`${baseClass}__invite-button--animated`]]:
                shouldAnimateInviteButton,
            })}
            icon={<Icon source={Add} />}
          >
            Invite
          </Button>
        }
      />
    </div>
  );
};

export const InviteAgents = memo(InviteAgentsComponent);
