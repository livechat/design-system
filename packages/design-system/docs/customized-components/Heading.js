import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

const styles = ({ color, fontFamily, fontSize }) => ({
  heading: {
    margin: '.5em 0',
    color: color.base,
    fontFamily: fontFamily.base,
    fontWeight: 'normal',
    '& a': {
      textDecoration: 'none !important'
    }
  },
  heading1: {
    fontSize: fontSize.h1
  },
  heading2: {
    fontSize: fontSize.h2
  },
  heading3: {
    fontSize: fontSize.h3
  },
  heading4: {
    fontSize: fontSize.h4
  },
  heading5: {
    fontSize: fontSize.h5,
    fontWeight: 'bold'
  },
  heading6: {
    fontSize: fontSize.h6,
    fontStyle: 'italic'
  }
});

function HeadingRenderer({ classes, level, children, ...props }) {
  const Tag = `h${level}`;
  const headingClasses = cx(classes.heading, classes[`heading${level}`]);

  return (
    <Tag {...props} className={headingClasses}>
      {children}
    </Tag>
  );
}

HeadingRenderer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node
};

export default Styled(styles)(HeadingRenderer);
