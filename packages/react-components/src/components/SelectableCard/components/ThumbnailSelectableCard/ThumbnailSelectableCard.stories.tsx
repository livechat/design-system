import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../../../stories/components/StoryDescriptor';

import { ThumbnailSelectableCard } from './ThumbnailSelectableCard';
import {
  CheckboxCards,
  RadioCards,
} from './ThumbnailSelectableCard.components';

import '../../SelectableCardStories.css';

export default {
  title: 'Components/SelectableCard/ThumbnailSelectableCard',
  component: ThumbnailSelectableCard,
} as Meta<typeof ThumbnailSelectableCard>;

export const RadioTypeExamples = () => (
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
      <RadioCards withDescription withCustomElement />
    </StoryDescriptor>
  </>
);

export const CheckboxTypeExamples = () => (
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
      <CheckboxCards withDescription withCustomElement />
    </StoryDescriptor>
  </>
);
