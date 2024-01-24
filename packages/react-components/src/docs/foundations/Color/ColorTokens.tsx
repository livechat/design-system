import * as React from 'react';

import { Text } from '../../../components/Typography';
import { DesignToken } from '../../../themes/design-token';

interface TokensGroup {
  background: string[];
  surface: string[];
  content: string[];
  border: string[];
  action: string[];
  color: string[];
  decor: string[];
  products: string[];
  illustrations: string[];
  tag: string[];
  btn: string[];
  picker: string[];
  popover: string[];
}

type TokenGroupName =
  | 'background'
  | 'surface'
  | 'content'
  | 'border'
  | 'action'
  | 'color'
  | 'decor'
  | 'products'
  | 'illustrations'
  | 'btn'
  | 'picker'
  | 'popover'
  | 'tag';

const Tokens: TokensGroup = Object.values(
  DesignToken as { [key: string]: string }
).reduce(
  (acc: TokensGroup, value) => {
    const groupName = value.split('-').filter(Boolean)[0] as TokenGroupName;
    acc[groupName]?.push(value);

    return acc;
  },
  {
    background: [],
    surface: [],
    content: [],
    border: [],
    action: [],
    color: [],
    decor: [],
    products: [],
    illustrations: [],
    tag: [],
    btn: [],
    picker: [],
    popover: [],
  }
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
  action: {
    heading: 'Action colors',
    content:
      'All colors that drive attention in the UI - it can be either action, warning, negative or positive',
  },
  color: {
    heading: 'Accent colors',
    content:
      'All colors that drive attention in the UI - it can be either action, warning, negative or positive',
  },
  decor: {
    heading: 'Decor',
    content:
      'Those colors can be used for specific elements of the UI, they were purposely separated from all other tokens, as they are used only for decorative means. Those colors are shared between all three themes — Legacy, Light & Dark. This palette is not yet fully supported in dark mode.',
  },
  products: {
    heading: 'Products',
    content: '',
  },
  illustrations: {
    heading: 'Illustrations',
    content: '',
  },
  tag: {
    heading: 'Tag',
    content: '',
  },
  btn: {
    heading: 'Button',
    content: '',
  },
  picker: {
    heading: 'Picker',
    content: '',
  },
  popover: {
    heading: 'Popover',
    content: '',
  },
};

export const ColorTokensPallete: React.FC = () => (
  <React.Fragment>
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
              onClick={() => {
                void navigator.clipboard.writeText(colorToken);
              }}
            >
              <div
                style={{
                  background: `var(${colorToken})`,
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
  </React.Fragment>
);
