import { Meta } from '@storybook/react-vite';

import { StoryDescriptor } from '../../../../stories/components/StoryDescriptor';
import {
  CheckboxCards,
  RadioCards,
} from '../GallerySelectableCard/GallerySelectableCard.components';

import { GallerySelectableCard } from './GallerySelectableCard';

import '../../SelectableCardStories.css';

export default {
  title: 'Components/SelectableCard/GallerySelectableCard',
  component: GallerySelectableCard,
} as Meta<typeof GallerySelectableCard>;

export const RadioTypeExamples = () => (
  <>
    <StoryDescriptor title="With Icon">
      <RadioCards withIcon withCustomElement={false} />
    </StoryDescriptor>
    <StoryDescriptor title="With Custom element">
      <RadioCards withIcon={false} withCustomElement />
    </StoryDescriptor>
  </>
);

export const CheckboxTypeExamples = () => (
  <>
    <StoryDescriptor title="With Icon">
      <CheckboxCards withIcon withCustomElement={false} />
    </StoryDescriptor>
    <StoryDescriptor title="With Custom element">
      <CheckboxCards withIcon={false} withCustomElement />
    </StoryDescriptor>
  </>
);
