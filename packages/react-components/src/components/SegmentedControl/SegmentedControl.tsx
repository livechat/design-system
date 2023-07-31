import * as React from 'react';

import cx from 'clsx';

import noop from '../../utils/noop';
import { Button, ButtonProps } from '../Button';

import styles from './SegmentedControl.module.scss';

const baseClass = 'segmented-control';

export type ButtonSize = 'compact' | 'medium' | 'large';

type ButtonElement = {
  id: string;
  label: string;
} & Pick<ButtonProps, 'disabled' | 'loading' | 'icon'>;

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * Array of buttons
   */
  buttons: ButtonElement[];
  /**
   * Set to make buttons fill the container if there is free space
   */
  fullWidth?: boolean;
  /**
   * Specify the buttons size
   */
  size?: ButtonSize;
  /**
   * Id of initially selected button
   */
  initialId?: string;
  /**
   * Id of current selected button
   */
  currentId?: string;
  /**
   * Handler for onClick on specific button
   */
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

  const handleClick = (id: string, event: React.MouseEvent<HTMLElement>) => {
    if (!isControlled) {
      setCurrentStateId(id);
    }

    onButtonClick(id, event);
  };
  const buttonSet = buttons.map(({ id, label, loading, disabled, icon }) => {
    const isPressed = id === currentStateId;
    const activityStyles = isPressed ? styles['btn--active'] : '';
    const loadingStatus = isPressed ? false : loading;

    return (
      <Button
        key={id}
        fullWidth={fullWidth}
        loading={loadingStatus}
        disabled={disabled}
        aria-pressed={isPressed}
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
