import * as React from 'react';
import cx from 'classnames';
import { Tag } from './Tag';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'lc-tag-input';

type Tags = string[];

export interface ITagInputProps {
  error?: string;
  tags?: Tags;
  onChange: (tags: Tags) => void;
  placeholder?: string;
  validator?: (val: string) => boolean;
}

export const TagInput: React.FC<ITagInputProps> = ({
  tags,
  onChange,
  validator,
  error,
}) => {
  const mergedClassNames = cx(baseClass, {
    [`${baseClass}--error`]: error,
  });

  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (value: string) => {
    const valid = validator !== undefined ? validator(inputValue) : true;
    if (!tags?.includes(value) && valid) {
      onChange([...(tags || []), value]);
    }
    setInputValue('');
  };

  const removeTag = (idx: number) => {
    const newTags = [...(tags || [])];
    newTags.splice(idx, 1);
    onChange(newTags);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeyCodes.enter) {
      e.preventDefault();

      if (inputValue === '') {
        return;
      }

      addTag(inputValue);
    } else if (
      e.key === KeyCodes.backspace ||
      e.key === KeyCodes.delete ||
      e.key === KeyCodes.del
    ) {
      if (inputValue !== '' || !tags?.length) {
        return;
      }

      removeTag(tags.length - 1);
    }
  };

  const updateTag = (i: number, value: string) => {
    const newTags = [...(tags || [])];
    const numOccurrencesOfValue = newTags.reduce(
      (prev, currentValue, index) =>
        prev + (currentValue === value && index !== i ? 1 : 0),
      0
    );
    if (numOccurrencesOfValue > 0) {
      newTags.splice(i, 1);
    } else {
      newTags[i] = value;
    }
    onChange(newTags);
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const newTags = text
      .split(/[\s,;\n]+/)
      .filter((tag) => (validator !== undefined ? validator(tag) : true));
    onChange([...(tags || []), ...newTags]);
  };

  return (
    <div className={mergedClassNames}>
      {tags?.map((tag) => (
        <Tag
          key={tag}
          update={updateTag}
          remove={removeTag}
          inputRef={inputRef}
        >
          {tag}
        </Tag>
      ))}
      <input
        ref={inputRef}
        className={`${baseClass}__input`}
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        onPaste={onPaste}
      />
    </div>
  );
};
