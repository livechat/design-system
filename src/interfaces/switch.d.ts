export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitchProps extends React.HTMLAttributes<HTMLInputElement>{
  defaultOn?: boolean,
  onChange?: () => void,
  on?: boolean,
  innerRef?: React.Ref<HTMLInputElement> | React.Ref<React.Component<ISwitchProps>>
  size?: ISwitchSizes,
  name?: string
}

export var Switch: React.ComponentType<ISwitchProps>;
