import { useCallback } from 'react';

interface UseTableProps<T> {
  data: T[];
  getRowId: (row: T) => string | number;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
}

interface IUseTable {
  isSelected: (id: string | number) => boolean;
  toggleRowSelection: (id: string | number) => void;
  toggleSelectAll: () => void;
  selectedCount?: number;
}

export const useTable = <T>({
  data,
  getRowId,
  selectedRows,
  onSelectionChange,
}: UseTableProps<T>): IUseTable => {
  const isSelected = useCallback(
    (id: string | number) => !!selectedRows?.has(id),
    [selectedRows]
  );

  const toggleRowSelection = useCallback(
    (id: string | number) => {
      const updatedSelectedRows = new Set(selectedRows);
      if (updatedSelectedRows.has(id)) {
        updatedSelectedRows.delete(id);
      } else {
        updatedSelectedRows.add(id);
      }
      onSelectionChange?.(updatedSelectedRows);
    },
    [selectedRows, onSelectionChange]
  );

  const toggleSelectAll = useCallback(() => {
    const allRowIds = new Set(data.map(getRowId));
    const allSelected = selectedRows?.size === data.length;

    const updatedSelectedRows = allSelected
      ? new Set<string | number>()
      : allRowIds;
    onSelectionChange?.(updatedSelectedRows);
  }, [data, getRowId, selectedRows, onSelectionChange]);

  return {
    isSelected,
    toggleRowSelection,
    toggleSelectAll,
    selectedCount: selectedRows?.size,
  };
};
