export interface ITabBaseProps {
  description?: React.ReactNode;
  isSelected?: boolean;
}

export interface IAnchorTabProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ITabBaseProps {}
export interface IButtonTabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ITabBaseProps {}
export interface ITabListProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ITabWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export var Tab: React.ComponentType<IAnchorTabProps | IButtonTabProps>;
export var TabsList: React.ComponentType<ITabListProps>;
export var TabsWrapper: React.ComponentType<ITabWrapperProps>;
