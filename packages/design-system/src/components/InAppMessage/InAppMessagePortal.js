import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

class InAppMessagePortal extends React.Component {
  static defaultProps = {
    parentElementName: 'body'
  };

  constructor(props) {
    super(props);

    this.inAppMessageContainer = document.createElement('div');
    if (this.props.className) {
      this.inAppMessageContainer.className = this.props.className;
    }
  }

  componentDidMount() {
    const element = document.querySelector(this.props.parentElementName);
    if (element) element.appendChild(this.inAppMessageContainer);
  }

  componentWillUnmount() {
    const element = document.querySelector(this.props.parentElementName);
    if (element) element.removeChild(this.inAppMessageContainer);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.inAppMessageContainer
    );
  }
}

InAppMessagePortal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  parentElementName: PropTypes.string
};

export default InAppMessagePortal;
