// <reference types="react" />

export interface IModalProps {
  className?: string;
  closeOnEscPress?: boolean; 
  onClose(): void;
}

export interface IPopupModalProps extends IModalProps {
  title: React.ReactNode,
  icon: React.ReactNode,
  actions: React.ReactNode
}

export interface IActionModalProps extends IModalProps {
  title?: React.ReactNode,
  footer: React.ReactNode,
}

export var Modal: React.ComponentType<IModalProps>;
export var PopupModal: React.ComponentType<IPopupModalProps>;
export var ActionModal: React.ComponentType<IActionModalProps>;
export var ActionModalHeader: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalFooter: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var PopupModalActions: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var PopupModalContent: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var PopupModalIcon: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var PopupModalTitle: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
