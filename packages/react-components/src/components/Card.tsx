import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';
import { Heading } from './Heading';

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  img?: string;
}

export const Card: React.FC<ICardProps> = ({
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
      className={cx('lc-card', className)}
      {...restProps}
    >
      {(img || title) && (
        <Heading as="div" size="sm" className={'lc-card__title'}>
          {img && <img src={img} className={'lc-card__img'} />}
          {title && <div className={'lc-card__text'}>{title}</div>}
        </Heading>
      )}
      {children}
    </Text>
  );
};
