import * as React from 'react';

import { IPickerListItem } from './PickerList';
import { Tag } from '../Tag';
import { PickerType } from './Picker';

import styles from './TriggerBody.module.scss';

const baseClass = 'picker-trigger-body';

interface ITriggerBodyProps {
  items: IPickerListItem[];
  type: PickerType;
  onItemRemove: (item: IPickerListItem) => void;
}

export const TriggerBody: React.FC<ITriggerBodyProps> = ({
  items,
  type,
  onItemRemove,
}) => {
  if (type === 'single') {
    return <div>{items[0].name}</div>;
  }

  return (
    <div>
      {items.map((item) => {
        return (
          <Tag
            key={item.name}
            className={styles[`${baseClass}__tag`]}
            dismissible
            onRemove={() => onItemRemove(item)}
          >
            {item.name}
          </Tag>
        );
      })}
    </div>
  );
};
