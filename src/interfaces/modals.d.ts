// <reference types="react" />

export interface IModalProps {
  isOpen: boolean;
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
  title: React.ReactNode,
  footer: React.ReactNode,
}

export var Modal: React.ComponentType<IModalProps>;
export var PopupModal: React.ComponentType<IPopupModalProps>;
export var ActionModal: React.ComponentType<IActionModalProps>;
