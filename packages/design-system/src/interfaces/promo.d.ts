// <reference types="react" />

export type PromoSize = "small" | "medium" | "large";

export interface IPromoProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonText?: string;
    children: React.ReactNode;
    header: string;
    img?: string;
    light?:boolean;
    linkText?: string;
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
    onLinkClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: PromoSize;
}

export var Promo: React.ComponentType<IPromoProps>;
