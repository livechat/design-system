// <reference types="react" />
import * as PopperJS from "popper.js";
import { any } from "prop-types";

type ItemId = string | number;

interface IGetItemBodyPayload {
  itemId: ItemId,
  isFocused: boolean;
  onMouseOver(itemId: ItemId): any;
  content: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  icon?: React.ReactNode;
  props: {
    [key: string]: any
  };
  onSelect?: (itemId: ItemId) => void;
  
} 

export interface IDropdownProps {
  children: React.ReactNode;
  className?: string,
  closeOnEscPress?: boolean,
  triggerRenderer: (props: {ref: React.Ref<{}>}) => void;
  isVisible: boolean;
  popperEventsEnabled?: boolean;
  modifiers?: PopperJS.Modifiers;
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  referenceElement?: PopperJS.ReferenceObject;
  zIndex?: number;
  getItemBody?(payload: IGetItemBodyPayload): React.ReactNode;
  onClose: () => void;
}

interface IDropdownItem {
  itemId: ItemId;
  className?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  content: React.ReactNode;
  divider?: boolean;
  icon?: React.ReactNode;
  onSelect?: (itemId: ItemId) => void;
  props?: {
    [key: string]: any
  };
}

export interface IDropdownListProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  items: IDropdownItem[];
}

export interface IDropdownListItemProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  itemId: ItemId;
  isFocused?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  onSelect?: (itemId: ItemId) => void;
}

export var Dropdown: React.ComponentType<IDropdownProps>;
export var DropdownList: React.ComponentType<IDropdownListProps>;
export var DropdownListItem: React.ComponentType<IDropdownListItemProps>;
