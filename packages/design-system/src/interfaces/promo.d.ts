import { MouseEventHandler } from "react";

export type PromoSize = "small" | "medium" | "large";

export interface IPromoProps extends React.HTMLAttributes<HTMLDivElement> {
    buttonText?: string;
    children: React.ReactNode;
    header: string;
    img?: string;
    light?:boolean;
    linkText?: string;
    onButtonClick?: MouseEventHandler<HTMLButtonElement>;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    onLinkClick?: MouseEventHandler<HTMLButtonElement>;
    size?: PromoSize;
}
