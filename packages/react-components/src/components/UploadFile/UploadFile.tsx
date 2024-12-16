import { FC, useCallback, useState } from 'react';

import { FiletypeOther } from '@livechat/design-system-icons';
import cx from 'clsx';
import { useDropzone } from 'react-dropzone';

import { FileUploadProgress } from '../FileUploadProgress';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { IUploadFileProps } from './types';

import styles from './UploadFile.module.scss';

interface PreviewFile {
  file: File;
  preview: string;
}

export const UploadFile: FC<IUploadFileProps> = ({
  onUpload,
  maxFiles = 5,
  className,
  multiple = true,
}) => {
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mappedFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFiles((current) => [...current, ...mappedFiles].slice(0, maxFiles));
      onUpload(acceptedFiles);
    },
    [onUpload, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    maxFiles,
  });

  const renderPreview = (file: PreviewFile, index: number) => {
    const isImage = file.file.type.startsWith('image/');

    return (
      <div key={index} className={styles['upload-file__previews__item']}>
        {isImage ? (
          <img
            src={file.preview}
            alt={file.file.name}
            className={styles['upload-file__previews__item__image']}
          />
        ) : (
          <div className={styles['upload-file__previews__item__icon']}>
            <Icon source={FiletypeOther} />
            <Text
              size="sm"
              className={styles['upload-file__previews__item__icon__name']}
            >
              {file.file.name}
            </Text>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cx(styles['upload-file'], className)}>
      <div {...getRootProps()} className={styles['upload-file__dropzone']}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text size="md" as="div">
            Drop the files here ...
          </Text>
        ) : (
          <Text size="md" as="div">
            Drag & drop some files here, or click to select files
          </Text>
        )}
      </div>
      <div className={styles['upload-file__previews']}>
        {files.map((file, index) => renderPreview(file, index))}
      </div>
      {files.length > 0 && (
        <div className={styles['upload-file__progress']}>
          {files.map((file, index) => (
            <FileUploadProgress
              key={index}
              title={file.file.name}
              progressValue={100}
              status="success"
            />
          ))}
        </div>
      )}
    </div>
  );
};
