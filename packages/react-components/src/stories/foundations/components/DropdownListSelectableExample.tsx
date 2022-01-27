import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import DropdownList, {
  IDropdownListItems,
} from '../../../components/dropdown/DropdownList';

import { Check } from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName, IconTypeName } from '../../../components/Icon';

import { IDropdownListExample } from './DropdownListExample';

const generateItemsConfig = () =>
  Array.from(new Array(20), (_, index) => ({
    id: index + 1,
    isDisabled: (index + 1) % 3 === 1,
  }));

const itemsConfig = generateItemsConfig();

const TOGGLE_ALL_ITEM_ID = 0;

const DropdownListSelectableExample: React.FC<IDropdownListExample> = ({
  placement,
}) => {
  const buttonRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [listItems, setListItems] = React.useState<IDropdownListItems[]>(() => {
    const batchItem: IDropdownListItems = {
      itemId: TOGGLE_ALL_ITEM_ID,
      content: <div>Select all</div>,
      isSelected: false,
      divider: true,
    };
    return itemsConfig.reduce(
      (acc, { id, isDisabled }) => {
        acc.push({
          itemId: id,
          content: `Item ${id}`,
          icon: (
            <Icon
              source={Check}
              iconType={IconTypeName.Inverted}
              size={IconSizeName.XSmall}
            />
          ),
          isSelected: false,
          isDisabled,
        });
        return acc;
      },
      [batchItem]
    );
  });

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    setIsVisible(!isVisible);
  };

  const onItemSelect = (id: number) => {
    let isAllItemsSelected = isAllSelected(listItems);
    let list = [];
    if(id === TOGGLE_ALL_ITEM_ID) {
      list = listItems.map((item) => {
        return !item.isDisabled
          ? {
              ...item,
              ...{
                isSelected: !isAllItemsSelected,
              },
            }
          : item;
      });
    } else {
      list = listItems.map((item) => {
        return item.itemId === id
          ? {
              ...item,
              ...{
                isSelected: !item.isSelected,
              },
            }
          : item;
      });
    }

    isAllItemsSelected = isAllSelected(list);
    list[0].content = isAllItemsSelected ? (
      <div>Clear all</div>
    ) : (
      <div>Select all</div>
    );

    setListItems(list);
  }

  const isAllSelected = (items: IDropdownListItems[]) => {
    return !items.some((item) => {
      return (
        item.itemId !== TOGGLE_ALL_ITEM_ID &&
        !item.isDisabled &&
        !item.isSelected
      );
    });
  };

  return (
    <Dropdown
      isVisible={isVisible}
      placement={placement}
      onClose={handleClose}
      closeOnEscPress
      triggerRenderer={() => (
        <div ref={buttonRef}>
          <Button onClick={handleTriggerClick}>Menu</Button>
        </div>
      )}
      modifiers={{
        flip: {}
      }}
    >
      <DropdownList
        items={listItems}
        onItemSelect={onItemSelect}
      />
    </Dropdown>
  );
};

export default DropdownListSelectableExample;
