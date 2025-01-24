import { ReactNode, createContext, useContext } from 'react';
import type { FC } from 'react';

interface ReadOnlyFormFieldContextValue {
  readOnly: boolean;
}

const ReadOnlyFormFieldContext = createContext<ReadOnlyFormFieldContextValue>({
  readOnly: false,
});

export interface ReadOnlyFormFieldContextProps {
  readOnly?: boolean;
  children?: ReactNode;
}

export const ReadOnlyFormFieldContextProvider: FC<
  ReadOnlyFormFieldContextProps
> = ({ children, readOnly = false }) => {
  return (
    <ReadOnlyFormFieldContext.Provider
      value={{
        readOnly,
      }}
    >
      {children}
    </ReadOnlyFormFieldContext.Provider>
  );
};

export const useReadOnlyFormFieldContext = () =>
  useContext(ReadOnlyFormFieldContext);

export default ReadOnlyFormFieldContext;
