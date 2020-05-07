import * as React from 'react';
import themes from '@livechat/design-system-themes';
import { DEFAULT_THEME_NAME } from './constants';

const noop = () => {};

const ThemeContext = React.createContext({ theme: themes[DEFAULT_THEME_NAME], themeName: DEFAULT_THEME_NAME, onThemeChange: noop });

export default ThemeContext;
