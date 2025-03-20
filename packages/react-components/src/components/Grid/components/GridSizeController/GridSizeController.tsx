import type { ReactNode } from 'react';

import { GridMaxWidthToken } from 'foundations';

type GridSizeControllerProps = {
  maxWidth: (typeof GridMaxWidthToken)[keyof typeof GridMaxWidthToken];
  children: ReactNode;
};

export const GridSizeController = ({
  children,
  maxWidth,
}: GridSizeControllerProps) => {
  return (
    <div style={{ maxWidth: `var(${maxWidth})`, margin: '0 auto' }}>
      {children}
    </div>
  );
};
