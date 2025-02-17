import * as React from 'react';

import * as styles from './styles';

export interface IDetailsCardInfoProps {
  /**
   * Set the label
   */
  label: string;
}

export const DetailsCardInfo: React.FC<
  React.PropsWithChildren<IDetailsCardInfoProps>
> = ({ children, label }) => (
  <div className={styles.baseStyles}>
    <div className={styles.label}>{label}</div>
    <div className={styles.content}>{children}</div>
  </div>
);
