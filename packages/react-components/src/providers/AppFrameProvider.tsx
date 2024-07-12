import * as React from 'react';

interface AppFrameContextProps {
  isSideNavigationBarVisible: boolean;
  toggleSideNavigationBarVisibility: () => void;
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
  isSideNavigationBarVisible?: boolean;
}

export const AppFrameProvider: React.FC<AppFrameProviderProps> = ({
  children,
  isSideNavigationBarVisible = true,
}) => {
  const [isSsideNavigationBarOpen, setIsSideNavigationBarOpen] =
    React.useState<boolean>(isSideNavigationBarVisible);

  const value = React.useMemo(
    () => ({
      isSideNavigationBarVisible: isSsideNavigationBarOpen,
      toggleSideNavigationBarVisibility: () =>
        setIsSideNavigationBarOpen(!isSsideNavigationBarOpen),
    }),
    [isSsideNavigationBarOpen, setIsSideNavigationBarOpen]
  );

  return (
    <AppFrameContext.Provider value={value}>
      {children}
    </AppFrameContext.Provider>
  );
};
