import * as React from 'react';

import { Heading, THeadingSize } from '../../../components/Typography';

const SIZES_MAP = ['xl', 'lg', 'md', 'sm', 'xs'] as THeadingSize[];

export const HeadingExamples: React.FC = () => {
  const elements = SIZES_MAP.map((size) => {
    return (
      <>
        <Heading size={size}>Heading {size.toUpperCase()}</Heading>
        {size === 'xs' && (
          <Heading size={size} uppercase>
            Heading {size.toUpperCase()} with uppercase
          </Heading>
        )}
      </>
    );
  });

  return <>{elements}</>;
};
