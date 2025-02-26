import * as React from 'react';

import cx from 'clsx';

import { Checkbox } from '../Checkbox';
import { Text } from '../Typography';

import { TableColumn } from './types';

import styles from './TableRow.module.scss';

const baseClass = 'row';

interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
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
    <tr
      className={cx(
        styles[baseClass],
        isSelected(rowId) ? styles[`${baseClass}__selected`] : undefined
      )}
    >
      {selectable && (
        <td
          role="cell"
          aria-selected={isSelected(rowId)}
          className={styles[`${baseClass}__select-cell`]}
        >
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
