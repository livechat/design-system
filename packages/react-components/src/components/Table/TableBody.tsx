import { TableRow } from './TableRow';
import { TableColumn } from './types';

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  getRowId: (row: T) => string | number;
  columnWidths: (number | undefined)[];
  selectable?: boolean;
  isSelected: (id: string | number) => boolean;
  toggleRowSelection: (id: string | number) => void;
}

export const TableBody = <T,>({
  data,
  columns,
  getRowId,
  columnWidths,
  selectable,
  isSelected,
  toggleRowSelection,
}: TableBodyProps<T>) => {
  return (
    <tbody role="rowgroup">
      {data.map((row) => {
        const rowId = getRowId(row);

        return (
          <TableRow
            key={rowId}
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            selectable={selectable}
            isSelected={isSelected}
            toggleRowSelection={toggleRowSelection}
            rowId={getRowId(row)}
          />
        );
      })}
    </tbody>
  );
};
