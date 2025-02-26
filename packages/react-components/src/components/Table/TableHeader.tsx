import * as React from 'react';

import {
  ArrowsSort,
  ArrowDownward,
  ArrowUpward,
  Call,
} from '@livechat/design-system-icons';
import cx from 'clsx';

import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { TableColumn, SortConfig, SortOrder } from './types';

import styles from './TableHeader.module.scss';

const baseClass = 'header';
const headerCellClass = `${baseClass}__cell`;
const resizerClass = `${baseClass}__resizer`;
const contentClass = `${baseClass}__content`;
const hiddenIconClass = `${baseClass}__hiddenIcon`;

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortConfig: { key: keyof T | null; direction: SortOrder };
  handleSort: (key: keyof T) => void;
  resizable?: boolean;
  handleMouseDown: (index: number, event: React.MouseEvent) => void;
  columnRefs: React.RefObject<(HTMLTableCellElement | null)[]>;
  selectable?: boolean;
  hoveredColumnIndex: number | null;
  setHoveredColumnIndex: (index: number | null) => void;
  selectedCount?: number;
  dataLength?: number;
  toggleSelectAll?: () => void;
}

function renderSortIcon<T>(
  sortConfig: SortConfig<T>,
  columnKey: keyof T,
  sortable: boolean,
  hovered: boolean
) {
  if (
    sortConfig.key === columnKey &&
    sortConfig.direction !== SortOrder.None &&
    sortable
  ) {
    return (
      <Icon
        source={
          sortConfig.direction === SortOrder.Ascending
            ? ArrowDownward
            : ArrowUpward
        }
        kind="primary"
      />
    );
  }
  if (hovered && sortable) {
    return <Icon source={ArrowsSort} kind="subtle" />;
  }

  return <Icon source={Call} className={styles[hiddenIconClass]} />;
}

export const TableHeader = <T,>({
  columns,
  sortConfig,
  handleSort,
  resizable,
  handleMouseDown,
  columnRefs,
  selectable,
  hoveredColumnIndex,
  setHoveredColumnIndex,
  selectedCount,
  dataLength,
  toggleSelectAll,
}: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr
        className={cx(styles[baseClass], {
          [styles[`${baseClass}--selectable`]]: selectable && !!selectedCount,
        })}
      >
        {selectable && (
          <th
            className={styles[`${baseClass}__select-cell`]}
            onClick={toggleSelectAll}
          >
            <Checkbox
              checked={selectedCount === dataLength}
              indeterminate={
                selectedCount !== undefined &&
                selectedCount > 0 &&
                selectedCount < (dataLength || 0)
              }
            />
          </th>
        )}
        {columns.map((column, index) => (
          <th
            key={String(column.key)}
            ref={(el) => {
              if (columnRefs.current) {
                columnRefs.current[index] = el;
              }
            }}
            className={cx({
              [styles[`${headerCellClass}--hoverDisabled`]]: !column.sortable,
            })}
            onMouseEnter={() => setHoveredColumnIndex(index)}
            onMouseLeave={() => setHoveredColumnIndex(null)}
            role="columnheader"
          >
            <span
              onClick={() => {
                if (column.sortable) {
                  handleSort(column.key);
                }
              }}
              className={styles[contentClass]}
            >
              <Text size="sm" bold noMargin>
                {column.header}
              </Text>

              {renderSortIcon(
                sortConfig,
                column.key,
                column.sortable ?? false,
                hoveredColumnIndex === index
              )}
              {resizable && (
                <span
                  className={styles[resizerClass]}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                  role="button"
                  aria-label="resize"
                />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
