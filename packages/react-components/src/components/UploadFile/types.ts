export interface IUploadFileProps {
  /**
   * Callback when files are uploaded
   */
  onUpload: (files: File[]) => void;

  /**
   * Maximum number of files that can be uploaded
   */
  maxFiles?: number;

  /**
   * Accepted file types
   */
  accept?: string;

  /**
   * Styles for the dropzone
   */
  className?: string;

  /**
   * Whether multiple files can be uploaded
   */
  multiple?: boolean;
}
