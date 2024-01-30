import * as React from 'react';

import { Input } from '../../../components/Input';
import { StoryDescriptor } from '../StoryDescriptor';

import styles from './RadiusExamples.module.scss';

const baseClass = 'input';

export const RadiusExamples = (): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Radius 0">
        <Input
          className={styles[`${baseClass}--radius-0`]}
          placeholder="Input with radius"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Radius 1">
        <Input
          className={styles[`${baseClass}--radius-1`]}
          placeholder="Input with radius"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Radius 2">
        <Input
          className={styles[`${baseClass}--radius-2`]}
          placeholder="Input with radius"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Radius 3">
        <Input
          className={styles[`${baseClass}--radius-3`]}
          placeholder="Input with radius"
        />
      </StoryDescriptor>
    </div>
  );
};
