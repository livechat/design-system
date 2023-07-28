import * as React from 'react';

import { Tag } from '../Tag';

import { EditableTagContent } from './EditableTagContent';

import styles from './TagInput.module.scss';

const baseClass = 'tag-input__tag';

export interface EditableTagProps extends React.HTMLAttributes<HTMLDivElement> {
  inputRef: React.RefObject<HTMLInputElement>;
  index: number;
  update: (idx: number, value: string) => void;
  remove: (idx: number) => void;
  validator?: (val: string) => boolean;
  children: string;
  size: 'medium' | 'large';
}

export const EditableTag: React.FC<EditableTagProps> = ({
  children,
  index,
  remove,
  validator,
  inputRef,
  update,
  size,
}) => {
  const isValid = React.useMemo(() => {
    return validator !== undefined ? validator(children) : true;
  }, [children, validator]);

  const innerEditableRef = React.useRef<HTMLInputElement>(null);

  const removeTag = () => remove(index);

  return (
    <Tag
      kind={isValid ? 'default' : 'error'}
      dismissible
      size={size}
      onRemove={removeTag}
    >
      <EditableTagContent
        value={children}
        inputRef={inputRef}
        innerEditableRef={innerEditableRef}
        className={styles[`${baseClass}__content`]}
        change={(newValue) => update(index, newValue)}
        remove={removeTag}
        validator={validator}
      />
    </Tag>
  );
};
