// import * as React from 'react';
// import * as PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
// import styles from './style.scss';

// const cx = classNames.bind(styles);

// export const Tag = React.forwardRef((props, ref) => {
//   const { children, className, ...tagProps } = props;
//   return (
//     <span {...tagProps} ref={ref} className={className}>
//       {children}
//     </span>
//   );
// });

// Tag.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string
// };

import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'tag';

export const Tag = props => {
  const {
    text,
    removable,
    icon,
    size,
    onRemove,
    onClick,
    ...restProps
  } = props;

  const handleRemoveClick = e => {
    e.stopPropagation();
    onRemove(e);
  };

  return (
    <div
      tabIndex={0}
      className={cx(
        styles[`${baseClass}`],
        styles[`${baseClass}--removable-with-icon`]
      )}
      onClick={onClick}
      {...restProps}
    >
      {removable && (
        <button className={styles[`${baseClass}-remove-icon`]}>
          <CloseIcon
            width="14px"
            height="14px"
            tabIndex={0}
            fill="#fff"
            onClick={handleRemoveClick}
          />
        </button>
      )}
      {icon && <span className={styles[`${baseClass}-icon`]}>{icon}</span>}
      <div className={styles[`${baseClass}-content`]}>{text}</div>
    </div>
  );
};

Tag.propTypes = {
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  removable: PropTypes.bool,
  icon: PropTypes.node,
  size: PropTypes.string
};
