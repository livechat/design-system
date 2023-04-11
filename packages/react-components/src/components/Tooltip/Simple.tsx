import { FC } from 'react';

export const Simple: FC<{ text: string }> = ({ text }) => {
  return <div>{text}</div>;
};
