import React from 'react';
import cx from 'classnames';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

export function ColorToken(props) {
  const {
    title,
    usage,
    color,
    feedbackText,
    onClick
  } = props;

  return (
    <div className={styles.colors__container}>
      <h4 className={styles.colors__name}>{title}</h4>
      <p className={styles.colors__usage}>{usage}</p>
      <div
        className={cx(styles.colors__box)}
        style={{ backgroundColor: color }}
        data-color={color}
        onClick={onClick}
      >
        <div className={styles.colors__feedback}>{feedbackText}</div>
      </div>
    </div>
  );
}

ColorToken.defaultProps = {
  onClick: () => {}
};

ColorToken.propTypes = {
  title: PropTypes.string.isRequired,
  usage: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  feedbackText: PropTypes.string,
  onClick: PropTypes.func
};
