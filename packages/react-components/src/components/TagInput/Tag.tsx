import * as React from 'react';
import cx from 'classnames';
import { Text } from '../Text';
import { Icon, IconSizeName } from '../Icon';
import { Close } from '@livechat/design-system-icons/dist/material';

const baseClass = 'lc-tag-input';

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  inputRef: React.RefObject<HTMLInputElement>;
  index: number;
  update: (idx: number, value: string) => void;
  remove: (idx: number) => void;
  validator?: (val: string) => boolean;
}

export const Tag: React.FC<ITagProps> = ({
  className = '',
  children,
  index,
  remove,
  ...restProps
}) => {
  const mergedClassNames = cx(`${baseClass}__tag`, className);

  const removeTag = () => remove(index);

  return (
    <Text className={mergedClassNames} {...restProps} as="div" size="md">
      {children}
      <button
        title="Remove"
        onClick={removeTag}
        type="button"
        className={`${baseClass}__remove-tag`}
      >
        <Icon source={Close} size={IconSizeName.Medium} />
      </button>
    </Text>
  );
};
