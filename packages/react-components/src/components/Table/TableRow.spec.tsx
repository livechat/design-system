import { render, fireEvent, vi } from 'test-utils';

import { TableRow } from './TableRow';
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

const row: Data = { id: 1, name: 'John Doe', age: 28, role: 'Developer' };
const columnWidths = [50, 100, 75, 150];

describe('<TableRow> component', () => {
  it('should render a row with provided data and columns', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <TableRow
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            selectable={false}
            isSelected={() => false}
            toggleRowSelection={() => {}}
            rowId={row.id}
          />
        </tbody>
      </table>
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('28')).toBeInTheDocument();
    expect(getByText('Developer')).toBeInTheDocument();
  });

  it('should apply column widths to cells', () => {
    const { getAllByRole } = render(
      <table>
        <tbody>
          <TableRow
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            selectable={false}
            isSelected={() => false}
            toggleRowSelection={() => {}}
            rowId={row.id}
          />
        </tbody>
      </table>
    );

    const cells = getAllByRole('cell');
    expect(cells[0]).toHaveStyle('width: 50px');
    expect(cells[1]).toHaveStyle('width: 100px');
    expect(cells[2]).toHaveStyle('width: 75px');
    expect(cells[3]).toHaveStyle('width: 150px');
  });

  it('should render a checkbox if selectable is true', () => {
    const toggleRowSelection = vi.fn();
    const { getByRole } = render(
      <table>
        <tbody>
          <TableRow
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            selectable={true}
            isSelected={(id) => id === row.id}
            toggleRowSelection={toggleRowSelection}
            rowId={row.id}
          />
        </tbody>
      </table>
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(toggleRowSelection).toHaveBeenCalledWith(row.id);
  });

  it('should render aria-selected attribute correctly', () => {
    const { getByRole } = render(
      <table>
        <tbody>
          <TableRow
            row={row}
            columns={columns}
            columnWidths={columnWidths}
            selectable={true}
            isSelected={(id) => id === row.id}
            toggleRowSelection={() => {}}
            rowId={row.id}
          />
        </tbody>
      </table>
    );

    const cell = getByRole('cell', { name: '' });
    expect(cell).toHaveAttribute('aria-selected', 'true');
  });
});
