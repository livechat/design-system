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
  Categorical2ColorsOption1,
  Categorical2ColorsOption2,
  Categorical2ColorsOption3,
  Categorical2ColorsOption4,
  Categorical2ColorsOption5,
  Categorical2ColorsOption6,
  Categorical3ColorsOption1,
  Categorical3ColorsOption2,
  Categorical3ColorsOption3,
  Categorical3ColorsOption4,
  Categorical3ColorsOption5,
  Categorical3ColorsOption6,
  Categorical4ColorsOption1,
  Categorical4ColorsOption2,
  Categorical4ColorsOption3,
  Categorical5ColorsOption1,
  Categorical5ColorsOption2,
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
