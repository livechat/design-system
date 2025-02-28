import { render, fireEvent, vi } from 'test-utils';

import { Table } from './Table';
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

describe('<Table> component', () => {
  const getRowId = (row: Data) => row.id;

  it('should allow row selection if selectable prop is enabled', () => {
    const onSelectionChange = vi.fn();
    const selectedRows = new Set<string>();
    const { getAllByRole } = render(
      <Table
        data={data}
        columns={columns}
        getRowId={getRowId}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={onSelectionChange}
      />
    );

    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes.length).toBe(data.length + 1);

    fireEvent.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenCalledWith(new Set([1]));
  });
});
