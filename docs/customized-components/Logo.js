import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

const styles = ({ color }) => ({
  logoWrapper: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  logoImg: {
    display: 'block',
    margin: '0 0 10px',
    width: '36px',
    height: '36px'
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
    fontWeight: '600'
  }
});

export function LogoRenderer({ classes }) {
  return (
    <div className={classes.logoWrapper}>
      <img
        src="./logo.svg"
        alt="Design System logo"
        className={classes.logoImg}
      />
      <div className={classes.titleWrapper}>
        <a href="/docs" className={classes.docsLink}>
          LiveChat Docs
        </a>
        <h2 className={classes.text}>Design System</h2>
      </div>
    </div>
  );
}

LogoRenderer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node
};

export default Styled(styles)(LogoRenderer);
