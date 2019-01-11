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
    from?: React.ReactNode;
    onCloseButtonClick: void;
}

export var InAppBase: React.ComponentType<IInAppBaseProps>;
export var InAppPortal: React.ComponentType<IInAppPortalProps>;
export var InApp: React.ComponentType<IInAppProps>;
export var InAppHeader: React.ComponentType<IInAppHeaderProps>;
export var InAppFooter: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var InAppBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var IInAppAvatarProps: React.ComponentType<React.HTMLAttributes<HTMLImageElement>>;
export var IInAppImageProps: React.ComponentType<React.HTMLAttributes<HTMLImageElement>>;
