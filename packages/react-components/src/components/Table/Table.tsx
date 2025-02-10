import * as React from 'react';

import cx from 'clsx';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Text } from '../Typography';

import { useTable } from './hooks';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { ITableProps, SortOrder } from './types';

import styles from './Table.module.scss';

const baseClass = 'table';
const selectedClass = `${baseClass}__selected`;

export const Table = <T,>({
  data,
  columns,
  stripped,
  size = 'medium',
  pin,
  selectable,
  getRowId,
  resizable,
  selectedRows,
  onSelectionChange,
  rowSelectionMessage,
  rowActions,
  testId,
}: ITableProps<T>) => {
  const columnRefs = React.useRef<(HTMLTableCellElement | null)[]>([]);
  const [hoveredColumnIndex, setHoveredColumnIndex] = React.useState<
    number | null
  >(null);

  const { isSelected, toggleRowSelection, toggleSelectAll, selectedCount } =
    useTable({
      data,
      getRowId,
      selectedRows: selectedRows,
      onSelectionChange: onSelectionChange,
    });

  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null;
    direction: SortOrder;
  }>({
    key: null,
    direction: SortOrder.None,
  });

  const [columnWidths, setColumnWidths] = React.useState<
    (number | undefined)[]
  >(Array(columns.length).fill(undefined));

  const handleMouseDown = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth =
      columnWidths[index] || (event.currentTarget as HTMLElement).offsetWidth;
    const nextWidth = columnWidths[index + 1] || 0;

    const SCALING_FACTOR = 1.05;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = (moveEvent.clientX - startX) * SCALING_FACTOR;

      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        const newWidth = Math.max(50, startWidth + delta);
        const adjustedNextWidth = Math.max(50, nextWidth - delta);

        newWidths[index] = newWidth;

        if (index + 1 < newWidths.length) {
          newWidths[index + 1] = adjustedNextWidth;
        }

        return newWidths;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSort = (key: keyof T) => {
    const column = columns.find((col) => col.key === key);
    if (!column || column.sortable === false) return;

    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        let nextDirection: SortOrder;
        switch (prevConfig.direction) {
          case SortOrder.None:
            nextDirection = SortOrder.Ascending;
            break;
          case SortOrder.Ascending:
            nextDirection = SortOrder.Descending;
            break;
          default:
            nextDirection = SortOrder.None;
        }

        return {
          key: nextDirection === SortOrder.None ? null : key,
          direction: nextDirection,
        };
      } else {
        return { key, direction: SortOrder.Ascending };
      }
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === SortOrder.None) {
      return data;
    }

    const column = columns.find((col) => col.key === sortConfig.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const sortValueA = column.sortable
        ? column.sortValue(a)
        : a[sortConfig.key as unknown as keyof T];
      const sortValueB = column.sortable
        ? column.sortValue(b)
        : b[sortConfig.key as unknown as keyof T];

      if (sortValueA < sortValueB) {
        return sortConfig.direction === SortOrder.Ascending ? -1 : 1;
      }
      if (sortValueA > sortValueB) {
        return sortConfig.direction === SortOrder.Ascending ? 1 : -1;
      }

      return 0;
    });
  }, [data, sortConfig, columns]);

  React.useEffect(() => {
    const initialWidths = columnRefs.current.map(
      (ref) => ref?.offsetWidth || 0
    );
    setColumnWidths(initialWidths);
  }, []);

  return (
    <>
      {selectable && (
        <div className={cx(styles[`${selectedClass}`])}>
          <div className={styles[`${selectedClass}__content`]}>
            <Checkbox
              className={styles[`${selectedClass}__checkbox`]}
              checked={selectedCount === data.length}
              indeterminate={
                selectedCount !== undefined &&
                selectedCount > 0 &&
                selectedCount < data.length
              }
              onChange={toggleSelectAll}
            />
            {rowSelectionMessage || (
              <Text noMargin bold size="sm">
                {selectedCount} selected
              </Text>
            )}
            <div className={styles[`${selectedClass}__divider`]} />
            <Button
              size="compact"
              onClick={toggleSelectAll}
              kind="link-inverted"
            >
              {selectedCount === data.length
                ? `Deselect all (${data.length})`
                : `Select all (${data.length})`}
            </Button>
          </div>
          <div>{rowActions}</div>
        </div>
      )}
      <table
        className={cx(
          styles[`${baseClass}`],
          styles[`${baseClass}--${size}`],
          styles[`${baseClass}--pinned_${pin}`],
          styles[`${baseClass}--stripped_${stripped}`]
        )}
        data-testid={testId}
      >
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          handleSort={handleSort}
          resizable={resizable}
          handleMouseDown={handleMouseDown}
          columnRefs={columnRefs}
          selectable={selectable}
          hoveredColumnIndex={hoveredColumnIndex}
          setHoveredColumnIndex={setHoveredColumnIndex}
        />
        <TableBody
          data={sortedData}
          columns={columns}
          getRowId={getRowId}
          columnWidths={columnWidths}
          selectable={selectable}
          isSelected={isSelected}
          toggleRowSelection={toggleRowSelection}
        />
      </table>
    </>
  );
};
