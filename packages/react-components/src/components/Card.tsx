import * as React from 'react';
import cx from 'classnames';

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
    <div {...restProps} className={cx('lc-card', className)}>
      {(img || title) && (
        <div className={'lc-card__title'}>
          {img && <img src={img} className={'lc-card__img'} />}
          {title && <div className={'lc-card__text'}>{title}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
