import { Meta } from '@storybook/react';

import { SelectableCard } from './SelectableCard';

import './SelectableCard.stories.css';

export default {
  title: 'Components/SelectableCard',
  component: SelectableCard,
} as Meta<typeof SelectableCard>;

export const Default = () => (
  <SelectableCard selectionType="radio" onClick={() => {}}>
    test
  </SelectableCard>
);
