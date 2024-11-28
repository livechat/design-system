import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { SelectableCard } from './SelectableCard';
import { CheckboxCards, RadioCards } from './SelectableCard.stories.components';

import './SelectableCard.stories.css';

export default {
  title: 'Components/SelectableCard',
  component: SelectableCard,
} as Meta<typeof SelectableCard>;

export const ThumbnailSelectableCardAsRadioType = () => (
  <>
    <StoryDescriptor title="With Label">
      <RadioCards />
    </StoryDescriptor>
    <StoryDescriptor title="With Label, Description">
      <RadioCards withDescription />
    </StoryDescriptor>
    <StoryDescriptor title="With Label, Description and Icon">
      <RadioCards withDescription withIcon />
    </StoryDescriptor>
    <StoryDescriptor title="With Custom element">
      <RadioCards withDescription withIcon withCustomElement />
    </StoryDescriptor>
  </>
);

export const ThumbnailSelectableCardAsCheckboxType = () => (
  <>
    <StoryDescriptor title="With Label">
      <CheckboxCards />
    </StoryDescriptor>
    <StoryDescriptor title="With Label, Description">
      <CheckboxCards withDescription />
    </StoryDescriptor>
    <StoryDescriptor title="With Label, Description and Icon">
      <CheckboxCards withDescription withIcon />
    </StoryDescriptor>
    <StoryDescriptor title="With Custom element">
      <CheckboxCards withDescription withIcon withCustomElement />
    </StoryDescriptor>
  </>
);
