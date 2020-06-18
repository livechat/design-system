import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';

const defaultIndex = -1;
const baseClass = 'btn-group';

class ButtonGroup extends React.Component {
  state = {
    index: defaultIndex
  };

  static getDerivedStateFromProps(props, state) {
    return {
      index:
        typeof props.currentIndex === 'number'
          ? props.currentIndex
          : state.currentIndex
    };
  }

  handleClick = (index, event) => {
    if (this.props.onIndexChange) {
      this.props.onIndexChange(index, event);
    }
    this.setState({ currentIndex: index });
  };

  render() {
    const { index } = this.state;
    const {
      size,
      fullWidth,
      children,
      className,
      onIndexChange,
      currentIndex,
      ...restProps
    } = this.props;

    const mappedChildren = React.Children.map(children, (child, i) =>
      React.cloneElement(child, {
        size,
        fullWidth,
        kind: 'secondary',
        type: 'button',
        onClick: event => {
          this.handleClick(i, event);
          if (child.props.onClick) {
            child.props.onClick(event);
          }
        },
        className: cx({
          [className]: !!className,
          [styles.active]: i === index
        })
      })
    );

    return (
      <div role="group" className={styles[baseClass]} {...restProps}>
        {mappedChildren}
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  /**
   * If `true`, the buttons in group will take up the full width of its container
   */
  fullWidth: PropTypes.bool,

  /**
   * Additionall class name for buttons components
   */
  className: PropTypes.string,

  /**
   * Callback fired when the value of `currentIndex` changes
   */
  onIndexChange: PropTypes.func,

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
