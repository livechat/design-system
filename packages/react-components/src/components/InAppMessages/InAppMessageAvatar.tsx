import * as React from 'react';

import styles from './InAppMessageAvatar.module.scss';

const baseClass = 'in-app-message-avatar';

export interface InAppMessageAvatarProps {
  src: string;
  alt: string;
}

export const InAppMessageAvatar: React.FC<InAppMessageAvatarProps> = ({
  src,
  alt,
}) => <img className={styles[`${baseClass}`]} src={src} alt={alt} />;
