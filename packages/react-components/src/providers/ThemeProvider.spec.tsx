import { FC, ReactElement } from 'react';

import { render, userEvent } from 'test-utils';

import { ThemeProvider, useTheme } from './ThemeProvider';

const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme, setCustomVariables } = useTheme();

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-theme">
        Toggle Theme
      </button>
      <button
        onClick={() =>
          setCustomVariables({ '--content-basic-primary': '#ff0000' })
        }
        data-testid="custom-variables"
      >
        Set Custom Variables
      </button>
    </div>
  );
};

const renderWithThemeProvider = (ui: ReactElement) => {
  return render(
    <ThemeProvider customVariables={{ '--content-basic-primary': '#0000ff' }}>
      {ui}
    </ThemeProvider>
  );
};

describe('ThemeProvider', () => {
  it('should render with default light theme', () => {
    const { getByTestId } = renderWithThemeProvider(<ThemeSwitcher />);
    expect(getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.body.classList.contains('lc-light-theme')).toBe(true);
  });

  it('should render with custom variables', () => {
    renderWithThemeProvider(<ThemeSwitcher />);
    expect(
      document.body.style.getPropertyValue('--content-basic-primary')
    ).toBe('#0000ff');
  });

  it('should toggle theme between light and dark', () => {
    const { getByTestId } = renderWithThemeProvider(<ThemeSwitcher />);

    userEvent.click(getByTestId('toggle-theme'));
    expect(getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.body.classList.contains('lc-dark-theme')).toBe(true);

    userEvent.click(getByTestId('toggle-theme'));
    expect(getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.body.classList.contains('lc-light-theme')).toBe(true);
  });

  it('should set custom variables', () => {
    const { getByTestId } = renderWithThemeProvider(<ThemeSwitcher />);

    userEvent.click(getByTestId('custom-variables'));
    expect(
      document.body.style.getPropertyValue('--content-basic-primary')
    ).toBe('#ff0000');
  });
});
