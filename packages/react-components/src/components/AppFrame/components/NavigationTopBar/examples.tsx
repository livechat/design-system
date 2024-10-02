import * as React from 'react';

import { NavigationTopBar } from './NavigationTopBar';

import styles from './examples.module.scss';
export const DisconnectedAlert: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  const [isReconnecting, setIsReconnecting] = React.useState(false);
  const [isReconnected, setIsReconnected] = React.useState(false);

  const reconnect = () => {
    setIsReconnecting(true);
    setTimeout(() => {
      setIsReconnecting(false);
      setIsReconnected(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    }, 2000);
  };

  // eslint-disable-next-line no-nested-ternary
  const content = isReconnecting
    ? 'Reconnecting...'
    : isReconnected
    ? 'Reconnected'
    : 'Disconnected from the server';

  return (
    <NavigationTopBar.Alert
      kind={isReconnected ? 'success' : 'error'}
      isVisible={show}
      primaryCta={
        !isReconnecting && !isReconnected
          ? {
              label: 'Reconnect',
              onClick: reconnect,
            }
          : undefined
      }
    >
      {content}
    </NavigationTopBar.Alert>
  );
};

export const ChameleonAlert: React.FC<{
  show: boolean;
  onClose: () => void;
  kind: 'info' | 'success' | 'warning' | 'error';
  changeKind: () => void;
}> = ({ show, onClose, kind, changeKind }) => {
  const [longerContent, setLongerContent] = React.useState(false);

  return (
    <NavigationTopBar.Alert
      kind={kind}
      isVisible={show}
      closeButton={{
        onClick: onClose,
      }}
      primaryCta={{
        label: 'Change kind',
        onClick: changeKind,
      }}
      secondaryCta={{
        label: 'Toggle longer content',
        onClick: () => setLongerContent((prev) => !prev),
      }}
    >
      {longerContent
        ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec tincidunt nunc. Sed nec ex nec eros tincidunt vehicula'
        : kind}
    </NavigationTopBar.Alert>
  );
};

export const CustomBackgroundAlert: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  return (
    <NavigationTopBar.Alert
      kind="info"
      isVisible={show}
      className={styles['custom-bg']}
      closeButton={{
        onClick: onClose,
      }}
    >
      Custom background alert
    </NavigationTopBar.Alert>
  );
};

export const InfoAlert: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  return (
    <NavigationTopBar.Alert
      kind="info"
      isVisible={show}
      primaryCta={{
        label: 'Primary CTA',
        onClick: onClose,
      }}
      secondaryCta={{
        label: 'Secondary CTA',
        onClick: onClose,
      }}
    >
      Info alert
    </NavigationTopBar.Alert>
  );
};
