import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'multiselect-head__item';

const MultiSelectHeadItem = props => {
  const { item, getSelectedItemBody } = props;
  return (
    <div className={styles[`${baseClass}`]} data-testid="multiselect-head-item">
      <CloseIcon
        width="14px"
        height="14px"
        fill="#fff"
        data-testid="multiselect-remove-icon"
        onClick={e => props.onRemove(e, item.key)}
        className={styles[`${baseClass}-remove-icon`]}
      />
      <div className={styles[`${baseClass}-content`]}>
        {getSelectedItemBody(item.props)}
      </div>
    </div>
  );
};

MultiSelectHeadItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.object
  }),
  getSelectedItemBody: PropTypes.func,
  onRemove: PropTypes.func
};

export default MultiSelectHeadItem;
