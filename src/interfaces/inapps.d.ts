// <reference types="react" />

export interface IInAppBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    headerAvatar?: string;
    headerFrom?: React.ReactNode;
    onClose(): void;
    closeOnEscPress?: boolean;
    footer?: React.ReactNode;
}

export interface IInAppPortalProps {
    className?: string;
    parentElementName?: string;
}

export interface IInAppProps extends IInAppBaseProps {
    imageSrc?: string;
    imageAlt?: string;
    heading?: React.ReactNode;
}

export interface IInAppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    avatar?: string;
    text?: React.ReactNode;
    onCloseButtonClick: void;
}

export interface IInAppFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    buttons?: object;
}

export var InAppBase: React.ComponentType<IInAppBaseProps>;
export var InAppPortal: React.ComponentType<IInAppPortalProps>;
export var InApp: React.ComponentType<IInAppProps>;
export var InAppHeader: React.ComponentType<IInAppHeaderProps>;
export var InAppFooter: React.ComponentType<IInAppFooterProps>;
export var InAppBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
