import { ReactNode, createContext, useContext, useState } from 'react';
import type { FC } from 'react';

interface ReadOnlyFormFieldContextValue {
  readOnly: boolean;
  isEmpty: boolean;
  setIsEmpty: (isEmpty: boolean) => void;
}

const ReadOnlyFormFieldContext = createContext<ReadOnlyFormFieldContextValue>({
  readOnly: false,
  isEmpty: false,
  setIsEmpty: () => {},
});

export interface ReadOnlyFormFieldContextProps {
  readOnly?: boolean;
  children?: ReactNode;
  defaultIsEmpty?: boolean;
}

export const ReadOnlyFormFieldContextProvider: FC<
  ReadOnlyFormFieldContextProps
> = ({ children, readOnly = false, defaultIsEmpty = false }) => {
  const [isEmpty, setIsEmpty] = useState(defaultIsEmpty);

  return (
    <ReadOnlyFormFieldContext.Provider
      value={{
        readOnly,
        isEmpty,
        setIsEmpty,
      }}
    >
      {children}
    </ReadOnlyFormFieldContext.Provider>
  );
};

export const useReadOnlyFormFieldContext = () =>
  useContext(ReadOnlyFormFieldContext);

export default ReadOnlyFormFieldContext;
