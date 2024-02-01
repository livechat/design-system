import * as React from 'react';

import { Text, TTextSize } from '../../../components/Typography';

const SIZES_MAP = ['md', 'sm', 'xs'] as TTextSize[];

export const TextExamples: React.FC = () => {
  const elements = SIZES_MAP.map((size) => {
    return (
      <div>
        <Text size={size}>Paragraph {size.toUpperCase()}</Text>
        <Text size={size} bold>
          Paragraph {size.toUpperCase()} with bold
        </Text>
        <Text size={size} underline>
          Paragraph {size.toUpperCase()} with underline
        </Text>
        <Text size={size} strike>
          Paragraph {size.toUpperCase()} with strikethrough
        </Text>
        <Text size={size} uppercase>
          Paragraph {size.toUpperCase()} with uppercase
        </Text>
      </div>
    );
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {elements}
    </div>
  );
};
