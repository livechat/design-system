import { Meta } from '@storybook/react';

import { IUploadFileProps } from './types';
import { UploadFile as UploadFileComponent } from './UploadFile';

export default {
  title: 'Components/UploadFile',
  component: UploadFileComponent,
} as Meta<typeof UploadFileComponent>;

export const Default = (args: IUploadFileProps) => (
  <UploadFileComponent {...args} />
);
