export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: React.ReactNode | string;
  img?: string;
}

export var Card: React.ComponentType<ICardProps>;
