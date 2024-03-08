import { DesignTokenKey } from '../../../foundations/design-token';

import { ColorGroup } from './types';

export const ColorsData: Record<
  DesignTokenKey,
  { group: ColorGroup; desc: string; deprecated?: boolean }
> = {
  ActionHighContrastActive: {
    group: ColorGroup.ActionHighContrast,
    desc: 'Active state (High contrast CTA)',
    deprecated: false,
  },
  ActionHighContrastDefault: {
    group: ColorGroup.ActionHighContrast,
    desc: 'Default state (High contrast CTA)',
    deprecated: false,
  },
  ActionHighContrastDisabled: {
    group: ColorGroup.ActionHighContrast,
    desc: 'Disabled state (High contrast CTA)',
    deprecated: false,
  },
  ActionHighContrastHover: {
    group: ColorGroup.ActionHighContrast,
    desc: 'Hover state (High contrast CTA)',
    deprecated: false,
  },
  ActionNegativeActive: {
    group: ColorGroup.ActionNegative,
    desc: "Active state for negative action (Destructive CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionNegativeDefault: {
    group: ColorGroup.ActionNegative,
    desc: "Default state for negative action (Destructive CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionNegativeDisabled: {
    group: ColorGroup.ActionNegative,
    desc: "Disabled state for negative action (Destructive CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionNegativeHover: {
    group: ColorGroup.ActionNegative,
    desc: "Hover state for negative action (Destructive CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionNeutralDefault: {
    group: ColorGroup.ActionNeutral,
    desc: 'Default state for neutral action (Switch OFF)',
    deprecated: false,
  },
  ActionNeutralDisabled: {
    group: ColorGroup.ActionNeutral,
    desc: 'Disabled state for neutral action (Switch OFF)',
    deprecated: false,
  },
  ActionNeutralHover: {
    group: ColorGroup.ActionNeutral,
    desc: 'Hover state for neutral action (Switch OFF)',
    deprecated: false,
  },
  ActionPositiveDefault: {
    group: ColorGroup.ActionPositive,
    desc: 'Default state for positive action (Switch ON)',
    deprecated: false,
  },
  ActionPositiveDisabled: {
    group: ColorGroup.ActionPositive,
    desc: 'Disabled state for positive action (Switch ON)',
    deprecated: false,
  },
  ActionPositiveHover: {
    group: ColorGroup.ActionPositive,
    desc: 'Hover state for positive action (Switch ON)',
    deprecated: false,
  },
  ActionPrimaryActive: {
    group: ColorGroup.ActionPrimary,
    desc: "Default state for primary action (Primary CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionPrimaryDefault: {
    group: ColorGroup.ActionPrimary,
    desc: "Default state for primary action (Primary CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionPrimaryDisabled: {
    group: ColorGroup.ActionPrimary,
    desc: "Disabled state for primary action (Primary CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionPrimaryHover: {
    group: ColorGroup.ActionPrimary,
    desc: "Hover state for primary action (Primary CTA's: buttons, links, icons)",
    deprecated: false,
  },
  ActionWarningDefault: {
    group: ColorGroup.ActionWarning,
    desc: 'Default state for warning actions (tags)',
    deprecated: false,
  },
  ActionWarningDisabled: {
    group: ColorGroup.ActionWarning,
    desc: 'Disabled state for warning actions (tags)',
    deprecated: false,
  },
  ActionWarningHover: {
    group: ColorGroup.ActionWarning,
    desc: 'Hover state for warning actions (tags)',
    deprecated: false,
  },
  Background: {
    group: ColorGroup.Background,
    desc: 'Common background',
    deprecated: true,
  },
  Background01: {
    group: ColorGroup.Background,
    desc: 'Main background color',
    deprecated: false,
  },
  Background02: {
    group: ColorGroup.Background,
    desc: 'Additional background color. Used to support background01',
    deprecated: false,
  },
  Background03: {
    group: ColorGroup.Background,
    desc: 'Additional background color. Used to support background01 and background02',
    deprecated: false,
  },
  BorderBasicContrast: {
    group: ColorGroup.BorderBasic,
    desc: 'Most contrast border color. Specific cases.',
    deprecated: false,
  },
  BorderBasicPrimary: {
    group: ColorGroup.BorderBasic,
    desc: 'Default border for enabled interactive components in a default state (Ex: Pickers, Buttons, etc)',
    deprecated: false,
  },
  BorderBasicSecondary: {
    group: ColorGroup.BorderBasic,
    desc: 'Used as divider for non interactive components',
    deprecated: false,
  },
  BorderBasicTertiary: {
    group: ColorGroup.BorderBasic,
    desc: 'Minimum emphasised border used as divider for non interactive components',
    deprecated: false,
  },
  BorderBasicHover: {
    group: ColorGroup.BorderBasic,
    desc: 'Hover border state for interactive components (Ex: Inputs, Pickers, Buttons, etc)',
    deprecated: false,
  },
  BorderBasicDisabled: {
    group: ColorGroup.BorderBasic,
    desc: 'Disabled border state for interactive components (Ex: Inputs, Pickers, Buttons, etc)',
    deprecated: false,
  },
  BorderBasicInfo: {
    group: ColorGroup.BorderBasic,
    desc: 'Outlined tag border, Info tag.',
    deprecated: false,
  },
  BorderBasicNegative: {
    group: ColorGroup.BorderBasic,
    desc: 'Outlined tag border, validation error tag',
    deprecated: false,
  },
  BorderBasicPositive: {
    group: ColorGroup.BorderBasic,
    desc: 'Outlined tag border, positive tag.',
    deprecated: false,
  },
  BorderBasicPurple: {
    group: ColorGroup.BorderBasic,
    desc: 'Outlined tag border(Purple)',
    deprecated: false,
  },
  BorderBasicWarning: {
    group: ColorGroup.BorderBasic,
    desc: 'Outlined tag border, yellow tag border',
    deprecated: false,
  },
  BorderDefault: {
    group: ColorGroup.Deprecated,
    desc: 'Replace with a BorderBasicPrimary',
    deprecated: true,
  },
  BorderDisabled: {
    group: ColorGroup.Deprecated,
    desc: 'Replace with a BorderBasicDisabled',
    deprecated: true,
  },
  BorderHover: {
    group: ColorGroup.Deprecated,
    desc: 'Replace with a BorderBasicHover',
    deprecated: true,
  },
  BorderInvertDefault: {
    group: ColorGroup.BorderInvert,
    desc: 'Border color on inverted surface',
    deprecated: false,
  },
  BorderInvertDisabled: {
    group: ColorGroup.BorderInvert,
    desc: 'Disabled border state for interactive components as default state on iverted (oposite to primary surface or dark) surface',
    deprecated: false,
  },
  BorderInvertHover: {
    group: ColorGroup.BorderInvert,
    desc: 'Disabled border state for interactive components as default state on iverted (oposite to primary surface or dark) surface',
    deprecated: false,
  },
  BorderInvertPrimary: {
    group: ColorGroup.BorderInvert,
    desc: 'Contrast border for interactive components as default state on iverted (oposite to primary surface or dark) surface',
    deprecated: false,
  },
  BorderInvertSecondary: {
    group: ColorGroup.BorderInvert,
    desc: 'Used as divider for non interactive components on iverted (oposite to primary surface or dark) surface',
    deprecated: false,
  },
  BorderInvertSubtle: {
    group: ColorGroup.Deprecated,
    desc: 'Replace with a BorderInvertSecondary',
    deprecated: true,
  },
  BorderSubtle: {
    group: ColorGroup.Deprecated,
    desc: 'Replace with a BorderBasicSecondary',
    deprecated: true,
  },
  BtnBasicBackgroundActive: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  BtnBasicBackgroundDisabled: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  BtnBasicBackgroundEnabled: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  BtnBasicBackgroundHover: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  BtnBasicBackgroundLoading: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  BtnPlainIconBackgroundActive: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Active state background for Pain button',
    deprecated: false,
  },
  BtnPlainIconBackgroundHover: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Hover state background for Pain button',
    deprecated: false,
  },
  BtnSecondaryBackgroundActive: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Active state background for Secondary button',
    deprecated: false,
  },
  BtnSecondaryBackgroundDisabled: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Disabled state background for Secondary button',
    deprecated: false,
  },
  BtnSecondaryBackgroundEnabled: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Default state background for Secondary button',
    deprecated: false,
  },
  BtnSecondaryBackgroundHover: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Hover state background for Secondary button',
    deprecated: false,
  },
  BtnSecondaryBackgroundLoading: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Loading state background for Secondary button',
    deprecated: false,
  },
  ColorActionActive: {
    group: ColorGroup.Deprecated,
    desc: 'Can be replaced with a ActionPrimaryActive',
    deprecated: true,
  },
  ColorActionDefault: {
    group: ColorGroup.Deprecated,
    desc: 'Can be replaced with a ActionPrimaryDefault',
    deprecated: true,
  },
  ColorActionDefaultRgb: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorActionDisabled: {
    group: ColorGroup.Deprecated,
    desc: 'Can be replaced with a ActionPrimaryDisabled',
    deprecated: true,
  },
  ColorActionHover: {
    group: ColorGroup.Deprecated,
    desc: 'Can be replaced with a ActionPrimaryHover',
    deprecated: true,
  },
  ColorBlack: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorBot: {
    group: ColorGroup.SurfaceOther,
    desc: 'Surface color for Bot message',
    deprecated: false,
  },
  ColorNegativeActive: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorNegativeDefault: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorNegativeDisabled: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorNegativeHover: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorPositiveDefault: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorPositiveDisabled: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorPositiveHover: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorWarningDefault: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorWarningHover: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ColorWhite: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ContentBasicPrimary: {
    group: ColorGroup.ContentBasic,
    desc: 'Primary , high-contrast content, text and icons',
    deprecated: false,
  },
  ContentBasicSecondary: {
    group: ColorGroup.ContentBasic,
    desc: 'Secondary content values, text and icons',
    deprecated: false,
  },
  ContentBasicDisabled: {
    group: ColorGroup.ContentBasic,
    desc: 'Disabled content text and icons',
    deprecated: false,
  },
  ContentBasicInfo: {
    group: ColorGroup.ContentBasic,
    desc: 'Info content, blue tags, text lables, icons',
    deprecated: false,
  },
  ContentBasicNegative: {
    group: ColorGroup.ContentBasic,
    desc: 'validation error, negative values, red tags',
    deprecated: false,
  },
  ContentBasicPositive: {
    group: ColorGroup.ContentBasic,
    desc: 'Content, text and icons',
    deprecated: false,
  },
  ContentBasicPurple: {
    group: ColorGroup.ContentBasic,
    desc: 'Content values, purple tags, text and icons',
    deprecated: false,
  },
  ContentBasicWarning: {
    group: ColorGroup.ContentBasic,
    desc: 'Content values, yellow tags, text and icons',
    deprecated: false,
  },
  ContentBasicGradient01: {
    group: ColorGroup.ContentGradient,
    desc: 'Gradient color for content, text and icons',
    deprecated: false,
  },
  ContentBlackLocked: {
    group: ColorGroup.ContentLocked,
    desc: 'Always black content color in all themes',
    deprecated: false,
  },
  ContentDefault: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ContentDisabled: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ContentInvertPrimary: {
    group: ColorGroup.ContentInvert,
    desc: 'Primary content on inverted sufrace, text and icons',
    deprecated: false,
  },
  ContentInvertSecondary: {
    group: ColorGroup.ContentInvert,
    desc: 'Secondary content on inverted sufrace, text and icons',
    deprecated: false,
  },
  ContentInvertDefault: {
    group: ColorGroup.ContentInvert,
    desc: 'Primary content on inverted surface, text and icons',
    deprecated: false,
  },
  ContentInvertDisabled: {
    group: ColorGroup.ContentInvert,
    desc: 'Inverted content color, text and icons',
    deprecated: false,
  },
  ContentInvertGradient01: {
    group: ColorGroup.ContentInvert,
    desc: 'Secondary content on inverted sufrace(dark surface or opposite to primary surface)',
    deprecated: false,
  },
  ContentInvertSubtle: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ContentLockedBlack: {
    group: ColorGroup.ContentLocked,
    desc: 'Black content color which is the same in all themes',
    deprecated: false,
  },
  ContentLockedActive: {
    group: ColorGroup.ContentLocked,
    desc: 'Active content color which is the same in all themes',
    deprecated: false,
  },
  ContentLockedDefault: {
    group: ColorGroup.ContentLocked,
    desc: 'Default content color which is the same in all themes',
    deprecated: false,
  },
  ContentLockedDisabled: {
    group: ColorGroup.ContentLocked,
    desc: 'Disabled content color which is the same in all themes',
    deprecated: false,
  },
  ContentLockedHover: {
    group: ColorGroup.ContentLocked,
    desc: 'Hover content color which is the same in all themes',
    deprecated: false,
  },
  ContentLockedWhite: {
    group: ColorGroup.ContentLocked,
    desc: 'White content color which is the same in all themes',
    deprecated: false,
  },
  ContentSubtle: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  ContentWhiteLocked: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  DecorBlue100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBlue900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray150: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray20: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray40: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray75: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGray950: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorGreen900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorOrange900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorPurple900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorRed900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow100: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow200: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow400: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow500: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow600: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow700: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow800: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorYellow900: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBrown50: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  DecorBrown300: {
    group: ColorGroup.Decor,
    desc: '',
    deprecated: false,
  },
  IllustrationsPrimary: {
    group: ColorGroup.Illustration,
    desc: 'Accent background color for illustration',
    deprecated: false,
  },
  IllustrationsSecondary: {
    group: ColorGroup.Illustration,
    desc: 'Generic background color for illustration',
    deprecated: false,
  },
  IllustrationsStroke: {
    group: ColorGroup.Illustration,
    desc: 'Strokes, border and other contrast lines in illustration',
    deprecated: false,
  },
  NavbarBackground: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Background color only for Navigation bar',
    deprecated: false,
  },
  PickerListBackground: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Picker list background',
    deprecated: false,
  },
  PickerListGroupBackground: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Picker list background for group header',
    deprecated: false,
  },
  PickerListOptionBackgroundActive: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Picker list item background color in active state',
    deprecated: false,
  },
  PickerListOptionBackgroundActiveHover: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Picker list item background color on hover (for active item)',
    deprecated: false,
  },
  PickerListOptionBackgroundFocus: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Picker list item background color on focus',
    deprecated: false,
  },
  PickerListOptionBackgroundHover: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Picker list item background color on hover',
    deprecated: false,
  },
  PopoverBackground: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Popover container background color',
    deprecated: false,
  },
  ProductsChatbot: {
    group: ColorGroup.Products,
    desc: 'Chatbot logo color',
    deprecated: false,
  },
  ProductsHelpdesk: {
    group: ColorGroup.Products,
    desc: 'Helpdesk logo color',
    deprecated: false,
  },
  ProductsKnowledgebase: {
    group: ColorGroup.Products,
    desc: 'Knowledgebase logo color',
    deprecated: false,
  },
  ProductsLivechat: {
    group: ColorGroup.Products,
    desc: 'Livechat logo color',
    deprecated: false,
  },
  SurfaceAccentEmphasisHighInfo: {
    group: ColorGroup.SurfaceAccentEmphasisHigh,
    desc: 'Info banners background',
    deprecated: false,
  },
  SurfaceAccentEmphasisHighNegative: {
    group: ColorGroup.SurfaceAccentEmphasisHigh,
    desc: 'Error banners background',
    deprecated: false,
  },
  SurfaceAccentEmphasisHighPositive: {
    group: ColorGroup.SurfaceAccentEmphasisHigh,
    desc: 'Success banners background',
    deprecated: false,
  },
  SurfaceAccentEmphasisHighPurple: {
    group: ColorGroup.SurfaceAccentEmphasisHigh,
    desc: 'Bakground for other types of banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisHighWarning: {
    group: ColorGroup.SurfaceAccentEmphasisHigh,
    desc: 'Warning banners background',
    deprecated: false,
  },
  SurfaceAccentEmphasisLowInfo: {
    group: ColorGroup.SurfaceAccentEmphasisLow,
    desc: 'Tags background, info banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisLowNegative: {
    group: ColorGroup.SurfaceAccentEmphasisLow,
    desc: 'Tags background, error banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisLowPositive: {
    group: ColorGroup.SurfaceAccentEmphasisLow,
    desc: 'Tags background, success banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisLowPurple: {
    group: ColorGroup.SurfaceAccentEmphasisLow,
    desc: 'Tags background, other types of banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisLowWarning: {
    group: ColorGroup.SurfaceAccentEmphasisLow,
    desc: 'Tags background, warning banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisMediumNegative: {
    group: ColorGroup.SurfaceAccentEmphasisMedium,
    desc: 'Background as additional indication of negative  values in reports',
    deprecated: false,
  },
  SurfaceAccentEmphasisMediumPositive: {
    group: ColorGroup.SurfaceAccentEmphasisMedium,
    desc: 'Background as additional indication of positive values in reports',
    deprecated: false,
  },
  SurfaceAccentEmphasisMinInfo: {
    group: ColorGroup.SurfaceAccentEmphasisMin,
    desc: 'Info banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisMinNegative: {
    group: ColorGroup.SurfaceAccentEmphasisMin,
    desc: 'Negative, error banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisMinPositive: {
    group: ColorGroup.SurfaceAccentEmphasisMin,
    desc: 'Positive , success banners',
    deprecated: false,
  },
  SurfaceAccentEmphasisMinPurple: {
    group: ColorGroup.SurfaceAccentEmphasisMin,
    desc: 'Other types of banners background',
    deprecated: false,
  },
  SurfaceAccentEmphasisMinWarning: {
    group: ColorGroup.SurfaceAccentEmphasisMin,
    desc: 'Warning banners background',
    deprecated: false,
  },
  SurfaceAvatar1: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar10: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar2: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar3: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar4: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar5: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar6: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar7: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar8: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceAvatar9: {
    group: ColorGroup.SurfaceAvatar,
    desc: 'Avatar background color',
    deprecated: false,
  },
  SurfaceBasicActive: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceBasicDefault: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceBasicDisabled: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceBasicHover: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceBasicSubtle: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceFeedbackInfo: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceFeedbackNegative: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceFeedbackPositive: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceFeedbackWarning: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceGradient01: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient02: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient03: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient04: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient05: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient06: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient07: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient08: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient09: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient10: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient11: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient12: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceGradient13: {
    group: ColorGroup.SurfaceGradient,
    desc: 'Surface gradient color, as a background for banners, tags, badges',
    deprecated: false,
  },
  SurfaceInvertDefault: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceInvertDisabled: {
    group: ColorGroup.SurfaceInvert,
    desc: 'Inverted disabled surface background color',
    deprecated: false,
  },
  SurfaceInvertPrimary: {
    group: ColorGroup.SurfaceInvert,
    desc: 'Inverted primary surface background color',
    deprecated: false,
  },
  SurfaceInvertSecondary: {
    group: ColorGroup.SurfaceInvert,
    desc: 'Inverted secondary surface background color',
    deprecated: false,
  },
  SurfaceInvertSubtle: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceLockedActive: {
    group: ColorGroup.SurfaceLocked,
    desc: 'Active background surface color locked for all themes',
    deprecated: false,
  },
  SurfaceLockedBlack: {
    group: ColorGroup.SurfaceLocked,
    desc: 'Black background surface color locked for all themes',
    deprecated: false,
  },
  SurfaceLockedDefault: {
    group: ColorGroup.SurfaceLocked,
    desc: 'Default background surface color locked for all themes',
    deprecated: false,
  },
  SurfaceLockedDisabled: {
    group: ColorGroup.SurfaceLocked,
    desc: 'Disabled background surface color locked for all themes',
    deprecated: false,
  },
  SurfaceLockedHover: {
    group: ColorGroup.SurfaceLocked,
    desc: 'Hover background surface color locked for all themes',
    deprecated: false,
  },
  SurfaceLockedWhite: {
    group: ColorGroup.SurfaceLocked,
    desc: 'White background surface color locked for all themes',
    deprecated: false,
  },
  SurfaceModerateActive: {
    group: ColorGroup.SurfaceModerate,
    desc: 'Active state for secondary surface',
    deprecated: false,
  },
  SurfaceModerateDefault: {
    group: ColorGroup.SurfaceModerate,
    desc: 'Default state for secondary surface',
    deprecated: false,
  },
  SurfaceModerateHover: {
    group: ColorGroup.SurfaceModerate,
    desc: 'Hover state for moderate surface',
    deprecated: false,
  },
  SurfaceOtherAgent: {
    group: ColorGroup.SurfaceOther,
    desc: 'Chat Agent message background color default in chats',
    deprecated: false,
  },
  SurfaceOtherAgentHover: {
    group: ColorGroup.SurfaceOther,
    desc: 'Chat Agent message background color on hover in chats',
    deprecated: false,
  },
  SurfaceOtherBot: {
    group: ColorGroup.SurfaceOther,
    desc: 'Chat Bot message background color default in chats',
    deprecated: false,
  },
  SurfaceOtherBotHover: {
    group: ColorGroup.SurfaceOther,
    desc: 'Chat Bot message background color on hover in chats',
    deprecated: false,
  },
  SurfaceOtherOverlay: {
    group: ColorGroup.SurfaceOther,
    desc: 'Modal window Overlay background',
    deprecated: false,
  },
  SurfaceOtherSkeleton: {
    group: ColorGroup.SurfaceOther,
    desc: 'Skeleton background',
    deprecated: false,
  },
  SurfaceOtherInternalNote: {
    group: ColorGroup.SurfaceOther,
    desc: '',
    deprecated: false,
  },
  SurfaceOtherInternalNoteHover: {
    group: ColorGroup.SurfaceOther,
    desc: '',
    deprecated: false,
  },
  SurfaceOtherVisitor: {
    group: ColorGroup.SurfaceOther,
    desc: '',
    deprecated: false,
  },
  SurfaceOtherVisitorHover: {
    group: ColorGroup.SurfaceOther,
    desc: '',
    deprecated: false,
  },
  SurfaceOverlay: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfacePrimaryActive: {
    group: ColorGroup.SurfacePrimary,
    desc: 'Active state background color for primary surface. Active item on default primary surface',
    deprecated: false,
  },
  SurfacePrimaryActiveColored: {
    group: ColorGroup.SurfacePrimary,
    desc: 'Additional active state background color for primary surface, specific cases. Active item on default primary surface',
    deprecated: false,
  },
  SurfacePrimaryDefault: {
    group: ColorGroup.SurfacePrimary,
    desc: 'Default state background color for primary surface.',
    deprecated: false,
  },
  SurfacePrimaryDisabled: {
    group: ColorGroup.SurfacePrimary,
    desc: 'Disabled state background color for primary surface. Disabled item on default primary surface',
    deprecated: false,
  },
  SurfacePrimaryHover: {
    group: ColorGroup.SurfacePrimary,
    desc: 'Hover state for primary surface. Hovered item on default primary surface',
    deprecated: false,
  },
  SurfacePrimaryHoverOpacity: {
    group: ColorGroup.SurfacePrimary,
    desc: 'Hover state for primary surface in message text area.',
    deprecated: true,
  },
  SurfaceSecondaryActive: {
    group: ColorGroup.SurfaceSecondary,
    desc: 'Activefor secondary surface',
    deprecated: false,
  },
  SurfaceSecondaryDefault: {
    group: ColorGroup.SurfaceSecondary,
    desc: 'Default state background color for secondary surface.',
    deprecated: false,
  },
  SurfaceSecondaryDisabled: {
    group: ColorGroup.SurfaceSecondary,
    desc: 'Disabled state background color state for secondary surface. Disabled item on default secondary or default primary surface',
    deprecated: false,
  },
  SurfaceSecondaryHover: {
    group: ColorGroup.SurfaceSecondary,
    desc: 'Hover state background color for secondary surface. Hovered item on secondary default surface or on primary default',
    deprecated: false,
  },
  SurfaceSecondarySubtle: {
    group: ColorGroup.Deprecated,
    desc: '',
    deprecated: true,
  },
  SurfaceTertiaryActive: {
    group: ColorGroup.SurfaceTertiary,
    desc: 'Active state for tertiary surface',
    deprecated: false,
  },
  SurfaceTertiaryDefault: {
    group: ColorGroup.SurfaceTertiary,
    desc: 'Default state for tertiary surface',
    deprecated: false,
  },
  SurfaceTertiaryDisabled: {
    group: ColorGroup.SurfaceTertiary,
    desc: 'Disabled state for tertiary surface',
    deprecated: false,
  },
  SurfaceTertiaryHover: {
    group: ColorGroup.SurfaceTertiary,
    desc: 'Hover state for tertiary surface',
    deprecated: false,
  },
  TagContent01: {
    group: ColorGroup.ContentBasic,
    desc: 'Chat tag content color',
    deprecated: false,
  },
  TagSurface01: {
    group: ColorGroup.SurfaceComponentSpecific,
    desc: 'Chat tag background ',
    deprecated: false,
  },
  TooltipBorder: {
    group: ColorGroup.BorderBasic,
    desc: '',
    deprecated: false,
  },
  AnimatedGradientValue1: {
    group: ColorGroup.AnimationGradient,
    desc: 'Part of the gradient used for animation in Skeleton component',
    deprecated: false,
  },
  AnimatedGradientValue2: {
    group: ColorGroup.AnimationGradient,
    desc: 'Part of the gradient used for animation in Skeleton component',
    deprecated: false,
  },
  AnimatedGradientValue3: {
    group: ColorGroup.AnimationGradient,
    desc: 'Part of the gradient used for animation in Skeleton component',
    deprecated: false,
  },
  SurfaceAccentOndarkNegativeDefault: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkNegativeHover: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkWarningDefault: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkWarningHover: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkInfoDefault: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkInfoHover: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkPositiveDefault: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentOndarkPositiveHover: {
    group: ColorGroup.SurfaceAccentOndark,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentEmphasisSubtleNegative: {
    group: ColorGroup.SurfaceAccentEmphasisSubtle,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentEmphasisSubtleWarning: {
    group: ColorGroup.SurfaceAccentEmphasisSubtle,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentEmphasisSubtleInfo: {
    group: ColorGroup.SurfaceAccentEmphasisSubtle,
    desc: '',
    deprecated: undefined,
  },
  SurfaceAccentEmphasisSubtlePositive: {
    group: ColorGroup.SurfaceAccentEmphasisSubtle,
    desc: '',
    deprecated: undefined,
  },
  SurfaceOpacityBasicHover: {
    group: ColorGroup.SurfaceOpacity,
    desc: '',
    deprecated: undefined,
  },
  SurfaceOpacityBasicActive: {
    group: ColorGroup.SurfaceOpacity,
    desc: '',
    deprecated: undefined,
  },
  SurfaceOpacityInvertHover: {
    group: ColorGroup.SurfaceOpacity,
    desc: '',
    deprecated: undefined,
  },
  SurfaceOpacityInvertActive: {
    group: ColorGroup.SurfaceOpacity,
    desc: '',
    deprecated: undefined,
  },
};
