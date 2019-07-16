import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
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

  handleClick = (index, event) => {
    this.props.onIndexChange(index, event);
    this.setState({ currentIndex: index });
  };

  render() {
    const { currentIndex } = this.state;
    const { size, fullWidth, children, className, ...restProps } = this.props;

    const mappedChildren = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        size,
        fullWidth,
        primary: false,
        destructive: false,
        onClick: event => {
          this.handleClick(index, event);
          if (child.props.onClick) {
            child.props.onClick(event);
          }
        },
        className: cx({
          [className]: !!className,
          [styles.active]: index === currentIndex
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

ButtonGroup.defaultProps = {
  onIndexChange: () => {}
};

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
