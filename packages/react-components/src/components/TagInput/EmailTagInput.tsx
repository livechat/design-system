import * as React from 'react';

import { TagInputProps, TagInput } from './TagInput';

export type EmailTagInputProps = Omit<TagInputProps, 'validator'>;

export const emailRegex =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$/i; // eslint-disable-line no-control-regex

const defaultPlaceholder = 'name@company.com';
const emailValidator = (value: string) => {
  return emailRegex.test(value);
};

export const EmailTagInput: React.FC<EmailTagInputProps> = ({
  id,
  tags,
  onChange,
  error,
  placeholder = defaultPlaceholder,
  size,
}) => {
  return (
    <TagInput
      id={id}
      tags={tags}
      error={error}
      onChange={onChange}
      placeholder={placeholder}
      validator={emailValidator}
      size={size}
    />
  );
};
