import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const baseClass = 'multiselect-head';
const cx = classNames.bind(styles);

const MultiSelectHeadItem = props => {
  const { item, getSelectedItemBody } = props;
  return (
    <div
      className={cx({
        [`${baseClass}__item`]: true
      })}
    >
      {getSelectedItemBody(item.props)}
    </div>
  );
};

MultiSelectHeadItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.object
  }),
  getSelectedItemBody: PropTypes.func
};

export default MultiSelectHeadItem;
