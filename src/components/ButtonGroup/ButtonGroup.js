import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'btn-group';
const cx = classNames.bind(styles);

const ButtonGroup = props => {
  const { className, segment, currentIndex, onClick, children } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--segment`]: segment
    }),
    className
  );

  const mappedChildren = segment
    ? React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: event => onClick && onClick(index, event),
          selected: index === currentIndex
        })
      )
    : children;

  return <div className={mergedClassNames}>{mappedChildren}</div>;
};

ButtonGroup.propTypes = {
  segment: PropTypes.bool,
  currentIndex: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default ButtonGroup;
