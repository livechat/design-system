/// <reference types="react" />
import { Theme, ThemeName } from "@livechat/design-system-themes";
import { Omit } from "./switch";

export interface IThemeContext {
  theme: Theme;
  themeName: ThemeName;
}

export type IOptionalThemeContext = Partial<IThemeContext>;

export type Theme = Theme;
export type ThemeName = ThemeName;

export interface IThemeConsumerProps {
  children(context: IThemeContext): React.ReactNode;
}

export interface IThemeProviderProps {
  themes?: {
    [themeName: string]: Theme
  };
  themeName: ThemeName;
}

export var ThemeContext: React.Context<IThemeContext>;
export var ThemeProvider: React.ComponentType<IThemeProviderProps>;
export var ThemeConsumer: React.ComponentType<IThemeConsumerProps>;
export function withTheme<P extends IThemeContext>(Component: React.ComponentType<P>): React.ComponentType<Pick<P, Exclude<keyof P, keyof IThemeContext>> & Partial<IThemeContext>>;
