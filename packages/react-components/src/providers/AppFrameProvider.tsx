import * as React from 'react';

interface AppFrameContextProps {
  isSideNavigationVisible: boolean;
  toggleSideNavigationVisibility: () => void;
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
}

export const AppFrameProvider: React.FC<AppFrameProviderProps> = ({
  children,
  isSideNavigationVisible = true,
}) => {
  const [isSsideNavigationBarOpen, setIsSideNavigationBarOpen] =
    React.useState<boolean>(isSideNavigationVisible);

  const value = React.useMemo(
    () => ({
      isSideNavigationVisible: isSsideNavigationBarOpen,
      toggleSideNavigationVisibility: () =>
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
