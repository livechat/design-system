import { DesignTokenKey } from '../../../foundations/design-token';

export enum ColorGroup {
  ContentBasic,
  ContentGradient,
  ContentInvert,
  ContentLocked,
  ContentAiBasic,
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
  SurfaceAiCopilotBasic,
  SurfaceAiCopilotInvert,
  SurfaceAiOther,
  Background,
  BorderBasic,
  BorderInvert,
  BorderAiBasic,
  BorderAiOther,
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
  CategoricalMain,
  Categorical1Color,
  Categorical2Colors,
  Categorical3Colors,
  Categorical4Colors,
  Categorical5Colors,
  SequentialBlue,
  SequentialYellow,
  SequentialGreen,
  SequentialMagenta,
  SequentialOrange,
  SequentialPurple,
  SequentialRed,
  UIFoundation,
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
