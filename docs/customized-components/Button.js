import React from 'react';
import PropTypes from 'prop-types';
import { Button as DSButton } from '@livechat/design-system';

function Button({ name, className, onClick, active, children }) {
  return (
    <DSButton
      className={className}
      onClick={onClick}
      name={name}
      primary={active}
      secondary
      size="compact"
      style={{
        margin: '10px 0 0',
        marginBottom: active ? '5px' : '0'
      }}
    >
      {children}
    </DSButton>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  children: PropTypes.node
};

export default Button;
