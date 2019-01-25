// <reference types="react" />

import { IButtonProps } from './buttons';

export interface IInAppBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    header?: {
        avatarSrc?: IInAppHeaderProps['avatarSrc'],
        avatarAlt?: IInAppHeaderProps['avatarAlt'],
        text?: IInAppHeaderProps['text']
    };
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
    avatarSrc?: string;
    avatarAlt?: string;
    text?: React.ReactNode;
    onCloseButtonClick: void;
}

export interface IInAppFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    buttons: {
        cta: IButtonProps,
        remind?: IButtonProps
    };
}

export var InAppBase: React.ComponentType<IInAppBaseProps>;
export var InAppPortal: React.ComponentType<IInAppPortalProps>;
export var InApp: React.ComponentType<IInAppProps>;
export var InAppHeader: React.ComponentType<IInAppHeaderProps>;
export var InAppFooter: React.ComponentType<IInAppFooterProps>;
export var InAppBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
