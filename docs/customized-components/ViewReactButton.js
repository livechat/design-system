import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton'; // eslint-disable-line import/no-unresolved

const ViewReactButton = props => <TabButton {...props}>View React</TabButton>;

ViewReactButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default ViewReactButton;
