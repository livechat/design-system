import * as React from 'react';
import * as PropTypes from 'prop-types';
import getMergedClassNames from '../../utils/getMergedClassNames';
import styles from './style.scss';

const baseClass = 'card';

const Card = props => {
  const { img, title, children, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(styles[baseClass]);

  return (
    <div {...restProps} className={mergedClassNames}>
      {(img || title) && (
        <div className={styles[`${baseClass}__title`]}>
          {img && <img src={img} className={styles[`${baseClass}__img`]} />}
          {title && <div className={styles[`${baseClass}__text`]}>{title}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node.isRequired,
  img: PropTypes.string
};

export default Card;
