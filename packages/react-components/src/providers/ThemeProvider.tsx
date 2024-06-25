import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ThemeClassName } from './constants';
import { Theme } from './types';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setCustomVariables: (variables: CustomVariables) => void;
}

interface CustomVariables {
  [key: string]: string;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  customVariables?: CustomVariables;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light',
  customVariables = {},
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [variables, setVariables] = useState<CustomVariables>(customVariables);

  useEffect(() => {
    document.body.classList.remove(ThemeClassName.Light, ThemeClassName.Dark);
    document.body.classList.add(`lc-${theme}-theme`);

    for (const [key, value] of Object.entries(variables)) {
      document.body.style.setProperty(key, value);
    }
  }, [theme, variables]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setCustomVariables = (newVariables: CustomVariables) => {
    setVariables(newVariables);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setCustomVariables }}>
      {children}
    </ThemeContext.Provider>
  );
};
