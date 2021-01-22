import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

const styles = ({ color }) => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    cursor: 'pointer',
    margin: '-5px',
    padding: '5px',
    boxSizing: 'border-box'
  },
  logoImg: {
    display: 'block',
    margin: '0 0 10px',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
  titleWrapper: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  docsLink: {
    color: `${color.lightest} !important`,
    cursor: 'pointer !important',
    fontSize: '14px !important'
  },
  text: {
    color: color.base,
    fontSize: '24px',
    lineHeight: '28px',
    fontWeight: '600',
    cursor: 'pointer',
  }
});

export function LogoRenderer({ classes }) {
  return (
    <a href="/" className={classes.wrapper}>
      <img
        src="./logo.svg"
        alt="Design System logo"
        className={classes.logoImg}
      />
      <div className={classes.titleWrapper}>
        <span className={classes.docsLink}>
          LiveChat Docs
        </span>
        <h2 className={classes.text}>Design System</h2>
      </div>
    </a>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node
};

export default Styled(styles)(LogoRenderer);
