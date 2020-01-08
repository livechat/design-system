// <reference types="react" />
import * as PopperJS from "popper.js";

type ItemId = string | number;

interface IDropdownItemBase extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  itemId: ItemId;
  isDisabled?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  onItemSelect?: (
    itemId: ItemId,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
}

export interface IGetItemBodyPayload extends IDropdownItemBase {
  content: React.ReactNode;
  isFocused?: boolean;
  props: {
    [key: string]: any;
  };
  onItemFocus?: (itemId: ItemId) => void;
  onMouseOverItem?: (itemId: ItemId) => void;
}

export interface IDropdownProps {
  children: React.ReactNode;
  className?: string;
  closeOnEscPress?: boolean;
  closeOnEnterPress?: boolean;
  closeKeyCodes?: number[];
  eventsEnabled?: boolean;
  isVisible: boolean;
  modifiers?: PopperJS.Modifiers;
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  referenceElement?: PopperJS.ReferenceObject;
  shouldUpdateOnResize?: boolean;
  zIndex?: number;
  triggerRenderer?: (props: { ref: React.Ref<any> }) => void;
  onClose: () => void;
}

export interface IDropdownItem extends IDropdownItemBase {
  content: React.ReactNode;
  icon?: React.ReactNode;
  props?: {
    [key: string]: any;
  };
  onItemFocus?: (itemId: ItemId) => void;
}

export interface IDropdownListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  autoFocusedItemId?: string;
  autoFocusOnItemsCountChange?: boolean;
  className?: string;
  items: IDropdownItem[];
  itemSelectKeyCodes?: number[];
  keyboardEventsEnabled?: boolean;
  getItemBody?(payload: IGetItemBodyPayload): React.ReactNode;
}

export interface IDropdownListItemProps extends IDropdownItemBase {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isFocused?: boolean;
  onMouseOverItem?: (itemId: ItemId) => void;
}

export var Dropdown: React.ComponentType<IDropdownProps>;
export var DropdownList: React.ComponentType<IDropdownListProps>;
export var DropdownListItem: React.ComponentType<IDropdownListItemProps>;
