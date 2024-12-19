import * as React from 'react';

export type NODE = HTMLElement | null;
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

export interface UseInteractiveProps {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface IUseInteractive {
  handleInteractiveClick: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

export interface IUseOnHover {
  isHovered: boolean;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
}
