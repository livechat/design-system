export type ProgressSize = "small" | "medium" | "large";
export type ProgressStatus = "normal" | "error" | "success";
export type ProgressMode = "single" | "multiple";
export type FileUploadProgressActionsVisibilityState =
  | "visible"
  | "hover"
  | "hidden";

export interface IProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
  ref?:
    | React.Ref<HTMLDivElement>
    | React.Ref<React.Component<IProgressBarProps>>;
}

export interface IProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
  ref?:
    | React.Ref<HTMLDivElement>
    | React.Ref<React.Component<IProgressBarProps>>;
}

export interface IFileUploadProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  actionsVisibilityState?: FileUploadProgressActionsVisibilityState;
  icon?: React.ReactNode;
  title: string;
  percent: number;
  status?: ProgressStatus;
  onCloseButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRetryButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ref?:
    | React.Ref<HTMLDivElement>
    | React.Ref<React.Component<IFileUploadProgressProps>>;
}

export interface IUploadBarProps extends React.HTMLAttributes<HTMLDivElement> {
  errorMessage?: string;
  icon?: React.ReactNode;
  isExpanded?: boolean;
  mode?: ProgressMode;
  percent: number;
  size?: ProgressSize;
  status?: ProgressStatus;
  shouldExpandOnEndWithErrors?: boolean;
  shouldCollapseOnEndWithSuccess?: boolean;
  title: string;
  onCloseButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCollapseButtonClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
  onRetryButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export var ProgressBar: React.ComponentType<IProgressBarProps>;
export var ProgressCircle: React.ComponentType<IProgressCircleProps>;
export var FileUploadProgress: React.ComponentType<IFileUploadProgressProps>;
export var UploadBar: React.ComponentType<IUploadBarProps>;
