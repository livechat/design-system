import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import noop from '../../utils/noop';
import { PdfIcon } from '../../utils/PdfIcon';
import { Button } from '../Button';

import {
  FileUploadProgress as FileUploadProgressComponent,
  FileUploadProgressProps,
} from './FileUploadProgress';

export default {
  title: 'Components/Progress/FileUploadProgress',
  component: FileUploadProgressComponent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: `TBD`,
  },
  argTypes: {
    icon: {
      control: false,
    },
    onCloseButtonClick: { action: 'changed' },
    onRetryButtonClick: { action: 'changed' },
  },
} as Meta<typeof FileUploadProgressComponent>;

const StoryTemplate: StoryFn<FileUploadProgressProps> = (
  args: FileUploadProgressProps
) => {
  return (
    <div>
      <FileUploadProgressComponent {...args} />
    </div>
  );
};

export const FileUploadProgress = StoryTemplate.bind({});
FileUploadProgress.args = {
  title: 'file.pdf',
  progressValue: 30,
};

export const FileUploadProgressWithIcon = StoryTemplate.bind({});
FileUploadProgressWithIcon.args = {
  title: 'file.pdf',
  icon: <PdfIcon />,
  progressValue: 50,
};

export const FileUploadProgressStates: React.FC = () => {
  const [status, setStatus] = React.useState<'normal' | 'success' | 'error'>(
    'normal'
  );
  const [actionsVisibility, setActionsVisibility] = React.useState<
    'hidden' | 'hover' | 'visible'
  >('hidden');

  return (
    <div>
      <div className="story-spacer" style={{ marginBottom: 30 }}>
        <Button onClick={() => setStatus('normal')}>Default</Button>
        <Button kind="primary" onClick={() => setStatus('success')}>
          Success
        </Button>
        <Button kind="destructive" onClick={() => setStatus('error')}>
          Error
        </Button>
        <Button onClick={() => setActionsVisibility('hidden')}>
          Hide Actions
        </Button>
        <Button onClick={() => setActionsVisibility('hover')}>
          Actions On Hover
        </Button>
        <Button onClick={() => setActionsVisibility('visible')}>
          Visible Actions
        </Button>
      </div>
      <FileUploadProgressComponent
        title="file.pdf"
        icon={<PdfIcon />}
        progressValue={30}
        status={status}
        actionsVisibility={actionsVisibility}
        onCloseButtonClick={noop}
        onRetryButtonClick={noop}
      />
    </div>
  );
};
