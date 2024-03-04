import { DesignTokenKey } from '../../../foundations/design-token';

export enum ColorGroup {
  ContentBasic,
  ContentGradient,
  ContentInvert,
  ContentLocked,
  SurfacePrimary,
  SurfaceSecondary,
  SurfaceTertiary,
  SurfaceModerate,
  SurfaceInvert,
  SurfaceAccentEmphasisHigh,
  SurfaceAccentEmphasisLow,
  SurfaceAccentEmphasisMin,
  SurfaceAccentEmphasisMedium,
  SurfaceLocked,
  SurfaceOther,
  SurfaceAvatar,
  SurfaceGradient,
  Background,
  BorderBasic,
  BorderInvert,
  ActionPrimary,
  ActionNegative,
  ActionPositive,
  ActionWarning,
  ActionNeutral,
  ActionHighContrast,
  Illustration,
  Products,
  Decor,
  SurfaceComponentSpecific,
  AnimationGradient,
  Deprecated, // ???
}

export type ColorBaseBody = {
  enum: DesignTokenKey;
  token: string;
};

export type ColorShape = ColorBaseBody & {
  desc: string;
  group: ColorGroup | string; // todo remove string type
  deprecated?: boolean;
};
