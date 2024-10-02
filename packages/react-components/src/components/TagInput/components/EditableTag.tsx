import * as React from 'react';

import { Tag, TagProps } from '../../Tag';
import styles from '../TagInput.module.scss';

import { EditableTagContent } from './EditableTagContent';

const baseClass = 'tag-input__tag';

export interface EditableTagProps extends React.HTMLAttributes<HTMLDivElement> {
  inputRef: React.RefObject<HTMLInputElement>;
  index: number;
  update: (idx: number, value: string) => void;
  remove: (idx: number) => void;
  validator?: (val: string) => boolean;
  children: string;
  size: 'medium' | 'large';
  tagProps?: TagProps;
}

export const EditableTag: React.FC<
  React.PropsWithChildren<EditableTagProps>
> = ({
  children,
  index,
  remove,
  validator,
  inputRef,
  update,
  size,
  tagProps,
}) => {
  const isValid = React.useMemo(() => {
    return validator !== undefined ? validator(children) : true;
  }, [children, validator]);

  const innerEditableRef = React.useRef<HTMLInputElement>(null);

  const removeTag = () => remove(index);

  const getTagKind = () => {
    if (!isValid) return 'error';
    return tagProps ? tagProps.kind : 'default';
  };

  return (
    <Tag size={size} {...tagProps} kind={getTagKind()} onRemove={removeTag}>
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
