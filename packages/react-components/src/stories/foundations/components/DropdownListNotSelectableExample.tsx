import { DropDown, Chats, Tickets, Email, Block } from '@livechat/design-system-icons/dist/material';
import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import DropdownList, {
  IDropdownListItems,
} from '../../../components/dropdown/DropdownList';
import { Icon } from '../../../components/Icon';

import { IDropdownListExample } from './DropdownListExample';

const label = {
  marginLeft: '5px',
  lineHeight: '20px'
}

const listElement = {
  display: 'flex',
}

const OpenChat = () => {
  return (<div style={listElement}><Icon source={Chats} /> <span style={label}>Open chat</span> </div>)
}

const CreateTicket = () => {
  return (<div style={listElement}><Icon source={Tickets} />  <span style={label}>Create a ticket</span>  </div>)
}

const SendTranscript = () => {
  return (<div style={listElement}><Icon source={Email} /> <span style={label}>Send transcript</span> </div>)
}

const BanCustomer = () => {
  return (<div style={listElement}><Icon source={Block} /> <span style={label}>Ban this customer</span>  </div>)
}

const getListItems = (onItemSelect: (id: number) => void) => {
  const accumulator: IDropdownListItems[] = [{
    itemId: 1,
    content: <OpenChat />,
    onItemSelect: onItemSelect,
    divider: false,
  },
  {
    itemId: 2,
    content: <CreateTicket />,
    onItemSelect: onItemSelect,
    divider: false,
  },
  {
    itemId: 3,
    content: <SendTranscript />,
    onItemSelect: onItemSelect,
    divider: true,
  },
  {
    itemId: 4,
    content: <BanCustomer />,
    onItemSelect: onItemSelect,
    divider: false,
  }];

  return accumulator;
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
            <Button
              onClick={handleTriggerClick}
              icon={<Icon source={DropDown} />}
              iconPosition={'right'}
            >
              Actions
            </Button>
        </div>
      )}
      modifiers={{
        flip: {}
      }}
    >
      <DropdownList items={listItems} />
    </Dropdown>
  );
};

export default DropdownListSelectableExample;
