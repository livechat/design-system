import * as React from 'react';

import { Heading, HEADING_SIZES } from '../../../../components/Typography';

export const HeadingExamples: React.FC = () => {
  const elements = HEADING_SIZES.map((size) => {
    return (
      <>
        <Heading size={size}>Heading {size.toUpperCase()}</Heading>
        {['2xs', '3xs'].includes(size) && (
          <React.Fragment key={size}>
            <Heading size={size} uppercase>
              Heading {size.toUpperCase()} with uppercase
            </Heading>
            <Heading size={size} uppercase bold>
              Heading {size.toUpperCase()} with uppercase and bold
            </Heading>
          </React.Fragment>
        )}
      </>
    );
  });

  return <>{elements}</>;
};
