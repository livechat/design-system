import * as React from 'react';

import styles from './DetailsCardInfo.module.scss';

export interface IDetailsCardInfoProps {
  /**
   * Set the label
   */
  label: string;
}

const baseClass = 'details-card-info';

export const DetailsCardInfo: React.FC<
  React.PropsWithChildren<IDetailsCardInfoProps>
> = ({ children, label }) => (
  <div className={styles[baseClass]}>
    <div className={styles[`${baseClass}__label`]}>{label}</div>
    <div className={styles[`${baseClass}__content`]}>{children}</div>
  </div>
);
