import { useState } from 'react';

import { IUseOnHover } from './types';

export const useOnHover = (initialState = false): IUseOnHover => {
  const [isHovered, setIsHovered] = useState(initialState);

  const handleMouseOver = (): void => setIsHovered(true);
  const handleMouseOut = (): void => setIsHovered(false);

  return {
    isHovered,
    handleMouseOver,
    handleMouseOut,
  };
};
