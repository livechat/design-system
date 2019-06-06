export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  img?: string;
}

export var Card: React.ComponentType<ICardProps>;
