import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

class TooltipPortal extends React.Component {
  static defaultProps = {
    parentElementName: 'body'
  };

  constructor(props) {
    super(props);

    this.tooltipContainer = document.createElement('div');
    if (this.props.className) {
      this.tooltipContainer.className = this.props.className;
    }
  }

  componentDidMount() {
    document
      .querySelector(this.props.parentElementName)
      .appendChild(this.tooltipContainer);
  }

  componentWillUnmount() {
    document
      .querySelector(this.props.parentElementName)
      .removeChild(this.tooltipContainer);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.tooltipContainer);
  }
}

TooltipPortal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  parentElementName: PropTypes.string
};

export default TooltipPortal;
