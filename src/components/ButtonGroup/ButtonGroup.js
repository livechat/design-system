import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'btn-group';

class ButtonGroup extends React.Component {
  state = {
    currentIndex: this.props.currentIndex || -1
  };

  makeClickHandler = index => event => {
    this.props.onChange(event, index);
    this.setState({ currentIndex: index });
  };

  render() {
    const { size, fullWidth, children, ...restProps } = this.props;
    const currentIndex =
      typeof this.props.currentIndex === 'number'
        ? this.props.currentIndex
        : this.state.currentIndex;

    const mappedChildren = React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        size,
        fullWidth,
        primary: false,
        destructive: false,
        onClick: this.makeClickHandler(index),
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
  children: PropTypes.arrayOf(PropTypes.element)
};

export default ButtonGroup;
