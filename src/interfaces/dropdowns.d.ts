// <reference types="react" />
import * as PopperJS from "popper.js";

export interface IDropdownProps {
  children: React.ReactNode;
  className?: string,
  closeOnEscPress?: boolean,
  triggerRenderer: (props: {ref: React.Ref<{}>}) => void;
  isVisible: boolean;
  popperEventsEnabled?: boolean;
  onClose: () => void;
  modifiers?: PopperJS.Modifiers;
  placement?: PopperJS.Placement;
  positionFixed?: boolean;
  referenceElement?: PopperJS.ReferenceObject;
}

type SelectedItem = string | number;

export interface IDropdownListProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string,
  items: {
    id: number | string;
    content: React.ReactNode;
    divider?: boolean;
    icon?: React.ReactNode;
    onSelect?: () => void;

  }[],
  selected?: SelectedItem[];
}

export var Dropdown: React.ComponentType<IDropdownProps>;
export var DropdownList: React.ComponentType<IDropdownListProps>;
