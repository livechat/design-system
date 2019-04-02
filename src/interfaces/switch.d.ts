export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitchProps extends React.HTMLAttributes<HTMLDivElement>{
  defaultOn?: boolean,
  on?: boolean,
  onToggle?: () => void,
  ref?: React.Ref<HTMLDivElement> | React.Ref<React.Component<ISwitchProps>>
  size?: ISwitchSizes,
}

export var Switch: React.ComponentType<ISwitchProps>;
