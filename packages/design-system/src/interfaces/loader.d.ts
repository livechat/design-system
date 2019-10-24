export type LoaderSize = "small" | "medium" | "large";

export interface ILoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  labelClassName?: string;
  spinnerWrapperClassName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  size?: LoaderSize;
  isLoading?: boolean;
  spinnerClassName?: string;
}

export var Loader: React.ComponentType<ILoaderProps>;
