import * as React from 'react';

interface AppFrameContextProps {
  isSubNavBarVisible: boolean;
  toggleSubNavBarVisibility: () => void;
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
  isSubNavBarVisible?: boolean;
}

export const AppFrameProvider: React.FC<AppFrameProviderProps> = ({
  children,
  isSubNavBarVisible = true,
}) => {
  const [isSubNavBarOpen, setIsSubNavBarOpen] =
    React.useState<boolean>(isSubNavBarVisible);

  const value = React.useMemo(
    () => ({
      isSubNavBarVisible: isSubNavBarOpen,
      toggleSubNavBarVisibility: () => setIsSubNavBarOpen(!isSubNavBarOpen),
    }),
    [isSubNavBarOpen, setIsSubNavBarOpen]
  );

  return (
    <AppFrameContext.Provider value={value}>
      {children}
    </AppFrameContext.Provider>
  );
};
