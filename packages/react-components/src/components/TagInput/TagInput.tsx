import * as React from 'react';

import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { FieldError } from '../FieldError';
import { Text } from '../Typography';

import { EditableTag } from './components/EditableTag';
import { TagInputProps, TagInputValues } from './types';

import styles from './TagInput.module.scss';

const baseClass = 'tag-input';

const tagSeparatorKeys = [
  KeyCodes.enter,
  KeyCodes.spacebar,
  KeyCodes.tab,
  KeyCodes.semicolon,
  KeyCodes.comma,
];
const tagRemoveKeys = [KeyCodes.backspace, KeyCodes.delete];

export const TagInput = <T extends TagInputValues>({
  id,
  tags,
  onChange,
  validator,
  error,
  placeholder,
  size = 'medium',
  className,
  inputClassName,
  onBlur,
  addOnBlur = true,
  ...props
}: TagInputProps<T>): React.ReactElement => {
  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--error`]]: error,
    },
    className
  );
  const inputClassNames = cx(
    inputClassName,
    styles[`${baseClass}__input`],
    styles[`${baseClass}__input--${size}`]
  );

  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (value: string) => {
    if (value.trim() !== '') {
      onChange([...(tags || []), value] as T[]);
      setInputValue('');
    }
  };

  const removeTag = (idx: number) => {
    const newTags = [...(tags || [])];
    newTags.splice(idx, 1);
    onChange(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagSeparatorKeys.includes(e.key)) {
      e.preventDefault();

      if (inputValue === '') {
        return;
      }

      addTag(inputValue);
    } else if (tagRemoveKeys.includes(e.key)) {
      if (inputValue !== '' || !tags?.length) {
        return;
      }

      removeTag(tags.length - 1);
    }
  };

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    addOnBlur && addTag(inputValue);
    onBlur?.(ev);
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
      newTags[i] = value as T;
    }
    onChange(newTags);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const newTags = text.split(/[\s,;\n]+/);
    onChange([...(tags || []), ...newTags] as T[]);
  };

  const renderTag = (tag: T, index: number) => {
    if (typeof tag === 'string') {
      return (
        <EditableTag
          index={index}
          key={`${index}${tag}`}
          update={updateTag}
          remove={removeTag}
          inputRef={inputRef}
          validator={validator}
          size={size}
        >
          {tag}
        </EditableTag>
      );
    }

    return (
      <EditableTag
        index={index}
        key={`${index}${tag.children}`}
        update={updateTag}
        remove={removeTag}
        inputRef={inputRef}
        validator={validator}
        size={size}
        tagProps={tag}
      >
        {tag.value || (tag.children as string)}
      </EditableTag>
    );
  };

  return (
    <>
      <Text as="div" className={mergedClassNames}>
        {tags?.map(renderTag)}
        <input
          {...props}
          id={id}
          ref={inputRef}
          className={inputClassNames}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
        />
      </Text>
      {error && <FieldError>{error}</FieldError>}
    </>
  );
};
