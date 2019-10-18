import * as React from 'react';
import * as PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../packages/design-system/src/index';

class ComponentHtmlMarkup extends React.Component {
  state = {
    isCodeVisible: false
  };

  componentDidUpdate(_prevProps, prevState) {
    const { isCodeVisible } = this.state;
    if (
      isCodeVisible &&
      window.PR &&
      prevState.isCodeVisible !== isCodeVisible
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
    const { isCodeVisible } = this.state;
    return (
      <React.Fragment>
        <Button
          onClick={this.toggleCodeVisibility}
          primary={isCodeVisible}
          size="compact"
          secondary
          style={{
            marginBottom: isCodeVisible ? '5px' : '0'
          }}
        >
          View HTML
        </Button>
        {isCodeVisible && (
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
