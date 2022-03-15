import * as React from 'react';
import { DesignTokens } from '@livechat/design-system-styles';
import { Text } from '../../../components/Text';

interface TokensGroup {
  background: string[];
  surface: string[];
  content: string[];
  border: string[];
  color: string[];
  decor: string[];
}

type TokenGroupName = 'background' | 'surface' | 'content' | 'border' | 'color' | 'decor';

const Tokens: TokensGroup = Object.values(
  DesignTokens as { [key: string]: string }
).reduce(
  (acc: TokensGroup, value) => {
    const groupName = value.split('-').filter(Boolean)[0] as TokenGroupName;
    acc[groupName].push(value);

    return acc;
  },
  { background: [], surface: [], content: [], border: [], color: [], decor: [] }
);

const CONTENT = {
  background: {
    heading: 'Background',
    content:
      'Basic layer of the UI – this represents the canvas (for developers) or frame (for designers)',
  },
  surface: {
    heading: 'Surface',
    content:
      'Background of components, like cards, input fields, tooltips, ect.',
  },
  content: {
    heading: 'Content',
    content: 'Fonts & icons (mostly)',
  },
  border: {
    heading: 'Border',
    content: 'Style for components borders',
  },
  color: {
    heading: 'Accent colors',
    content:
      'All colors that drive attention in the UI - it can be either action, warning, negative or positive',
  },
  decor: {
    heading: 'Decor',
    content: 'Those colors can be used for specific elements of the UI, they were purposely separated from all other tokens, as they are used only for decorative means. Those colors are shared between all three themes — Legacy, Light & Dark. This palette is not yet fully supported in dark mode.'
  }
};

export const ColorTokensPallete: React.FC = () => (
  <div style={{ color: 'var(--content-default)' }}>
    {Object.entries(CONTENT).map(([section, { heading, content }]) => (
      <React.Fragment key={section}>
        <h2>{heading}</h2>
        <Text as="p">{content}</Text>
        <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {Tokens[section as TokenGroupName].map((colorToken: string) => (
            <li
              key={colorToken}
              style={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
              }}
              onClick={() => navigator.clipboard.writeText(colorToken)}
            >
              <div
                style={{
                  backgroundColor: `var(${colorToken})`,
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  width: '50px',
                  height: '50px',
                  margin: '5px',
                }}
              />
              <Text>{colorToken}</Text>
            </li>
          ))}
        </ul>
      </React.Fragment>
    ))}
  </div>
);
