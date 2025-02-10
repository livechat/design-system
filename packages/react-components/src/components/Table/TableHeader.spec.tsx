import * as React from 'react';

import { render, fireEvent, vi } from 'test-utils';

import { TableHeader } from './TableHeader';
import { Column, SortOrder } from './types';

type Data = {
  id: number;
  name: string;
  age: number;
  role: string;
};

const columns: Column<Data>[] = [
  { key: 'id', header: 'ID', sortable: true, sortValue: (row) => row.id },
  { key: 'name', header: 'Name', sortable: true, sortValue: (row) => row.name },
  { key: 'age', header: 'Age', sortable: false },
  { key: 'role', header: 'Role', sortable: true, sortValue: (row) => row.role },
];

describe('<TableHeader> component', () => {
  const sortConfig = { key: null, direction: SortOrder.None };
  const mockHandleSort = vi.fn();
  const mockHandleMouseDown = vi.fn();
  const columnRefs = { current: Array(columns.length).fill(null) };
  const setHoveredColumnIndex = vi.fn();

  it('renders all columns', () => {
    const { getAllByRole } = render(
      <table>
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          handleSort={mockHandleSort}
          resizable={false}
          handleMouseDown={mockHandleMouseDown}
          columnRefs={columnRefs}
          selectable={false}
          hoveredColumnIndex={null}
          setHoveredColumnIndex={setHoveredColumnIndex}
        />
      </table>
    );

    const headers = getAllByRole('columnheader');
    expect(headers.length).toBe(columns.length);
    columns.forEach((col) =>
      expect(headers.some((header) => header.textContent === col.header)).toBe(
        true
      )
    );
  });

  it('calls handleSort when a sortable column is clicked', () => {
    const { getByText } = render(
      <table>
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          handleSort={mockHandleSort}
          resizable={false}
          handleMouseDown={mockHandleMouseDown}
          columnRefs={columnRefs}
          selectable={false}
          hoveredColumnIndex={null}
          setHoveredColumnIndex={setHoveredColumnIndex}
        />
      </table>
    );

    const sortableColumn = getByText('ID');
    fireEvent.click(sortableColumn);

    expect(mockHandleSort).toHaveBeenCalledWith('id');
  });

  it('does not call handleSort when a non-sortable column is clicked', () => {
    const handleSort = vi.fn();

    const columns: Column<Data>[] = [
      { key: 'id', header: 'ID', sortable: true, sortValue: (row) => row.id },
      { key: 'name', header: 'Name', sortable: false },
    ];

    const { getByText } = render(
      <TableHeader
        columns={columns}
        sortConfig={{ key: null, direction: SortOrder.None }}
        handleSort={handleSort}
        resizable={false}
        handleMouseDown={vi.fn()}
        columnRefs={React.createRef()}
        hoveredColumnIndex={null}
        setHoveredColumnIndex={vi.fn()}
      />
    );

    const nameHeader = getByText('Name');
    fireEvent.click(nameHeader);

    expect(handleSort).not.toHaveBeenCalled();
  });

  it('handles resizable columns', () => {
    const { getAllByRole } = render(
      <table>
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          handleSort={mockHandleSort}
          resizable={true}
          handleMouseDown={mockHandleMouseDown}
          columnRefs={columnRefs}
          selectable={false}
          hoveredColumnIndex={null}
          setHoveredColumnIndex={setHoveredColumnIndex}
        />
      </table>
    );

    const resizers = getAllByRole('button', { name: /resize/i });
    expect(resizers.length).toBe(columns.length);
    fireEvent.mouseDown(resizers[0]);

    expect(mockHandleMouseDown).toHaveBeenCalledWith(0, expect.any(Object));
  });
});
