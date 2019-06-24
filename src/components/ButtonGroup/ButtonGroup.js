import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const defaultIndex = -1;
const baseClass = 'btn-group';

class ButtonGroup extends React.Component {
  state = {
    currentIndex: defaultIndex
  };

  static getDerivedStateFromProps(props, state) {
    return {
      currentIndex:
        typeof props.currentIndex === 'number'
          ? props.currentIndex
          : state.currentIndex
    };
  }

  handleClick = index => () => {
    this.props.onChange(index);
    this.setState({ currentIndex: index });
  };

  render() {
    const { currentIndex } = this.state;
    const { size, fullWidth, children, ...restProps } = this.props;

    const mappedChildren = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        size,
        fullWidth,
        primary: false,
        destructive: false,
        onClick: this.handleClick(index),
        className: index === currentIndex ? styles.active : null
      })
    );

    return (
      <div role="group" className={styles[baseClass]} {...restProps}>
        {mappedChildren}
      </div>
    );
  }
}

ButtonGroup.defaultProps = {
  onChange: () => {}
};

ButtonGroup.propTypes = {
  /**
   * If `true`, the buttons in group will take up the full width of its container
   */
  fullWidth: PropTypes.bool,

  /**
   * Callback fired when the value of `currentIndex` changes
   */
  onChange: PropTypes.func,

  /**
   * The index of button in group which is currently active
   */
  currentIndex: PropTypes.number,

  /**
   * Size of buttons in group
   */
  size: PropTypes.string,

  /**
   * One or more `Button` components
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default ButtonGroup;
