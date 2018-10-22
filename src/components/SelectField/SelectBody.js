import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SelectItem from './SelectItem';
import styles from './style.scss';

const baseClass = 'select';
const cx = classNames.bind(styles);

const SelectBody = props => {
  const {
    items,
    isOpen,
    onItemClick,
    selectedItem,
    getFocusItemCallback,
    focusedItem
  } = props;

  return (
    <div
      className={cx({
        [`${baseClass}__body`]: true,
        [`${baseClass}__body--visible`]: isOpen
      })}
    >
      <ul>
        {items.map(item => (
          <SelectItem
            key={item.value}
            onClick={() => onItemClick(item.value)}
            isSelected={selectedItem === item.value}
            isFocused={focusedItem === item.value}
            onMouseEnter={
              item.value !== selectedItem
                ? getFocusItemCallback(item.value)
                : null
            }
          >
            {item.name}
          </SelectItem>
        ))}
      </ul>
    </div>
  );
};

SelectBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOpen: PropTypes.bool,
  onItemClick: PropTypes.func,
  getFocusItemCallback: PropTypes.func,
  selectedItem: PropTypes.string,
  focusedItem: PropTypes.string
};

export default SelectBody;
