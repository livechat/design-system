import { FC } from 'react';

import { ComponentCoreProps } from '../../../../../utils/types';

import styles from './InteractiveGrid.module.scss';

interface IGridComponentProps extends ComponentCoreProps {}

const gridWrapperBaseClass = `grid-wrapper`;
export const GridWrapper: FC<IGridComponentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${styles[gridWrapperBaseClass]} ${className || ''}`}>
      {children}
    </div>
  );
};

const gridRowBaseClass = 'grid-row';
export const GridRow: FC<IGridComponentProps> = ({ children, className }) => {
  return (
    <div className={`${styles[gridRowBaseClass]} ${className || ''}`}>
      {children}
    </div>
  );
};

const gridColBaseClass = 'grid-col';
export const GridCol: FC<IGridComponentProps> = ({ children, className }) => {
  return (
    <div className={`${styles[gridColBaseClass]} ${className || ''}`}>
      {children}
    </div>
  );
};
