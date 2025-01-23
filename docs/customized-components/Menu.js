import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved
import { InputField, ActionModal } from '@livechat/design-system';

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

export function Menu({ classes, children, searchTerm, onSearchTermChange }) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div>
      {isVisible && (
      <ActionModal
        onClose={() => setIsVisible(false)}
        heading="Legacy Version"
        icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
      >
        This Design System version is outdated. Please use the{' '}
        <a href="https://design.livechat.com" target="_blank">
          design.livechat.com
        </a>{' '}
        for updated resources.
      </ActionModal>
      )}
      <div className={classes.root}>
        <nav>
          <div className={classes.search}>
            <InputField
              id="menu-filter"
              value={searchTerm}
              placeholder="Filter menu items..."
              aria-label="Filter menu items"
              onChange={(event) => onSearchTermChange(event.target.value)}
              style={{
                width: '100%',
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
  onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(Menu);
