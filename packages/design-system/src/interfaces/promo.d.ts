import { MouseEventHandler } from "react";

export type PromoSize = "small" | "medium" | "large";

export interface IProgressBarProps {
    buttonText?: string;
    children: React.ReactNode;
    header: string;
    image?: React.ReactNode;
    img?: string;
    light?:boolean;
    linkText?: string;
    onButtonClick?: MouseEventHandler<HTMLButtonElement>;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    onLinkClick?: MouseEventHandler<HTMLButtonElement>;
    size?: PromoSize;
}
