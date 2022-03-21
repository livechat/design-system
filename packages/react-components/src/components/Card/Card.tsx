import * as React from 'react';
import cx from 'clsx';
import { Text, Heading } from '../Typography';
import styles from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  img?: string;
}

export const Card: React.FC<CardProps> = ({
  img,
  title,
  children,
  className,
  ...restProps
}) => {
  return (
    <Text
      as="div"
      size="md"
      className={cx(styles['card'], className)}
      {...restProps}
    >
      {(img || title) && (
        <Heading as="div" size="sm" className={styles['card__title']}>
          {img && <img src={img} className={styles['card__img']} />}
          {title && <div className={styles['card__text']}>{title}</div>}
        </Heading>
      )}
      {children}
    </Text>
  );
};
