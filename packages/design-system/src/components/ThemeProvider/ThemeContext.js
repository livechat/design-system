import * as React from 'react';
import themes from '@livechat/design-system-themes';
import { DEFAULT_THEME_NAME } from './constants';

const ThemeContext = React.createContext({ themeName: themes[DEFAULT_THEME_NAME] });

export default ThemeContext;
