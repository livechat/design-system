import * as React from 'react';

import {
  ChevronDown,
  ChevronUp,
  MoreHoriz,
} from '@livechat/design-system-icons';
import cx from 'clsx';

import { ActionMenu } from '../ActionMenu';
import { Icon, IconKind, IconSource } from '../Icon';
import { ListItem } from '../ListItem';
import { Text } from '../Typography';

import { SystemMessageTimestamp } from './components/SystemMessageTimestamp';
import {
  ISystemMessageProps,
  SystemMessageKind,
  SystemMessageAction,
} from './types';

import styles from './SystemMessage.module.scss';

const baseClass = 'system-message';

export const SystemMessage: React.FC<
  React.PropsWithChildren<ISystemMessageProps>
> = ({
  children,
  source,
  alignment = 'right',
  kind = 'info',
  iconSource,
  titleBold = false,
  details,
  timestamp,
  timestampWithSeconds,
  actions,
}) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = React.useState(false);

  const titleClassName = cx(
    styles[`${baseClass}__header-wrapper-title`],
    styles[`${baseClass}__header-wrapper-title--kind-${kind}`],
    {
      [styles[`${baseClass}__header-wrapper-title--bold`]]: titleBold,
    }
  );
  const headerWrapperClassName = cx(
    styles[`${baseClass}__header-wrapper`],
    styles[`${baseClass}__header-wrapper--alignment-${alignment}`]
  );
  const detailsClassName = cx(
    styles[`${baseClass}__details-wrapper`],
    styles[`${baseClass}__details-wrapper--alignment-${alignment}`],
    {
      [styles[`${baseClass}__details-wrapper--alignment-left-margin`]]:
        alignment === 'left' && iconSource,
    }
  );
  const detailsFirstLineClassName = cx(
    styles[`${baseClass}__details-first-line`],
    styles[`${baseClass}__details-first-line--alignment-${alignment}`]
  );
  const actionsWrapperClassName = cx(
    styles[`${baseClass}__actions-wrapper`],
    styles[`${baseClass}__actions-wrapper--alignment-${alignment}`],
    {
      [styles[`${baseClass}__actions-wrapper--alignment-left-margin`]]:
        alignment === 'left' && iconSource,
    }
  );

  const getIcon = (
    iconSource: IconSource,
    kind: SystemMessageKind
  ): React.ReactNode => {
    let iconKind: IconKind = 'primary';

    switch (kind) {
      case 'info':
        iconKind = 'primary';
        break;
      case 'positive':
        iconKind = 'positive';
        break;
      case 'warning':
        iconKind = 'warning';
        break;
      case 'error':
        iconKind = 'error';
        break;
      default:
        iconKind = 'primary';
        break;
    }

    return (
      <Icon
        data-testid="system-message-header-icon"
        source={iconSource}
        kind={iconKind}
      />
    );
  };

  const getActions = (actions: SystemMessageAction[]): React.ReactNode => {
    return (
      <div className={actionsWrapperClassName}>
        {actions.slice(0, 2).map((action) => (
          <Text
            className={styles[`${baseClass}__action-item`]}
            underline
            size="xs"
            key={action.label}
            onClick={action.callback}
          >
            {action.label}
          </Text>
        ))}

        {actions.length > 2 && (
          <ActionMenu
            placement="bottom-end"
            options={actions.slice(2).map((action) => ({
              key: action.label,
              element: (
                <ListItem
                  leftNode={
                    action.icon ? (
                      <Icon source={action.icon} kind="primary" />
                    ) : undefined
                  }
                >
                  {action.label}
                </ListItem>
              ),
              onClick: action.callback,
            }))}
            triggerRenderer={
              <Icon
                data-testid="system-message-actions-menu-trigger"
                className={styles[`${baseClass}__actions-wrapper-menu-trigger`]}
                source={MoreHoriz}
                kind="primary"
              />
            }
          />
        )}
      </div>
    );
  };

  const getDetails = (details: string[]): React.ReactNode => {
    return (
      <div data-testid="system-message-details" className={detailsClassName}>
        <div className={detailsFirstLineClassName}>
          {details.slice(0, 1).map((detail, index) => (
            <Text as="div" size="xs" key={`detail-first-${index}`}>
              {detail}
            </Text>
          ))}
          {details.length > 1 && (
            <div
              data-testid="system-message-details-toggle"
              className={styles[`${baseClass}__details-toggle`]}
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            >
              <Icon
                source={isDetailsExpanded ? ChevronUp : ChevronDown}
                kind="primary"
              />
            </div>
          )}
        </div>
        {isDetailsExpanded &&
          details.slice(1).map((detail) => (
            <div key={`detail-${details.indexOf(detail)}`}>
              <Text as="div" size="xs">
                {detail}
              </Text>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div
      data-testid="system-message"
      className={cx(styles[`${baseClass}__wrapper`])}
    >
      <div
        data-testid="system-message-header"
        className={headerWrapperClassName}
      >
        {iconSource && (
          <div className={styles[`${baseClass}__header-wrapper-icon`]}>
            {getIcon(iconSource, kind)}
          </div>
        )}
        <Text
          as="div"
          size="xs"
          data-testid="system-message-title"
          className={titleClassName}
        >
          {children}
        </Text>
        {source && (
          <Text
            as="div"
            size="xs"
            data-testid="system-message-source"
            className={styles[`${baseClass}__header-wrapper-source`]}
          >
            • {source}
          </Text>
        )}
        {timestamp && timestampWithSeconds && (
          <SystemMessageTimestamp
            timestamp={timestamp}
            timestampWithSeconds={timestampWithSeconds}
          />
        )}
      </div>
      <>
        {details && getDetails(details)}
        {actions && getActions(actions)}
      </>
    </div>
  );
};
