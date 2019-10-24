export type SwitchSize = "basic" | "compact";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export interface ISwitchProps extends HTMLInputProps {
  defaultOn?: boolean;
  on?: boolean;
  innerRef?:
    | React.Ref<HTMLInputElement>
    | React.Ref<React.Component<ISwitchProps>>;
  size?: SwitchSize;
  name?: string;
}

export var Switch: React.ComponentType<ISwitchProps>;
