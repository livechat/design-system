import { FC, memo, useMemo, useState } from 'react';

import {
  Add,
  Bot,
  ChatBotColored,
  People,
  PersonAdd,
} from '@livechat/design-system-icons';
import cx from 'clsx';

import { ThemeClassName } from '../../providers';
import { plural } from '../../utils/plural';
import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { Interactive, Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import { AnimatedButton } from './components/AnimatedButton/AnimatedButton';
import { getSortedAgents } from './helpers';
import { InviteAgentsProps } from './types';

import styles from './InviteAgents.module.scss';

const baseClass = 'invite-agents';

const HOVER_ON_DELAY = 50;

const InviteAgentsComponent: FC<InviteAgentsProps> = ({
  agents,
  onSetUpChatbotClick,
  onAddTeammateClick,
  className,
  animatedInviteButton = false,
  tooltipArrowOffset = 13,
  onAvailableAgentsClick,
  showBotsInTooltip = true,
  ...props
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const {
    availableAgentsNumber,
    visibleAgents,
    hasOnlyUnavailableAgents,
    onlyAgentsNumber,
    onlyBotsNumber,
  } = useMemo(() => {
    const availableAgents = agents.filter(
      (agent) => agent.status === 'available'
    );
    const sortedAgents = getSortedAgents(availableAgents);
    const availableAgentsNumber = availableAgents.length;

    const visibleAgents =
      sortedAgents.length > 4 ? sortedAgents.slice(0, 3) : sortedAgents;
    const hasOnlyUnavailableAgents =
      agents.length > 0 && availableAgentsNumber === 0;
    const onlyAgentsNumber = availableAgents.filter(
      (agent) => !agent.isBot
    ).length;
    const onlyBotsNumber = availableAgentsNumber - onlyAgentsNumber;

    return {
      availableAgentsNumber,
      visibleAgents,
      hasOnlyUnavailableAgents,
      onlyAgentsNumber,
      onlyBotsNumber,
    };
  }, [agents]);

  const handleSetUpChatbotClick = () => {
    onSetUpChatbotClick();
    setIsMenuOpen(false);
    setIsTooltipVisible(false);
  };

  const handleAddTeammateClick = () => {
    onAddTeammateClick();
    setIsMenuOpen(false);
    setIsTooltipVisible(false);
  };

  const handleAvailableAgentsClick = () => {
    onAvailableAgentsClick();
    setIsMenuOpen(false);
    setIsTooltipVisible(false);
  };

  const menuOptions = [
    {
      key: 'chatbot',
      onClick: handleSetUpChatbotClick,
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
      onClick: handleAddTeammateClick,
    },
  ];

  return (
    <div
      {...props}
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
          isVisible={isTooltipVisible && !isMenuOpen}
          offsetMainAxis={tooltipArrowOffset}
          floatingStrategy="fixed"
          hoverOnDelay={HOVER_ON_DELAY}
          onOpen={() => setIsTooltipVisible(true)}
          onClose={() => setIsTooltipVisible(false)}
          className={cx(ThemeClassName.Dark, styles[`${baseClass}__tooltip`])}
          triggerRenderer={
            hasOnlyUnavailableAgents ? (
              <div
                className={styles[`${baseClass}__not-accepting`]}
                onClick={handleAvailableAgentsClick}
              >
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
              <div
                className={styles[`${baseClass}__tooltip-trigger`]}
                onClick={handleAvailableAgentsClick}
              >
                <div className={styles[`${baseClass}__avatar-container`]}>
                  {visibleAgents.map((agent, index) => (
                    <Avatar
                      text={agent.name}
                      className={styles[`${baseClass}__avatar`]}
                      key={agent.email}
                      type={agent.avatar ? 'image' : 'text'}
                      size="xsmall"
                      status={agent.status}
                      src={agent.avatar}
                      style={{ zIndex: agents.length - index }}
                    />
                  ))}
                </div>
                {availableAgentsNumber > 0 && (
                  <Text
                    className={styles[`${baseClass}__available-agents-number`]}
                  >
                    {availableAgentsNumber}
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
                handleClick: handleSetUpChatbotClick,
                label: 'Set up ChatBot',
              }}
            />
          ) : (
            <Text
              as="div"
              noMargin
              size="md"
              className={styles[`${baseClass}__accepting-agents`]}
            >
              <Text bold noMargin>
                Accepting chats:
              </Text>
              <Text
                noMargin
                className={styles[`${baseClass}__accepting-agents-row`]}
              >
                <Icon source={People} />
                {plural(
                  onlyAgentsNumber,
                  '1 agent',
                  `${onlyAgentsNumber} agents`
                )}
              </Text>
              {showBotsInTooltip && (
                <Text
                  noMargin
                  className={styles[`${baseClass}__accepting-agents-row`]}
                >
                  <Icon source={Bot} />
                  {plural(onlyBotsNumber, '1 bot', `${onlyBotsNumber} bots`)}
                </Text>
              )}
            </Text>
          )}
        </Tooltip>
      )}

      <ActionMenu
        floatingStrategy="fixed"
        visible={isMenuOpen}
        onOpen={() => setIsMenuOpen(true)}
        onClose={() => setIsMenuOpen(false)}
        options={menuOptions}
        triggerRenderer={
          <AnimatedButton
            icon={<Icon source={Add} />}
            text="Invite"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            isExpanded={animatedInviteButton ? isMenuOpen || undefined : true}
          />
        }
      />
    </div>
  );
};

export const InviteAgents = memo(InviteAgentsComponent);
