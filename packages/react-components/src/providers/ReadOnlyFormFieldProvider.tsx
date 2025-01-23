import { ReactNode, createContext, useContext } from 'react';
import type { FC } from 'react';

interface ReadOnlyFormFieldContextValue {
  readonly: boolean;
}

const ReadOnlyFormFieldContext = createContext<ReadOnlyFormFieldContextValue>({
  readonly: false,
});

export interface ReadOnlyFormFieldContextProps {
  readonly?: boolean;
  children?: ReactNode;
}

export const ReadOnlyFormFieldContextProvider: FC<
  ReadOnlyFormFieldContextProps
> = ({ children, readonly = false }) => {
  return (
    <ReadOnlyFormFieldContext.Provider
      value={{
        readonly,
      }}
    >
      {children}
    </ReadOnlyFormFieldContext.Provider>
  );
};

export const useReadOnlyFormFieldContext = () =>
  useContext(ReadOnlyFormFieldContext);

export default ReadOnlyFormFieldContext;
