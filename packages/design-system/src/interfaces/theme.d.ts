/// <reference types="react" />
import { Theme, ThemeName } from "@livechat/design-system-themes";

export interface IThemeContext {
  theme: Theme;
}

export interface IThemeConsumerProps {
  children(theme: Theme): React.ReactNode;
}

export interface IThemeProviderProps {
  themeName: ThemeName;
}

export var ThemeContext: React.Context<IThemeContext>;
export var ThemeProvider: React.ComponentType<IThemeProviderProps>;
export var ThemeConsumer: React.ComponentType<IThemeConsumerProps>;
export var withTheme: <P extends IThemeContext>(Component: React.ComponentType<P>) => React.ComponentType<P>;
