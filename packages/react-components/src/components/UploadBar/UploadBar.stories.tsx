import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { UploadBar as UploadBarComponent } from './UploadBar';
import { Button } from '../Button';
import noop from '../../utils/noop';
import { FileUploadProgress } from '../FileUploadProgress';
import { ProgressStatus } from 'components/Progress/constants';
import { PdfIcon } from '../../utils/PdfIcon';

const files = [
  {
    id: 1,
    name: 'file1.jpg',
    icon: <PdfIcon />,
    percent: 30,
    status: 'normal',
  },
  {
    id: 2,
    name: 'file2.jpg',
    icon: <PdfIcon />,
    percent: 10,
    status: 'normal',
  },
  {
    id: 3,
    name: 'very_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_namevery_large_name.jpg',
    icon: <PdfIcon />,
    percent: 100,
    status: 'success',
  },
  {
    id: 4,
    name: 'file4.jpg',
    icon: <PdfIcon />,
    percent: 70,
    status: 'normal',
  },
  { id: 5, name: 'file5.jpg', icon: <PdfIcon />, percent: 0, status: 'error' },
  {
    id: 6,
    name: 'file6.jpg',
    icon: <PdfIcon />,
    percent: 15,
    status: 'normal',
  },
  { id: 7, name: 'file7.jpg', icon: <PdfIcon />, percent: 0, status: 'error' },
  { id: 8, name: 'file8.jpg', icon: <PdfIcon />, percent: 5, status: 'normal' },
];

export default {
  title: 'Components/Progress/UploadBar',
  component: UploadBarComponent,
  parameters: {
    componentSubtitle: `TBD`,
  },
  argTypes: {
    onCloseButtonClick: { action: 'changed' },
    onRetryButtonClick: { action: 'changed' },
  },
} as ComponentMeta<typeof UploadBarComponent>;

export const UploadBarWithSingleElement: React.FC = () => {
  const [status, setStatus] = React.useState<'normal' | 'success' | 'error'>(
    'normal'
  );

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
      </div>
      <UploadBarComponent
        mode="single"
        icon={files[0].icon}
        errorMessage={
          status === 'error' ? `${files[0].name} file failed` : undefined
        }
        progressValue={files[0].percent}
        status={status}
        title={files[0].name}
        onCloseButtonClick={noop}
        onRetryButtonClick={noop}
      />
    </div>
  );
};

export const UploadBarWithMultipleElements: React.FC = () => {
  const [status, setStatus] = React.useState<'normal' | 'success' | 'error'>(
    'normal'
  );

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
      </div>
      <UploadBarComponent
        errorMessage={status === 'error' ? 'Files upload failed' : undefined}
        progressValue={70}
        status={status}
        title="Example UploadBar title"
        onCloseButtonClick={noop}
        onRetryButtonClick={noop}
      >
        {files.map((file) => (
          <FileUploadProgress
            key={file.id}
            title={file.name}
            progressValue={file.percent}
            status={
              status === 'normal' ? (file.status as ProgressStatus) : status
            }
            icon={file.icon}
            actionsVisibility={status === 'normal' ? 'visible' : 'hidden'}
            onCloseButtonClick={file.status === 'error' ? noop : undefined}
            onRetryButtonClick={file.status === 'error' ? noop : undefined}
          />
        ))}
      </UploadBarComponent>
    </div>
  );
};
