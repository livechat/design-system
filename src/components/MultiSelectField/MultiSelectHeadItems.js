import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'multiselect-head';

const MultiSelectHeadItems = React.forwardRef(
  ({ maxHeight, children }, ref) => (
    <div
      className={styles[`${baseClass}__items`]}
      style={{ maxHeight }}
      ref={ref}
    >
      {children}
    </div>
  )
);

MultiSelectHeadItems.propTypes = {
  maxHeight: PropTypes.number.isRequired
};

export default MultiSelectHeadItems;
