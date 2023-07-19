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
          heading="Warning!"
          icon={<AlertCircleIcon height={54} width={54} fill="#424d57" />}
        >
          A dark mode is coming to LiveChat and we’ve launched a new system of <a href="https://design.livechat.com/?path=/story/foundations-color-tokens--page" target="_blank">Color Tokens</a> in 
          the <a href="https://github.com/livechat/design-system/tree/main" target="_blank">main branch</a>. All new components now have color tokens applied. 
          To support a dark or light theme, apps must use these tokens and components from new DS version. 
          This version of the Design System becomes legacy and is no longer supported. Please use <a href="https://github.com/livechat/design-system/tree/main" target="_blank">main branch</a>
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

export default Styled(styles)(Menu);

