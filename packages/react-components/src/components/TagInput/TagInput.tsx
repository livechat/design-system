import * as React from 'react';
import cx from 'classnames';
import { Tag } from './Tag';

const baseClass = 'lc-tag-input';

type Tags = string[];

interface IProps {
  error?: string;
  tags?: Tags;
  onChange?: (tags: Tags) => void;
  placeholder?: string;
  validator?: (val: string) => boolean;
}

export type ITagInputProps = IProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const TagInput: React.FC<ITagInputProps> = ({
  tags,
  error,
  className = '',
  ...restProps
}) => {
  const mergedClassNames = cx(
    baseClass,
    {
      [`${baseClass}--error`]: error,
    },
    className
  );

  return (
    <div className={mergedClassNames}>
      {tags?.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      <input {...restProps} className={`${baseClass}__input`} />
    </div>
  );
};
