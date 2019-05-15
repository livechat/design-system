export type LoaderSize = "small" | "medium" | "large";

export interface ILoaderLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface ILoaderWrapperBaseProps {
  isLoading?: boolean;
}

export interface ILoaderWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ILoaderWrapperBaseProps {
  children: React.ReactNode | React.ReactNode[];
}

interface ILoaderSpinnerBaseProps {
  primaryColor?: string;
  secondaryColor?: string;
  size?: LoaderSize;
  isLoading?: boolean;
  spinnerClassName?: string;
}

export interface ILoaderSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ILoaderSpinnerBaseProps {}

export interface ILoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ILoaderSpinnerBaseProps,
    ILoaderWrapperBaseProps {
  label?: React.ReactNode;
  labelClassName: string;
  spinnerWrapperClassName: string;
}

export var Loader: React.ComponentType<ILoaderProps>;
export var LoaderSpinner: React.ComponentType<ILoaderSpinnerProps>;
export var LoaderWrapper: React.ComponentType<ILoaderWrapperProps>;
export var LoaderLabel: React.ComponentType<ILoaderLabelProps>;
