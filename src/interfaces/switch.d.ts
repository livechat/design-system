export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitchProps extends React.HTMLAttributes<HTMLSpanElement>{
  className?: string
  defaultOn?: boolean,
  handleChange?: () => void,
  on?: boolean,
  ref?: React.Ref<HTMLDivElement> | React.Ref<React.Component<ISwitchProps>>
  size?: ISwitchSizes,
}

export var Switch: React.ComponentType<ISwitchProps>;
