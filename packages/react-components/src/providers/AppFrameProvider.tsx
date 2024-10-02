import * as React from 'react';

interface AppFrameContextProps {
  isSideNavigationVisible: boolean;
  toggleSideNavigationVisibility: () => void;
  isMobileViewEnabled: boolean;
  setIsMobileViewEnabled: (isEnabled: boolean) => void;
}

const AppFrameContext = React.createContext<AppFrameContextProps | undefined>(
  undefined
);

export const useAppFrame = (): AppFrameContextProps => {
  const context = React.useContext(AppFrameContext);

  if (!context) {
    throw new Error('useAppFrame must be used within a AppFrameProvider');
  }

  return context;
};

interface AppFrameProviderProps {
  isSideNavigationVisible?: boolean;
  isMobileViewVisible?: boolean;
}

export const AppFrameProvider: React.FC<
  React.PropsWithChildren<AppFrameProviderProps>
> = ({
  children,
  isSideNavigationVisible = true,
  isMobileViewVisible = false,
}) => {
  const [isSsideNavigationBarOpen, setIsSideNavigationBarOpen] =
    React.useState<boolean>(isSideNavigationVisible);
  const [isMobileViewEnabled, setIsMobileViewEnabled] =
    React.useState<boolean>(isMobileViewVisible);

  const value = React.useMemo(
    () => ({
      isSideNavigationVisible: isSsideNavigationBarOpen,
      toggleSideNavigationVisibility: () =>
        setIsSideNavigationBarOpen(!isSsideNavigationBarOpen),
      isMobileViewEnabled,
      setIsMobileViewEnabled: (isEnabled: boolean) =>
        setIsMobileViewEnabled(isEnabled),
    }),
    [
      isSsideNavigationBarOpen,
      setIsSideNavigationBarOpen,
      isMobileViewEnabled,
      setIsMobileViewEnabled,
    ]
  );

  return (
    <AppFrameContext.Provider value={value}>
      {children}
    </AppFrameContext.Provider>
  );
};
