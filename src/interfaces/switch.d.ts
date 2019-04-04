export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitchProps extends React.HTMLAttributes<HTMLSpanElement>{
  defaultOn?: boolean,
  on?: boolean,
  onToggle?: () => void,
  ref?: React.Ref<HTMLInputElement> | React.Ref<React.Component<ISwitchProps>>
  size?: ISwitchSizes,
}

export var Switch: React.ComponentType<ISwitchProps>;
