export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  sortValue?: (item: T) => string | number;
};

export type TableSize = 'small' | 'medium' | 'large';

export type PinOptions = 'header';

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
  None = 'none',
}

export interface ITableProps<T> {
  data: T[];
  columns: Column<T>[];
  stripped?: boolean;
  size?: TableSize;
  pin?: PinOptions;
  getRowId: (item: T) => string | number;
  resizable?: boolean;
  selectable?: true;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
}

export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortOrder;
}
