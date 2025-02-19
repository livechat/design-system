import * as React from 'react';

import { Meta } from '@storybook/react';

import {
  GallerySelectableCard,
  GridCol,
  GridRow,
  GridWrapper,
  InteractiveSelectableCard,
  ThumbnailSelectableCard,
} from './components';
import { SelectableCard } from './SelectableCard';

import './SelectableCard.css';

export default {
  title: 'Components/SelectableCard',
  component: SelectableCard,
  subcomponents: {
    ThumbnailSelectableCard,
    GallerySelectableCard,
    InteractiveSelectableCard,
    GridWrapper,
    GridCol,
    GridRow,
  },
} as Meta<typeof SelectableCard>;

export const Default = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <SelectableCard
        selectionType="radio"
        isSelected={selectedIndex === 1}
        onClick={() => setSelectedIndex(1)}
      >
        Default selectable card 1
      </SelectableCard>
      <SelectableCard
        selectionType="radio"
        isSelected={selectedIndex === 2}
        onClick={() => setSelectedIndex(2)}
      >
        Default selectable card 2
      </SelectableCard>
      <SelectableCard
        selectionType="radio"
        isSelected={selectedIndex === 3}
        onClick={() => setSelectedIndex(3)}
      >
        Default selectable card 3
      </SelectableCard>
    </div>
  );
};
