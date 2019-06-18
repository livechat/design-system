// <reference types="react" />
export type BadgeType = "primary" | "light";

export interface IBadgeProps {
  children: React.ReactNode;
  type?: BadgeType;
}

export var Badge: React.FunctionComponent<IBadgeProps>;
