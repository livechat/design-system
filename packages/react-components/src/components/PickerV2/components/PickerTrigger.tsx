import * as React from 'react';

interface PickerTriggerProps {
  setReference: (element: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
}

export const PickerTrigger: React.FC<
  React.PropsWithChildren<PickerTriggerProps>
> = ({ setReference, getReferenceProps }) => {
  return (
    <button ref={setReference} {...getReferenceProps()}>
      Trigger
    </button>
  );
};
