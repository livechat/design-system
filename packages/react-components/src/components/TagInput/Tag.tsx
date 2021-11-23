import * as React from 'react';
import cx from 'classnames';
import { Text } from '../Text';
import { Icon, IconSizeName } from '../Icon';
import { Close } from '@livechat/design-system-icons/dist/material';
import { EditableTagContent } from './EditableTagContent';

const baseClass = 'lc-tag-input__tag';

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  inputRef: React.RefObject<HTMLInputElement>;
  index: number;
  update: (idx: number, value: string) => void;
  remove: (idx: number) => void;
  validator?: (val: string) => boolean;
  children: string;
}

export const Tag: React.FC<ITagProps> = ({
  className = '',
  children,
  index,
  remove,
  validator,
  inputRef,
  update,
  ...restProps
}) => {
  const isValid = React.useMemo(() => {
    return validator !== undefined ? validator(children) : true;
  }, [children, validator]);

  const mergedClassNames = cx(baseClass, {
    [className]: !!className,
    [`${baseClass}--error`]: !isValid,
  });
  const innerEditableRef = React.useRef<HTMLInputElement>(null);

  const removeTag = () => remove(index);

  return (
    <Text className={mergedClassNames} {...restProps} as="div" size="md">
      <EditableTagContent
        value={children}
        inputRef={inputRef}
        innerEditableRef={innerEditableRef}
        className={`${baseClass}__content`}
        change={(newValue) => update(index, newValue)}
        remove={removeTag}
        validator={validator}
      />
      <button
        title="Remove"
        onClick={removeTag}
        type="button"
        className={`${baseClass}__remove`}
      >
        <Icon source={Close} size={IconSizeName.Medium} />
      </button>
    </Text>
  );
};
