import React from 'react';

const ToastContext = React.createContext();

export const { Consumer: ToastConsumer } = ToastContext;

export default ToastContext;
