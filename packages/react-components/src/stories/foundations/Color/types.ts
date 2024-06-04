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
  SurfaceAccentEmphasisSubtle,
  SurfaceAccentOndark,
  SurfaceLocked,
  SurfaceOpacity,
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
  ActionLock,
  Illustration,
  Products,
  Decor,
  SurfaceComponentSpecific,
  AnimationGradient,
  Deprecated, // ???
  GradientValues,
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
