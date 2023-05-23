import * as React from 'react';

export const Simple: React.FC<{ text: string }> = ({ text }) => {
  return <div>{text}</div>;
};
