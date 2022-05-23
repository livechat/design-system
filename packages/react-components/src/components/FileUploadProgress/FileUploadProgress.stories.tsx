import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import {
  FileUploadProgress as FileUploadProgressComponent,
  FileUploadProgressProps,
} from './FileUploadProgress';
import { Button } from '../Button';
import noop from '../../utils/noop';

const PdfIcon: React.FC = () => (
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <g fill="none" fillRule="nonzero">
        <path fill="#FFF" d="M1.333 1.387h17.334V18.72H1.333z" />
        <path
          fill="#DD1717"
          d="M18.667 20H1.333A1.333 1.333 0 0 1 0 18.667V1.333C0 .597.597 0 1.333 0h17.334C19.403 0 20 .597 20 1.333v17.334c0 .736-.597 1.333-1.333 1.333zm0-18A.667.667 0 0 0 18 1.333H2A.667.667 0 0 0 1.333 2v16c0 .368.299.667.667.667h16a.667.667 0 0 0 .667-.667V2zm-6.374 10.273l-4.18 1.12a3.02 3.02 0 0 1-.48 1.714c-.605.575-1.56.56-2.146-.034a1.48 1.48 0 0 1-.034-2.113 2.447 2.447 0 0 1 1.334-.433L8 7.793a2.667 2.667 0 0 1-1.047-1.126 1.54 1.54 0 0 1 2.974-.794c.073.882-.16 1.287-.507 1.834l3.247 3.246c.498-.304.873-.54 1.66-.426a1.547 1.547 0 0 1-.787 2.98 3.013 3.013 0 0 1-1.247-1.234zm-4.226-.026l3.566-.954-2.58-2.506-.986 3.46z"
        />
      </g>
    </svg>
  </div>
);

export default {
  title: 'Components/FileUploadProgress',
  component: FileUploadProgressComponent,
  parameters: {
    componentSubtitle: `TBD`,
  },
  argTypes: {
    onCloseButtonClick: { action: 'changed' },
    onRetryButtonClick: { action: 'changed' },
  },
} as ComponentMeta<typeof FileUploadProgressComponent>;

const StoryTemplate: Story<FileUploadProgressProps> = (
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
  percent: 30,
};

export const FileUploadProgressWithIcon = StoryTemplate.bind({});
FileUploadProgressWithIcon.args = {
  title: 'file.pdf',
  icon: <PdfIcon />,
  percent: 50,
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
      <div className="spacer" style={{ marginBottom: 30 }}>
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
        percent={30}
        status={status}
        actionsVisibility={actionsVisibility}
        onCloseButtonClick={noop}
        onRetryButtonClick={noop}
      />
    </div>
  );
};
