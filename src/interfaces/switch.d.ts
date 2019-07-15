export type SwitchSize = "basic" | "compact";
export interface ISwitchProps extends React.HTMLAttributes<HTMLInputElement> {
  defaultOn?: boolean;
  on?: boolean;
  innerRef?:
    | React.Ref<HTMLInputElement>
    | React.Ref<React.Component<ISwitchProps>>;
  size?: SwitchSize;
  name?: string;
}

export var Switch: React.ComponentType<ISwitchProps>;
