import * as React from 'react';
import { Button } from '../../../components/Button';
import DropdownListItem, {
  IDropdownListItem,
} from '../../../components/dropdown/DropdownListItem';
import Dropdown from '../../../components/dropdown/Dropdown';
import DropdownList, {
  IDropdownListItems,
} from '../../../components/dropdown/DropdownList';
import { IDropdownListExample } from './DropdownListExample';

const generateItemsConfig = () =>
  Array.from(new Array(4), (_, index) => ({
    id: index + 1,
  }));

const itemsConfig = generateItemsConfig();

const getListItems = () => {
  const accumulator: IDropdownListItems[] = [];
  return itemsConfig.reduce((acc, { id }) => {
    acc.push({
      itemId: id,
    });
    return acc;
  }, accumulator);
};

const DropdownListBodyPropExample: React.FC<IDropdownListExample> = ({
  placement,
}) => {
  const buttonRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [listItems, setListItems] = React.useState<IDropdownListItems[]>([]);

  React.useEffect(() => {
    setListItems(getListItems());
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    setIsVisible(!isVisible);
  };

  const getItemBody = ({ itemId, ...itemProps }: IDropdownListItem) => {
    return (
      <DropdownListItem
        {...itemProps}
        itemId={itemId}
        key={itemId}
        onItemSelect={() => console.log(`Custom item selected: ${itemId}`)}
      >
        Custom Item - {itemId}
      </DropdownListItem>
    );
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
      <DropdownList items={listItems} getItemBody={getItemBody} />
    </Dropdown>
  );
};

export default DropdownListBodyPropExample;
