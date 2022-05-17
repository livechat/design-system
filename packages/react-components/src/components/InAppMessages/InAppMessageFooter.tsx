import * as React from 'react';
import { Button } from '../Button';

import styles from './InAppMessageFooter.module.scss';

const baseClass = 'in-app-message-footer';

export interface InAppMessageFooterProps {
  cta: {
    children: string;
    onClick: () => void;
  };
  remind?: {
    children: string;
    onClick: () => void;
  };
}

export const InAppMessageFooter: React.FC<InAppMessageFooterProps> = ({
  cta,
  remind,
}) => {
  return (
    <div className={styles[baseClass]}>
      {remind && (
        <Button fullWidth kind="secondary" onClick={remind.onClick}>
          {remind.children}
        </Button>
      )}
      <Button fullWidth kind="primary" onClick={cta.onClick}>
        {cta.children}
      </Button>
    </div>
  );
};
