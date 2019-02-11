import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import PopperContainer from './PopperContainer';

const baseClass = 'dropdown';

class Dropdown extends React.PureComponent {
  render() {
    const {
      children,
      className,
      trigger,
      placement,
      offset,
      isVisible,
      onOpen,
      onClose,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      styles[`${baseClass}`],
      className
    );

    return (
      <PopperContainer
        trigger={trigger}
        isVisible={isVisible}
        onClose={onClose}
        onOpen={onOpen}
        placement={placement}
        offset={offset || '0 4'}
      >
        <div className={mergedClassNames} {...restProps}>
          {children}
        </div>
      </PopperContainer>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  trigger: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
};

export default Dropdown;
