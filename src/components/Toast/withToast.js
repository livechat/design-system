import React from 'react';
import ToastContext from './ToastContext';

const withToast = Component =>
  function ToastedComponent(props) {
    return (
      <ToastContext.Consumer>
        {toast => <Component {...props} toast={toast} />}
      </ToastContext.Consumer>
    );
  };

export default withToast;
