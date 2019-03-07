// <reference types="react" />
import * as PopperJS from "popper.js";
import { any } from "prop-types";

type ItemId = string | number;

interface IGetItemBodyPayload extends React.HTMLAttributes<HTMLLIElement> {
  itemId: ItemId,
  isFocused: boolean;
  content: React.ReactNode;
  isDisabled?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  icon?: React.ReactNode;
  props: {
    [key: string]: any
  };
  onItemSelect?: (itemId: ItemId) => void;
  onMouseOverItem?: (itemId: ItemId) => void;
} 

export interface IDropdownProps {
  children: React.ReactNode;
  className?: string,
  closeOnEscPress?: boolean,
  isVisible: boolean;
  popperEventsEnabled?: boolean;
  modifiers?: PopperJS.Modifiers;
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  referenceElement?: PopperJS.ReferenceObject;
  zIndex?: number;
  triggerRenderer: (props: {ref: React.Ref<{}>}) => void;
  getItemBody?(payload: IGetItemBodyPayload): React.ReactNode;
  onClose: () => void;
}

interface IDropdownItem extends React.HTMLAttributes<HTMLLIElement> {
  itemId: ItemId;
  isDisabled?: boolean;
  isSelected?: boolean;
  content: React.ReactNode;
  divider?: boolean;
  icon?: React.ReactNode;
  onItemSelect?: (itemId: ItemId) => void;
  props?: {
    [key: string]: any
  };
}

export interface IDropdownListProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  items: IDropdownItem[];
}

export interface IDropdownListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  itemId: ItemId;
  isFocused?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  onMouseOverItem?: (itemId: ItemId) => void;
  onItemSelect?: (itemId: ItemId) => void;
}

export var Dropdown: React.ComponentType<IDropdownProps>;
export var DropdownList: React.ComponentType<IDropdownListProps>;
export var DropdownListItem: React.ComponentType<IDropdownListItemProps>;
