export type NODE = HTMLDivElement | null;
export type CALLBACK = (newSize: DOMRectReadOnly) => void;

export interface IUseHeightResizer {
  size: number;
  handleResize: (node: NODE) => void;
}

export interface IUseMobileViewDetectorProps {
  mobileBreakpoint: number;
}

export interface IUseMobileViewDetector {
  isMobile: boolean;
  handleResize: (node: NODE) => void;
}
