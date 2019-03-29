import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import getMergedClassNames from '../../utils/getMergedClassNames';
import styles from './style.scss';

const baseClass = 'card';

const Card = ({ img, title, children }) => {
  const hasComponents = React.Children.count(children) >= 1;
  const mergedClassNames = getMergedClassNames(styles[baseClass]);
  const titleClass = classNames({
    [`${baseClass}__title`]: hasComponents,
    [`${baseClass}__empty`]: !hasComponents
  });
  return (
    <div className={mergedClassNames}>
      <div className={styles[titleClass]}>
        {img && <img src={img} className={styles[`${baseClass}__img`]} />}
        <div className={styles[`${baseClass}__text`]}>{title}</div>
      </div>
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  img: PropTypes.string
};

Card.defaultProps = {};

export default Card;
