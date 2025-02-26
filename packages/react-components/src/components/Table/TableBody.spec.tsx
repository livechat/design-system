import { render, fireEvent, vi } from 'test-utils';

import { TableBody } from './TableBody';
import { TableColumn } from './types';

type Data = {
  id: number;
  name: string;
  age: number;
  role: string;
};

const columns: TableColumn<Data>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { key: 'role', header: 'Role' },
];

const data: Data[] = [
  { id: 1, name: 'John Doe', age: 28, role: 'Developer' },
  { id: 2, name: 'Jane Smith', age: 34, role: 'Designer' },
  { id: 3, name: 'Alice Johnson', age: 42, role: 'Manager' },
];

describe('<TableBody> component', () => {
  const getRowId = (row: Data) => row.id;

  it('renders rows for each data entry', () => {
    const { getAllByRole } = render(
      <table>
        <TableBody
          data={data}
          columns={columns}
          getRowId={getRowId}
          columnWidths={[]}
          selectable={false}
          isSelected={() => false}
          toggleRowSelection={() => {}}
        />
      </table>
    );

    const rows = getAllByRole('row');
    expect(rows.length).toBe(data.length);
  });

  it('renders selectable rows with checkboxes when selectable is true', () => {
    const { getAllByRole } = render(
      <table>
        <TableBody
          data={data}
          columns={columns}
          getRowId={getRowId}
          columnWidths={[]}
          selectable={true}
          isSelected={(id) => id === 1}
          toggleRowSelection={() => {}}
        />
      </table>
    );

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes.length).toBe(data.length);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('calls toggleRowSelection when a checkbox is clicked', () => {
    const toggleRowSelection = vi.fn();

    const { getAllByRole } = render(
      <table>
        <TableBody
          data={data}
          columns={columns}
          getRowId={getRowId}
          columnWidths={[]}
          selectable={true}
          isSelected={() => false}
          toggleRowSelection={toggleRowSelection}
        />
      </table>
    );

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(toggleRowSelection).toHaveBeenCalledWith(2);
  });

  it('passes correct column widths to TableRow', () => {
    const columnWidths = [100, 200, 150, 250];
    const { getAllByRole } = render(
      <table>
        <TableBody
          data={data}
          columns={columns}
          getRowId={getRowId}
          columnWidths={columnWidths}
          selectable={false}
          isSelected={() => false}
          toggleRowSelection={() => {}}
        />
      </table>
    );

    const cells = getAllByRole('cell');
    cells.forEach((cell, index) => {
      const expectedWidth = columnWidths[index % columnWidths.length];
      if (expectedWidth) {
        expect(cell).toHaveStyle(`width: ${expectedWidth}px`);
      }
    });
  });
});
