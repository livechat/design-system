import * as React from 'react';

import styles from './InAppMessageImage.module.scss';

const baseClass = 'in-app-message-image';

export interface InAppMessageImageProps {
  src: string;
  alt?: string;
}

export const InAppMessageImage: React.FC<InAppMessageImageProps> = ({
  src,
  alt,
}) => {
  return (
    <div className={styles[`${baseClass}`]}>
      <img alt={alt || 'InAppMessage Image'} src={src} />
    </div>
  );
};
