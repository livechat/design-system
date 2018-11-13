import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const baseClass = 'select-head';
const cx = classNames.bind(styles);

const SelectHeadItem = props => {
  const { isVisible, selectedItem, placeholder, getSelectedItemBody } = props;
  return (
    <div
      className={cx({
        [`${baseClass}__item`]: true,
        [`${baseClass}__item--visible`]: isVisible
      })}
    >
      {selectedItem ? (
        getSelectedItemBody(selectedItem.props)
      ) : (
        <div className={styles[`${baseClass}__item-placeholder`]}>
          {placeholder}
        </div>
      )}
    </div>
  );
};

SelectHeadItem.propTypes = {
  isVisible: PropTypes.bool,
  selectedItem: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.object
  }),
  placeholder: PropTypes.string,
  getSelectedItemBody: PropTypes.func
};

export default SelectHeadItem;
