import { useEffect } from 'react';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { Text } from '../Typography';

export interface ReadOnlyTextProps {
  /**
   * The value to display
   */
  value?: string;
  /**
   * Text to show when no value is provided
   */
  noDataFallbackText?: string;
}

export const ReadOnlyText = ({
  value,
  noDataFallbackText = 'No data',
}: ReadOnlyTextProps) => {
  const { setIsEmpty } = useReadOnlyFormFieldContext();

  useEffect(() => {
    if (!value) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [value]);

  return (
    <Text
      noMargin
      semiBold={!!value}
      customColor={!value ? 'var(--content-basic-secondary)' : undefined}
      role="textbox"
      aria-readonly="true"
    >
      {value || noDataFallbackText}
    </Text>
  );
};
