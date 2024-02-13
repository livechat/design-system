import * as React from 'react';

import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { FieldError } from '../FieldError';
import { Text } from '../Typography';

import { EditableTag } from './EditableTag';

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

export interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange'
  > {
  /**
   * Set the id for input
   */
  id?: string;
  /**
   * Set the error message
   */
  error?: string;
  /**
   * Array of defined tags
   */
  tags?: string[];
  /**
   * The event handler for modify tags array
   */
  onChange: (tags: string[]) => void;
  /**
   * Set the input placeholder
   */
  placeholder?: string;
  /**
   * Set the custom validation for provided items
   */
  validator?: (val: string) => boolean;
  /**
   * Specify the input size
   */
  size?: 'medium' | 'large';
  /**
   * Set the input custom class
   */
  inputClassName?: string;
  /**
   * Add Tag on blur
   */
  addOnBlur?: boolean;
}

export const TagInput: React.FC<TagInputProps> = ({
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
}) => {
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
    onChange([...(tags || []), value]);
    setInputValue('');
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
      newTags[i] = value;
    }
    onChange(newTags);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const newTags = text.split(/[\s,;\n]+/);
    onChange([...(tags || []), ...newTags]);
  };

  return (
    <>
      <Text as="div" className={mergedClassNames}>
        {tags?.map((tag, index) => (
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
        ))}
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
