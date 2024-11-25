import * as React from 'react';

import {
  ArrowDownward,
  ArrowUpward,
  ArrowsSort,
} from '@livechat/design-system-icons';
import cx from 'clsx';

import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { useTable } from './hooks';
import { ITableProps, SortOrder } from './types';

import styles from './Table.module.scss';

const baseClass = 'table';
const headerClass = `${baseClass}__header`;
const rowClass = `${baseClass}__row`;
const cellClass = `${baseClass}__cell`;
const headerCellClass = `${headerClass}__cell`;
const selectedClass = `${baseClass}__selected`;
const resizerClass = `${baseClass}__resizer`;

export const Table = <T,>({
  data,
  columns,
  stripped,
  size = 'small',
  pin,
  selectable,
  getRowId,
  resizable,
  selectedRows,
  onSelectionChange,
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
    const target = event.currentTarget as HTMLElement;
    const startWidth = columnWidths[index] || target.offsetWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        newWidths[index] = Math.max(50, startWidth + delta); // Minimalna szerokość

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
      const sortValueA = column.sortValue
        ? column.sortValue(a)
        : a[sortConfig.key as unknown as keyof T];
      const sortValueB = column.sortValue
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
        <div className={styles[`${selectedClass}`]}>
          <Checkbox
            checked={selectedCount === data.length}
            onChange={toggleSelectAll}
          />
          {selectedCount} <Text size="md">selected items</Text>
        </div>
      )}
      <table
        className={cx(
          styles[`${baseClass}`],
          styles[`${baseClass}--${size}`],
          styles[`${baseClass}--pinned_${pin}`],
          {
            [styles[`${baseClass}--stripped`]]: stripped,
          }
        )}
      >
        <thead>
          <tr className={cx(styles[`${headerClass}`], styles[`${rowClass}`])}>
            {selectable && <th />}
            {columns.map((column, index) => (
              <th
                key={String(column.key)}
                ref={(el) => (columnRefs.current[index] = el)}
                className={cx({
                  [styles[`${headerCellClass}--hoverDisabled`]]:
                    !column.sortable,
                })}
                onMouseEnter={() => setHoveredColumnIndex(index)}
                onMouseLeave={() => setHoveredColumnIndex(null)}
              >
                <span
                  className={cx(styles[`${headerCellClass}`])}
                  onClick={() => handleSort(column.key)}
                >
                  {column.header}

                  {sortConfig.key !== column.key &&
                  sortConfig.direction === SortOrder.None &&
                  hoveredColumnIndex === index &&
                  column.sortable ? (
                    <Icon source={ArrowsSort} kind="subtle" />
                  ) : null}

                  {sortConfig.key === column.key &&
                  sortConfig.direction !== SortOrder.None ? (
                    <Icon
                      source={
                        sortConfig.direction === SortOrder.Ascending
                          ? ArrowDownward
                          : ArrowUpward
                      }
                      kind="primary"
                    />
                  ) : null}
                  {resizable && (
                    <span
                      className={styles[`${resizerClass}`]}
                      onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => {
            const rowId = getRowId(row);

            return (
              <tr key={rowId} className={styles[`${rowClass}`]}>
                {selectable && (
                  <td>
                    <Checkbox
                      checked={isSelected(rowId)}
                      onChange={() => toggleRowSelection(rowId)}
                    />
                  </td>
                )}
                {columns.map((column, index) => (
                  <td
                    key={String(column.key)}
                    className={styles[`${cellClass}`]}
                    style={{ width: `${columnWidths[index]}px` }}
                  >
                    {row[column.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
