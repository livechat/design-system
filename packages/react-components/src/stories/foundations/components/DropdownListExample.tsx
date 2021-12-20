import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import DropdownList from '../../../components/dropdown/DropdownList';
import DropdownListItem from '../../../components/dropdown/DropdownListItem';

const generateItemsConfig = () =>
  Array.from(new Array(4), (_, index) => ({
    id: index + 1,
  }));

const itemsConfig = generateItemsConfig();

const getListItems = () => {
  return [
    {
      itemId: 1,
    },
    {
      itemId: 2,
    },
    {
      itemId: 3,
    },
    {
      itemId: 4,
    },
  ];
};

const DropdownListExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    setIsVisible(!isVisible);
  };

  const getItemBody = ({ ...itemProps }) => {
    return (
      <DropdownListItem
        {...itemProps}
        itemId={itemProps.itemId}
        key={itemProps.itemId}
        onItemSelect={() =>
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`Custom item selected: ${itemProps.itemId}`)
        }
      >
        Custom Item - {itemProps.itemId}
      </DropdownListItem>
    );
  };

  return (
    <Dropdown
      isVisible={isVisible}
      placement="bottom"
      onClose={handleClose}
      closeOnEscPress
      triggerRenderer={() => (
        <div ref={buttonRef}>
          <Button onClick={handleTriggerClick}>Menu</Button>
        </div>
      )}
      modifiers={{
        flip: {
          behavior: 'flip',
        },
        arrow: {
          enabled: true,
        },
      }}
      referenceElement={buttonRef.current}
    >
      <DropdownList items={getListItems()} getItemBody={getItemBody} />
    </Dropdown>
  );
};

export default DropdownListExample;
