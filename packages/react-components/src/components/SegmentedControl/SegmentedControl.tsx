import * as React from 'react';
import cx from 'clsx';

import { Button, ButtonProps } from '../Button';

import styles from './SegmentedControl.module.scss';

import noop from '../../utils/noop';

const baseClass = 'segmented-control';

export type ButtonSize = 'compact' | 'medium' | 'large';

type ButtonElement = {
  id: string;
  label: string;
} & Pick<ButtonProps, 'disabled' | 'loading' | 'icon'>;

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  buttons: ButtonElement[];
  fullWidth?: boolean;
  size?: ButtonSize;
  initialId?: string;
  currentId?: string;
  onButtonClick?: (id: string, event: React.MouseEvent<HTMLElement>) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  size = 'medium',
  buttons,
  className,
  initialId,
  currentId,
  fullWidth = false,
  onButtonClick = noop,
}) => {
  const mergedClassName = cx(styles[baseClass], className);
  const [currentStateId, setCurrentStateId] = React.useState(() => initialId);

  const isControlled = typeof currentId === 'string';

  React.useEffect(() => {
    isControlled && setCurrentStateId(currentId);
  }, [currentId]);

  const handleClick = (id: string, event: any) => {
    if (!isControlled) {
      setCurrentStateId(id);
    }

    onButtonClick(id, event);
  };
  const buttonSet = buttons.map(({ id, label, loading, disabled, icon }) => {
    const activityStyles = id === currentStateId ? styles['btn--active'] : '';
    const loadingStatus = id === currentStateId ? false : loading;

    return (
      <Button
        key={id}
        fullWidth={fullWidth}
        loading={loadingStatus}
        disabled={disabled}
        kind="secondary"
        icon={icon}
        className={cx(styles['btn'], styles[`btn--${size}`], activityStyles)}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          handleClick(id, event);
        }}
      >
        {label}
      </Button>
    );
  });

  return (
    <div role="group" className={mergedClassName}>
      {buttonSet}
    </div>
  );
};
