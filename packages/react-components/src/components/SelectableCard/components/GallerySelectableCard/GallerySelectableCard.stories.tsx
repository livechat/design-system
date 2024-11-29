import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../../../stories/components/StoryDescriptor';
import {
  CheckboxCards,
  RadioCards,
} from '../GallerySelectableCard/GallerySelectableCard.components';

import { GallerySelectableCard } from './GallerySelectableCard';

import '../../SelectableCard.stories.css';

export default {
  title: 'Components/SelectableCard/GallerySelectableCard',
  component: GallerySelectableCard,
} as Meta<typeof GallerySelectableCard>;

export const RadioTypeExamples = () => (
  <>
    <StoryDescriptor title="With Icon">
      <RadioCards withIcon />
    </StoryDescriptor>
    <StoryDescriptor title="With Custom element">
      <RadioCards withIcon withCustomElement />
    </StoryDescriptor>
  </>
);

export const CheckboxTypeExamples = () => (
  <>
    <StoryDescriptor title="With Icon">
      <CheckboxCards withIcon />
    </StoryDescriptor>
    <StoryDescriptor title="With Custom element">
      <CheckboxCards withIcon withCustomElement />
    </StoryDescriptor>
  </>
);
