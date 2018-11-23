import * as React from 'react';
import * as PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import cx from 'classnames';

class ComponentHtmlMarkup extends React.Component {
  state = {
    isCodeVisible: false
  };

  componentDidUpdate(_prevProps, prevState) {
    const { isCodeVisible } = this.state;
    if (
      isCodeVisible &&
      prevState.isCodeVisible !== isCodeVisible &&
      window.PR
    ) {
      window.PR.prettyPrint();
    }
  }

  getPrettifiedMarkup = component => {
    const htmlString = renderToStaticMarkup(component);
    if (!window.prettierPlugins || !window.prettier) {
      return htmlString;
    }
    const prettifiedMarkup = window.prettier
      .format(htmlString, {
        parser: 'babylon',
        plugins: window.prettierPlugins
      })
      .trim();
    if (prettifiedMarkup[prettifiedMarkup.length - 1] === ';') {
      return prettifiedMarkup.slice(0, -1);
    }
    return prettifiedMarkup;
  };

  toggleCodeVisibility = () => {
    this.setState(({ isCodeVisible }) => ({
      isCodeVisible: !isCodeVisible
    }));
  };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className={cx({
            'view-html-btn': true,
            'view-html-btn--active': this.state.isCodeVisible
          })}
          onClick={this.toggleCodeVisibility}
        >
          View html code
        </button>
        {this.state.isCodeVisible && (
          <pre className="prettyprint lang-html">
            {this.getPrettifiedMarkup(this.props.children)}
          </pre>
        )}
      </React.Fragment>
    );
  }
}

ComponentHtmlMarkup.propTypes = {
  children: PropTypes.node
};

export default ComponentHtmlMarkup;
