import * as React from 'react';

import { Heading, HEADING_SIZES } from '../../../../components/Typography';

export const HeadingExamples: React.FC = () => {
  const elements = HEADING_SIZES.map((size) => {
    return (
      <>
        <Heading size={size}>Heading {size.toUpperCase()}</Heading>
        {(size === '2xs' || size === '3xs') && (
          <>
            <Heading size={size} uppercase>
              Heading {size.toUpperCase()} with uppercase
            </Heading>
            <Heading size={size} uppercase bold>
              Heading {size.toUpperCase()} with uppercase and bold
            </Heading>
          </>
        )}
      </>
    );
  });

  return <>{elements}</>;
};
