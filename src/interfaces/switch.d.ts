export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitchProps extends React.HTMLAttributes<HTMLSpanElement>{
  defaultOn?: boolean,
  onChange?: () => void,
  on?: boolean,
  ref?: React.Ref<HTMLSpanElement> | React.Ref<React.Component<ISwitchProps>>
  size?: ISwitchSizes,
  name?: string
}

export var Switch: React.ComponentType<ISwitchProps>;
