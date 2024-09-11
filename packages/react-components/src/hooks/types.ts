export type NODE = HTMLDivElement | null;
export type CALLBACK = (newSize: DOMRectReadOnly) => void;

export interface IUseHeightResizer {
  size: number;
  handleResizeRef: (node: NODE) => void;
}

export interface IUseMobileViewDetectorProps {
  mobileBreakpoint: number;
}

export interface IUseMobileViewDetector {
  isMobile: boolean;
  handleResizeRef: (node: NODE) => void;
}