import * as React from 'react';

import { Checkbox } from '../Checkbox';
import { Text } from '../Typography';

import { Column } from './types';

import styles from './TableRow.module.scss';

const baseClass = 'row';

interface TableRowProps<T> {
  row: T;
  columns: Column<T>[];
  columnWidths: (number | undefined)[];
  selectable?: boolean;
  isSelected: (id: string | number) => boolean;
  toggleRowSelection: (id: string | number) => void;
  rowId: string | number;
}

export const TableRow = <T,>({
  row,
  columns,
  columnWidths,
  selectable,
  isSelected,
  toggleRowSelection,
  rowId,
}: TableRowProps<T>) => {
  return (
    <tr className={styles[baseClass]}>
      {selectable && (
        <td role="cell" aria-selected={isSelected(rowId)}>
          <Checkbox
            checked={isSelected(rowId)}
            onChange={() => toggleRowSelection(rowId)}
          />
        </td>
      )}
      {columns.map((column, index) => (
        <td
          key={String(column.key)}
          style={{
            width: columnWidths[index] ? `${columnWidths[index]}px` : 'auto',
          }}
          role="cell"
          data-column={String(column.key)}
        >
          <Text size="md" noMargin>
            {row[column.key] as React.ReactNode}
          </Text>
        </td>
      ))}
    </tr>
  );
};
