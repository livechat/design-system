import { ReactElement } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { IUploadFileProps } from './types';
import { UploadFile } from './UploadFile';

export default {
  title: 'Components/UploadFile',
  component: UploadFile,
  argTypes: {
    onUpload: { action: 'Files Uploaded' },
    maxFiles: {
      control: {
        type: 'number',
      },
    },
    accept: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof UploadFile>;

const StoryTemplate: StoryFn<IUploadFileProps> = (
  args: IUploadFileProps
): ReactElement => <UploadFile {...args} />;

export const Default = StoryTemplate.bind({});
Default.args = {
  maxFiles: 5,
  accept: 'image/*,application/pdf,.doc,.docx',
  onUpload: action('Files Uploaded'),
};

export const FileTypes = (): ReactElement => (
  <>
    <StoryDescriptor title="Images only">
      <UploadFile
        maxFiles={5}
        accept="image/*"
        onUpload={action('Images Uploaded')}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Documents only">
      <UploadFile
        maxFiles={5}
        accept="application/pdf,.doc,.docx"
        onUpload={action('Documents Uploaded')}
      />
    </StoryDescriptor>
  </>
);

export const FileLimits = (): ReactElement => (
  <>
    <StoryDescriptor title="Limited files">
      <UploadFile
        maxFiles={2}
        accept="image/*"
        onUpload={action('Files Uploaded')}
      />
    </StoryDescriptor>
  </>
);
