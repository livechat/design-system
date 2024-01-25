import { DesignTokenKey } from '../../../themes/design-token';

export enum ColorGroup {
  ContentBasic,
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
  SurfaceLocked,
  SurfaceOther,
  SurfaceAvatar,
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
  Other,
  Deprecated, // ???
}

export type ColorsShape = Record<
  DesignTokenKey,
  {
    enum: DesignTokenKey;
    variable: string;
    desc: string;
    group: ColorGroup | string; // todo remove string type
    deprecated?: boolean;
  }
>;
