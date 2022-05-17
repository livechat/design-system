import * as React from 'react';
import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import styles from './InAppMessageHeader.module.scss';
import {
  InAppMessageAvatar,
  InAppMessageAvatarProps,
} from './InAppMessageAvatar';

const baseClass = 'in-app-message-header';

interface InAppMessageHeaderProps {
  avatar?: InAppMessageAvatarProps;
  text?: React.ReactElement;
  onCloseButtonClick: () => void;
}

export const InAppMessageHeader: React.FC<InAppMessageHeaderProps> = ({
  avatar,
  text,
  onCloseButtonClick,
}) => {
  return (
    <div className={styles[`${baseClass}`]}>
      {avatar && <InAppMessageAvatar src={avatar.src} alt={avatar.alt} />}
      {text && <div className={styles[`${baseClass}__text`]}>{text}</div>}
      <div className={styles[`${baseClass}__close`]}>
        <button onClick={onCloseButtonClick}>
          <Icon source={Close} />
        </button>
      </div>
    </div>
  );
};
