import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import MultiSelectHeadItem from './MultiSelectHeadItem';

const baseClass = 'multiselect-head';
const cx = classNames.bind(styles);

const MultiSelectHeadItems = React.forwardRef((props, ref) => {
  const {
    isVisible,
    selectedItems,
    placeholder,
    getSelectedItemBody,
    maxHeight
  } = props;
  return (
    <div
      className={cx({
        [`${baseClass}__items`]: true,
        [`${baseClass}__items--visible`]: isVisible
      })}
      style={{ maxHeight }}
      ref={ref}
    >
      {selectedItems ? (
        selectedItems.map(item => (
          <MultiSelectHeadItem
            key={item.key}
            getSelectedItemBody={getSelectedItemBody}
            item={item}
          />
        ))
      ) : (
        <div className={styles[`${baseClass}__item-placeholder`]}>
          {placeholder}
        </div>
      )}
    </div>
  );
});

MultiSelectHeadItems.propTypes = {
  isVisible: PropTypes.bool,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  placeholder: PropTypes.string,
  getSelectedItemBody: PropTypes.func,
  maxHeight: PropTypes.number.isRequired
};

export default MultiSelectHeadItems;
