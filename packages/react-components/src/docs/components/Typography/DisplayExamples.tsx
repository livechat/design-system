import * as React from 'react';

import { Display, TDisplaySize } from '../../../components/Typography';

const SIZES_MAP = ['sm', 'md', 'max'] as TDisplaySize[];

export const DisplayExamples: React.FC = () => {
  const elements = SIZES_MAP.map((size) => {
    return (
      <>
        <Display size={size}>Display {size.toUpperCase()}</Display>
      </>
    );
  });

  return <>{elements}</>;
};
