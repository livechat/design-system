import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import DropdownList, {
  IDropdownListItems,
} from '../../../components/dropdown/DropdownList';

import { IDropdownListExample } from './DropdownListExample';

const generateItemsConfig = () =>
  Array.from(new Array(20), (value, index) => ({
    id: index + 1,
    isDisabled: (index + 1) % 3 === 1,
    divider: false,
  }));

const itemsConfig = generateItemsConfig();

const getListItems = (onItemSelect: (id: number) => void) => {
  const accumulator: IDropdownListItems[] = [];
  return itemsConfig.reduce((acc, { id, divider }) => {
    acc.push({
      itemId: id,
      content: `Item ${id}`,
      onItemSelect: onItemSelect,
      divider,
    });
    return acc;
  }, accumulator);
};

const DropdownListSelectableExample: React.FC<IDropdownListExample> = ({
  placement,
}) => {
  const buttonRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [listItems, setListItems] = React.useState<IDropdownListItems[]>([]);

  React.useEffect(() => {
    setListItems(getListItems(handleClose));
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    setIsVisible(!isVisible);
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
        flip: {},
        arrow: {},
      }}
    >
      <DropdownList items={listItems} />
    </Dropdown>
  );
};

export default DropdownListSelectableExample;
