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
  /**
   * The data to be displayed in the table. Each item represents a row.
   */
  data: T[];
  /**
   * The configuration for table columns, including keys, headers, and optional sorting logic.
   */
  columns: Column<T>[];
  /**
   * Whether to display alternating row background colors for better readability.
   */
  stripped?: boolean;
  /**
   * Specifies the size of the table, which affects row height and spacing.
   * Options: 'small', 'medium', 'large'.
   */
  size?: TableSize;
  /**
   * Determines if certain table features, like the header, should remain pinned.
   * Currently supports only `header` pinning.
   */
  pin?: PinOptions;
  /**
   * A function that returns a unique identifier for each row, used for selection and key assignment.
   * @param item - The data item representing a row.
   * @returns A unique identifier (string or number) for the row.
   */
  getRowId: (item: T) => string | number;
  /**
   * Enables or disables the ability to resize columns by dragging the edges of headers.
   */
  resizable?: boolean;
  /**
   * Enables row selection mode, adding checkboxes to each row and the header for selection.
   */
  selectable?: true;
  /**
   * A set of currently selected row IDs. Useful for controlling the selection state externally.
   */
  selectedRows?: Set<string | number>;
  /**
   * A callback function triggered when the selected rows change.
   * @param selectedIds - A set of selected row IDs.
   */
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
}

export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortOrder;
}
