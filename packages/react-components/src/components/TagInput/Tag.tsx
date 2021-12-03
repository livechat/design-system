import * as React from 'react';
import { EditableTagContent } from './EditableTagContent';
import { Filter } from '../Filter';

const baseClass = 'lc-tag-input__tag';

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  inputRef: React.RefObject<HTMLInputElement>;
  index: number;
  update: (idx: number, value: string) => void;
  remove: (idx: number) => void;
  validator?: (val: string) => boolean;
  children: string;
  size: 'medium' | 'large';
}

export const Tag: React.FC<ITagProps> = ({
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
    <Filter error={!isValid} dismissible size={size} onRemove={removeTag}>
      <EditableTagContent
        value={children}
        inputRef={inputRef}
        innerEditableRef={innerEditableRef}
        className={`${baseClass}__content`}
        change={(newValue) => update(index, newValue)}
        remove={removeTag}
        validator={validator}
      />
    </Filter>
  );
};
