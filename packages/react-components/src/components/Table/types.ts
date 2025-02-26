import * as React from 'react';

export type BaseColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
};

export type TableColumn<T> = BaseColumn<T> &
  (
    | { sortable?: false }
    | { sortable: true; sortValue: (row: T) => string | number }
  );

export type TableSize = 'small' | 'medium' | 'large';

export type PinOptions = 'header' | 'leftColumn';

export type StrippedOptions = 'rows' | 'columns';

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
  None = 'none',
}

type BaseTableProps<T> = {
  /**
   * The data to be displayed in the table. Each item represents a row.
   */
  data: T[];
  /**
   * The configuration for table columns, including keys, headers, and optional sorting logic.
   */
  columns: Array<TableColumn<T>>;
  /**
   * The parameter allows you to customize alternating background colors for rows
   * or columns in the table, enhancing readability and visual separation. Allowed values
   * are 'rows' or 'columns'
   */
  stripped?: StrippedOptions;
  /**
   * Specifies the size of the table, which affects row height and spacing.
   * Options: 'small', 'medium', 'large'.
   */
  size?: TableSize;
  /**
   * Determines if certain table features, like the header, should remain pinned.
   * Currently supports only `header` and `leftColumn` pinning.
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
   * Sets the `data-testid` attribute, allowing the table to be easily selected in automated tests.
   */
  testId?: string;
};

type NonSelectableTableProps<T> = BaseTableProps<T> & {
  selectable?: false;
  selectedRows?: never;
  onSelectionChange?: never;
  rowSelectionMessage?: never;
  rowActions?: never;
};

type SelectableTableProps<T> = BaseTableProps<T> & {
  /**
   * Enables row selection mode, adding checkboxes to each row and the header for selection.
   */
  selectable: true;
  /**
   * A set of currently selected row IDs. Useful for controlling the selection state externally.
   */
  selectedRows: Set<string | number>;
  /**
   * A callback function triggered when the selected rows change.
   * @param selectedIds - A set of selected row IDs.
   */
  onSelectionChange: (selectedIds: Set<string | number>) => void;
  /**
   * Defines a customizable message to display the count of selected rows in the table. By default,
   * the message appears as "{count} selected items".
   */
  rowSelectionMessage?: React.ReactNode;
  /**
   * Allows you to define a custom action bar that appears when rows are selected. The action bar
   * can contain buttons or other UI elements for performing bulk operations on the selected rows,
   * such as "Delete All" or "Export."
   */
  rowActions?: React.ReactNode;
};

export type ITableProps<T> =
  | NonSelectableTableProps<T>
  | SelectableTableProps<T>;

export interface SortConfig<T> {
  key: keyof T | null;
  direction: SortOrder;
}

export type Data = {
  id: number;
  name: string;
  age: number;
  role: string;
  action: React.ReactNode;
};

export interface DataForPinningExample {
  userId: number;
  fullName: string;
  years: number;
  jobTitle: string;
  team: string;
  office: string;
  availability: string;
  workExperience: string;
  income: string;
  controls: React.ReactNode;
}
