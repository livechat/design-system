import * as React from 'react';

import { Meta } from '@storybook/react';

import { Accordion } from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as Meta<typeof Accordion>;

export const Default = (): React.ReactElement => {
  return (
    <div>
      <Accordion label="Accordion label">Accordion content</Accordion>
    </div>
  );
};
