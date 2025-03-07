import * as React from 'react';

import { Switch } from '../../../Switch';

import styles from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <div className={styles.container}>
      <Switch
        on={checked}
        onChange={(_, value) => onChange(value)}
        ariaLabel={label}
        size="medium"
      />
      <span>{label}</span>
    </div>
  );
};
