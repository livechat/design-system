import { EditableTagContent } from './EditableTagContent';
import { Tag } from '../Tag';

import styles from './TagInput.module.scss';
import { HTMLAttributes, RefObject, FC, useMemo, useRef } from 'react';

const baseClass = 'tag-input__tag';

export interface EditableTagProps extends HTMLAttributes<HTMLDivElement> {
  inputRef: RefObject<HTMLInputElement>;
  index: number;
  update: (idx: number, value: string) => void;
  remove: (idx: number) => void;
  validator?: (val: string) => boolean;
  children: string;
  size: 'medium' | 'large';
}

export const EditableTag: FC<EditableTagProps> = ({
  children,
  index,
  remove,
  validator,
  inputRef,
  update,
  size,
}) => {
  const isValid = useMemo(() => {
    return validator !== undefined ? validator(children) : true;
  }, [children, validator]);

  const innerEditableRef = useRef<HTMLInputElement>(null);

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
