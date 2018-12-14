import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

class InAppPortal extends React.Component {
  static defaultProps = {
    parentElementName: 'body'
  };

  constructor(props) {
    super(props);

    this.inAppContainer = document.createElement('div');
    if (this.props.className) {
      this.inAppContainer.className = this.props.className;
    }
  }

  componentDidMount() {
    const element = document.querySelector(this.props.parentElementName);
    if (element) element.appendChild(this.inAppContainer);
  }

  componentWillUnmount() {
    const element = document.querySelector(this.props.parentElementName);
    if (element) element.removeChild(this.inAppContainer);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.inAppContainer);
  }
}

InAppPortal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  parentElementName: PropTypes.string
};

export default InAppPortal;
