import * as React from 'react';

import { Display, TDisplaySize } from '../../../../components/Typography';

const SIZES_MAP = ['sm', 'md', 'lg', 'max'] as TDisplaySize[];

export const DisplayExamples: React.FC = () => {
  const elements = SIZES_MAP.map((size) => {
    return (
      <>
        <Display bold={false} size={size}>
          Display {size.toUpperCase()}
        </Display>
        <Display bold size={size}>
          Display {size.toUpperCase()} BOLD
        </Display>
        <br />
      </>
    );
  });

  return <>{elements}</>;
};
