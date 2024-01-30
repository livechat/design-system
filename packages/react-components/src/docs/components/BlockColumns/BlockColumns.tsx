import * as React from 'react';

import { CheckCircle, CloseCircle } from '@livechat/design-system-icons';

import { Icon } from '../../../components/Icon';
import { Heading } from '../../../components/Typography';

import styles from './BlockColumns.module.scss';

interface IDosAndDontsProps {
  label?: string;
  isNegative?: boolean;
}

const baseClass = 'block-columns';

export const BlockColumnsContainer: React.FC = ({ children }) => (
  <div className={styles['block-columns-container']}>{children}</div>
);

export const BlockColumns: React.FC<
  React.PropsWithChildren<IDosAndDontsProps>
> = ({ label, isNegative, children }) => (
  <div className={styles[baseClass]}>
    {label && (
      <div className={styles[`${baseClass}__label-container`]}>
        <div className={styles[`${baseClass}__label-container__icon`]}>
          <Icon
            source={isNegative ? CloseCircle : CheckCircle}
            kind={isNegative ? 'negative' : 'positive'}
            size="large"
          />
        </div>
        <Heading className={styles[`${baseClass}__label-container__label`]}>
          {label}
        </Heading>
      </div>
    )}
    {children}
  </div>
);
