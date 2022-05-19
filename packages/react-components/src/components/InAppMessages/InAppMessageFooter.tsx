import * as React from 'react';
import { Button } from '../Button';

import styles from './InAppMessageFooter.module.scss';

const baseClass = 'in-app-message-footer';

export interface InAppMessageFooterProps {
  primary: {
    children: string;
    onClick: () => void;
  };
  secondary?: {
    children: string;
    onClick: () => void;
  };
}

export const InAppMessageFooter: React.FC<InAppMessageFooterProps> = ({
  primary,
  secondary,
}) => {
  return (
    <div className={styles[baseClass]}>
      {secondary && (
        <Button fullWidth kind="secondary" onClick={secondary.onClick}>
          {secondary.children}
        </Button>
      )}
      <Button fullWidth kind="primary" onClick={primary.onClick}>
        {primary.children}
      </Button>
    </div>
  );
};
