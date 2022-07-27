import * as React from 'react';

import { Input } from '../../components/Input';

import styles from './SpacingExamples.module.scss';
import { StoryDescriptor } from './StoryDescriptor';

const baseClass = 'input';

export const SpacingExamples = (): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Spacing 0">
        <Input
          className={styles[`${baseClass}--spacing-0`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 0.5">
        <Input
          className={styles[`${baseClass}--spacing-05`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 1">
        <Input
          className={styles[`${baseClass}--spacing-1`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 2">
        <Input
          className={styles[`${baseClass}--spacing-2`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 3">
        <Input
          className={styles[`${baseClass}--spacing-3`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 4">
        <Input
          className={styles[`${baseClass}--spacing-4`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 5">
        <Input
          className={styles[`${baseClass}--spacing-5`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 6">
        <Input
          className={styles[`${baseClass}--spacing-6`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 8">
        <Input
          className={styles[`${baseClass}--spacing-8`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 12">
        <Input
          className={styles[`${baseClass}--spacing-12`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 16">
        <Input
          className={styles[`${baseClass}--spacing-16`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 18">
        <Input
          className={styles[`${baseClass}--spacing-18`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 20">
        <Input
          className={styles[`${baseClass}--spacing-20`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Spacing 24">
        <Input
          className={styles[`${baseClass}--spacing-24`]}
          placeholder="Input with spacing"
        />
      </StoryDescriptor>
    </div>
  );
};
