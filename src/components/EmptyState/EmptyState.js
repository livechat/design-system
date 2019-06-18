import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'empty-state';

const EmptyState = props => {
  const { className, children, img, title, description, ...restProps } = props;

  const isImageURL = img && typeof img === 'string';
  const isImageComponent = img && !isImageURL;

  return (
    <div className={`${className} ${baseClass}__center`} {...restProps}>
      <div className={`${baseClass}__img-wrapper`}>
        {isImageURL && (
          <img src={img} className={styles[`${baseClass}__img`]} />
        )}
        {isImageComponent && <div className={`${baseClass}__img`}>{img}</div>}
      </div>

      <h1 className={styles[`${baseClass}__header`]}>{title}</h1>
      <p className={styles[`${baseClass}__description`]}>{description}</p>

      {children}
    </div>
  );
};

EmptyState.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node.isRequired
};

export default EmptyState;
