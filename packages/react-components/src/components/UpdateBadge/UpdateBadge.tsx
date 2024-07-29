import * as React from 'react';

import styles from './UpdateBadge.module.scss';

const baseClass = 'update-badge';

export const UpdateBadge: React.FC = () => (
  <span className={styles[baseClass]} />
);
