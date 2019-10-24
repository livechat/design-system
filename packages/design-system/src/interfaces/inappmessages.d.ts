// <reference types="react" />

import { IButtonProps } from './buttons';

export interface IInAppMessageBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: {
        avatar?: IInAppMessageHeaderProps['avatar'],
        text?: IInAppMessageHeaderProps['text']
    };
    onClose(): void;
    closeOnEscPress?: boolean;
    footerButtons?: IInAppMessageFooterProps['buttons'];
}

export interface IInAppMessagePortalProps {
    className?: string;
    parentElementName?: string;
}

export interface IInAppMessageProps extends IInAppMessageBaseProps {
    image?: IInAppMessageImage;
}

export interface IInAppMessageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar?: IInAppMessageAvatar;
    text?: React.ReactNode;
    onCloseButtonClick: void;
}

export interface IInAppMessageFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    buttons: {
        cta: IButtonProps,
        remind?: IButtonProps
    };
}

export interface IInAppMessageAvatar extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export interface IInAppMessageImage extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export var InAppMessageBase: React.ComponentType<IInAppMessageBaseProps>;
export var InAppMessagePortal: React.ComponentType<IInAppMessagePortalProps>;
export var InAppMessage: React.ComponentType<IInAppMessageProps>;
export var InAppMessageHeader: React.ComponentType<IInAppMessageHeaderProps>;
export var InAppMessageFooter: React.ComponentType<IInAppMessageFooterProps>;
export var InAppMessageBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
