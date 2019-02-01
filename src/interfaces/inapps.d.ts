// <reference types="react" />

import { IButtonProps } from './buttons';
import {ImgHTMLAttributes} from "react";

export interface IInAppBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: {
        avatar?: IInAppHeaderProps['avatar'],
        text?: IInAppHeaderProps['text']
    };
    onClose(): void;
    closeOnEscPress?: boolean;
    footerButtons?: IInAppFooterProps['buttons'];
}

export interface IInAppPortalProps {
    className?: string;
    parentElementName?: string;
}

export interface IInAppProps extends IInAppBaseProps {
    image?: IInAppImage;
}

export interface IInAppHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar?: IInAppAvatar;
    text?: React.ReactNode;
    onCloseButtonClick: void;
}

export interface IInAppFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    buttons: {
        cta: IButtonProps,
        remind?: IButtonProps
    };
}

export interface IInAppAvatar extends React.ImgHTMLAttributes<HTMLImageElement> {}

export interface IInAppImage extends React.ImgHTMLAttributes<HTMLImageElement> {}

export var InAppBase: React.ComponentType<IInAppBaseProps>;
export var InAppPortal: React.ComponentType<IInAppPortalProps>;
export var InApp: React.ComponentType<IInAppProps>;
export var InAppHeader: React.ComponentType<IInAppHeaderProps>;
export var InAppFooter: React.ComponentType<IInAppFooterProps>;
export var InAppBody: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
export var InAppAvatar: React.ComponentType<IInAppAvatar>;
export var InAppImage: React.ComponentType<IInAppImage>;
