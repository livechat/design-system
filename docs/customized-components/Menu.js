import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved
import { InputField, withTheme } from '@livechat/design-system';

const styles = ({ fontFamily }) => ({
  root: {
    fontFamily: fontFamily.base
  },
  search: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignContent: 'center',
    margin: '15px auto',
    padding: '0 16px',
    '& .lc-text-field': {
      marginBottom: 0,
      width: '100%'
    }
  }
});

const themes = [
  {key: 'light', props: {name: 'light', value: 'light'}},
  {key: 'legacy', props: {name: 'legacy', value: 'legacy'}}
];

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

export function Menu({ classes, children, searchTerm, onSearchTermChange, themeName, onThemeChange }) {
  return (
    <div>
      <div className={classes.root}>
        <nav>
          <div style={{ width: '100%', padding: '5px 5px 0', boxSizing: 'border-box' }}>
            <Select
              id='theme-select'
              items={themes}
              className="theme-select"
              onItemSelect={theme => onThemeChange(theme)}
              getItemBody={getItemBody}
              search={false}
              required={true}
              placeholder='Select theme'
              getSelectedItemBody={getSelectedItemBody}
              selected={themeName}
            />
          </div>
          <div className={classes.search}>
            <InputField
              id="menu-filter"
              value={searchTerm}
              placeholder="Filter menu items..."
              aria-label="Filter menu items"
              onChange={event => onSearchTermChange(event.target.value)}
              style={{
                width: '100%'
              }}
            />
          </div>
          {children}
        </nav>
      </div>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired
};

export default Styled(styles)(withTheme(Menu));
