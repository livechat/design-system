// <reference types="react" />

export interface IModalBaseProps {
  className?: string;
  closeOnEscPress?: boolean; 
  onClose(): void;
}

export interface IModalProps extends IModalBaseProps {
  title?: React.ReactNode,
  footer: React.ReactNode,
}

export interface IActionModalProps extends IModalBaseProps {
  title: React.ReactNode,
  icon: React.ReactNode,
  actions: React.ReactNode
}

export var ModalBase: React.ComponentType<IModalBaseProps>;
export var ActionModal: React.ComponentType<IActionModalProps>;
export var Modal: React.ComponentType<IModalProps>;
export var ModalHeader: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ModalFooter: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ModalBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalActions: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalContent: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalIcon: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalTitle: React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>;
