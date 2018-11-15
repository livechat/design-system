import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

class ModalPortal extends React.Component {
  static defaultProps = {
    parentElementName: 'body'
  };

  constructor(props) {
    super(props);

    this.modalContainer = document.createElement('div');
    if (this.props.className) {
      this.modalContainer.className = this.props.className;
    }
  }

  componentDidMount() {
    document
      .querySelector(this.props.parentElementName)
      .appendChild(this.modalContainer);
  }

  componentWillUnmount() {
    document
      .querySelector(this.props.parentElementName)
      .removeChild(this.modalContainer);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.modalContainer);
  }
}

ModalPortal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  parentElementName: PropTypes.string
};

export default ModalPortal;
