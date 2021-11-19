import { ITagInputProps, TagInput } from './TagInput';
import * as React from 'react';

export type IEmailTagInputProps = Omit<ITagInputProps, 'validator'>;

const defaultPlaceholder = 'name@company.com';
const emailValidator = (value: string) => {
  const htmlEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return htmlEmailRegex.test(value);
};

export const EmailTagInput: React.FC<IEmailTagInputProps> = ({
  tags,
  onChange,
  error,
  placeholder = defaultPlaceholder,
}) => {
  return (
    <TagInput
      tags={tags}
      error={error}
      onChange={onChange}
      placeholder={placeholder}
      validator={emailValidator}
    />
  );
};
