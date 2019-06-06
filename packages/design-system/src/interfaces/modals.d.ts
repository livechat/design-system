// <reference types="react" />

export interface IModalBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  closeOnEscPress?: boolean;
  onClose(): void;
}

export interface IModalProps extends IModalBaseProps {
  heading?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface IActionModalProps extends IModalBaseProps {
  heading?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface IModalPortalProps {
  className?: string;
  parentElementName?: string;
}

export var ModalBase: React.ComponentType<IModalBaseProps>;
export var ModalPortal: React.ComponentType<IModalPortalProps>;
export var ActionModal: React.ComponentType<IActionModalProps>;
export var Modal: React.ComponentType<IModalProps>;
export var ModalHeader: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export var ModalFooter: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export var ModalBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var ActionModalActions: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export var ActionModalContent: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export var ActionModalIcon: React.ComponentType<
  React.HTMLAttributes<HTMLDivElement>
>;
export var ActionModalHeading: React.ComponentType<
  React.HTMLAttributes<HTMLHeadingElement>
>;
