import * as React from 'react';

import {
  ArrowsSort,
  ArrowDownward,
  ArrowUpward,
} from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';

import { Column, SortOrder } from './types';

import styles from './TableHeader.module.scss';

const baseClass = 'header';
const headerCellClass = `${baseClass}__cell`;
const resizerClass = `${baseClass}__resizer`;
const contentClass = `${baseClass}__content`;

interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortConfig: { key: keyof T | null; direction: SortOrder };
  handleSort: (key: keyof T) => void;
  resizable?: boolean;
  handleMouseDown: (index: number, event: React.MouseEvent) => void;
  columnRefs: React.RefObject<(HTMLTableCellElement | null)[]>;
  selectable?: boolean;
  hoveredColumnIndex: number | null;
  setHoveredColumnIndex: (index: number | null) => void;
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
}: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr className={cx(styles[baseClass])}>
        {selectable && <th />}
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
          >
            <span
              onClick={() => handleSort(column.key)}
              className={styles[contentClass]}
            >
              {column.header}
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
              ) : (
                hoveredColumnIndex === index &&
                column.sortable && <Icon source={ArrowsSort} kind="subtle" />
              )}
              {resizable && (
                <span
                  className={styles[resizerClass]}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
