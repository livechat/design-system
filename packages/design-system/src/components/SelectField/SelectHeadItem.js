import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const baseClass = 'select-head__item';
const cx = classNames.bind(styles);

const SelectHeadItem = props => {
  const { isVisible, selectedItem, placeholder, getSelectedItemBody, headTestId } = props;
  return (
    <div
      className={cx({
        [`${baseClass}`]: true,
        [`${baseClass}--visible`]: isVisible
      })}
      data-testid={headTestId}
    >
      {selectedItem ? (
        <div className={styles[`${baseClass}-content`]}>
          {getSelectedItemBody(selectedItem.props)}
        </div>
      ) : (
        <div className={styles[`${baseClass}-placeholder`]}>{placeholder}</div>
      )}
    </div>
  );
};

SelectHeadItem.propTypes = {
  headTestId: PropTypes.string,
  isVisible: PropTypes.bool,
  selectedItem: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.object
  }),
  placeholder: PropTypes.string,
  getSelectedItemBody: PropTypes.func
};

export default SelectHeadItem;
