import * as React from 'react';
import { DesignTokens } from '@livechat/design-system-styles';
import { Text } from '../../../components/Text';

const Tokens = DesignTokens as { [key: string]: string };

export const DesignTokensPallete: React.FC = () => (
  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
    {Object.values(Tokens).map((colorToken) => (
      <li
        style={{ display: 'flex', cursor: 'pointer' }}
        onClick={() => navigator.clipboard.writeText(colorToken)}
      >
        <div
          style={{
            backgroundColor: `var(${colorToken})`,
            border: '1px solid',
            width: '50px',
            height: '50px',
            margin: '5px',
          }}
        />
        <Text>{colorToken}</Text>
      </li>
    ))}
  </ul>
);
