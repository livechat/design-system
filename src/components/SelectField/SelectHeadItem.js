import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const baseClass = 'select-head__item';
const cx = classNames.bind(styles);

const SelectHeadItem = props => {
  const {
    isVisible,
    selectedItem,
    placeholder,
    getSelectedItemBody,
    selectedItemRenderer
  } = props;
  return (
    <div
      className={cx({
        [`${baseClass}`]: true,
        [`${baseClass}--visible`]: isVisible
      })}
    >
      {selectedItem ? (
        <div className={styles[`${baseClass}-content`]}>
          {selectedItemRenderer
            ? selectedItemRenderer(selectedItem.props)
            : getSelectedItemBody(selectedItem.props)}
        </div>
      ) : (
        <div className={styles[`${baseClass}-placeholder`]}>{placeholder}</div>
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
  getSelectedItemBody: PropTypes.func,
  selectedItemRenderer: PropTypes.func
};

export default SelectHeadItem;
