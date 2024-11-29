import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import cx from 'clsx';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Button } from '../Button';

import { Table } from './Table';
import { Column } from './types';

import styles from './Table.module.scss';

export default {
  title: 'Components/Table',
  component: Table,
} as Meta<typeof Table>;

const actionBarClass = 'action-bar';
const dividerClass = `${actionBarClass}__divider`;

type Data = {
  id: number;
  name: string;
  age: number;
  role: string;
  action: React.ReactNode;
};

const columns: Column<(typeof data)[0]>[] = [
  {
    key: 'id',
    header: 'ID',
    sortable: true,
    sortValue: (item: Data) => item.id,
  },
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    sortValue: (item: Data) => item.name.toLowerCase(),
  },
  {
    key: 'age',
    header: 'Age',
    sortable: true,
    sortValue: (item: Data) => item.age,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    sortValue: (item: Data) => item.role,
  },
  {
    key: 'action',
    header: 'Action',
  },
];

const data: Data[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 28,
    role: 'Developer',
    action: <Button size="xcompact">Edit</Button>,
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 34,
    role: 'Designer',
    action: <Button size="xcompact">Edit</Button>,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    age: 42,
    role: 'Manager',
    action: <Button size="xcompact">Edit</Button>,
  },
  {
    id: 4,
    name: 'Mike Williams',
    age: 25,
    role: 'Intern',
    action: <Button size="xcompact">Edit</Button>,
  },
];

export const Default: StoryFn = () => {
  const getRowId = (row: Data) => row.id;

  return (
    <Table size="medium" data={data} columns={columns} getRowId={getRowId} />
  );
};

export const Resizing: StoryFn = () => {
  const getRowId = (row: Data) => row.id;

  return (
    <Table
      size="medium"
      data={data}
      columns={columns}
      getRowId={getRowId}
      resizable
    />
  );
};

export const Sizes: StoryFn = (): React.ReactElement => {
  const getRowId = (row: Data) => row.id;

  return (
    <>
      <StoryDescriptor title="Large">
        <Table size="large" data={data} columns={columns} getRowId={getRowId} />
      </StoryDescriptor>
      <StoryDescriptor title="Medium">
        <Table
          size="medium"
          data={data}
          columns={columns}
          getRowId={getRowId}
        />
      </StoryDescriptor>
      <StoryDescriptor title="Small">
        <Table size="small" data={data} columns={columns} getRowId={getRowId} />
      </StoryDescriptor>
    </>
  );
};

const dataForPinnExample: Data[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 28,
    role: 'Developer',
    action: <Button>Edit</Button>,
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 34,
    role: 'Designer',
    action: <Button>Edit</Button>,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    age: 42,
    role: 'Manager',
    action: <Button>Edit</Button>,
  },
  {
    id: 4,
    name: 'Mike Williams',
    age: 25,
    role: 'Intern',
    action: <Button>Edit</Button>,
  },
  {
    id: 5,
    name: 'David Brown',
    age: 30,
    role: 'Developer',
    action: <Button>Edit</Button>,
  },
  {
    id: 6,
    name: 'Laura Wilson',
    age: 27,
    role: 'Designer',
    action: <Button>Edit</Button>,
  },
  {
    id: 7,
    name: 'Sam Green',
    age: 45,
    role: 'Manager',
    action: <Button>Edit</Button>,
  },
  {
    id: 8,
    name: 'Emily Clark',
    age: 22,
    role: 'Intern',
    action: <Button>Edit</Button>,
  },
  {
    id: 9,
    name: 'Chris Adams',
    age: 36,
    role: 'Developer',
    action: <Button>Edit</Button>,
  },
  {
    id: 10,
    name: 'Sophia Turner',
    age: 29,
    role: 'Designer',
    action: <Button>Edit</Button>,
  },
  {
    id: 11,
    name: 'James Taylor',
    age: 39,
    role: 'Manager',
    action: <Button>Edit</Button>,
  },
  {
    id: 12,
    name: 'Olivia Lewis',
    age: 24,
    role: 'Intern',
    action: <Button>Edit</Button>,
  },
  {
    id: 13,
    name: 'Daniel Evans',
    age: 32,
    role: 'Developer',
    action: <Button>Edit</Button>,
  },
  {
    id: 14,
    name: 'Mia Harris',
    age: 31,
    role: 'Designer',
    action: <Button>Edit</Button>,
  },
  {
    id: 15,
    name: 'Noah King',
    age: 40,
    role: 'Manager',
    action: <Button>Edit</Button>,
  },
  {
    id: 16,
    name: 'Liam Scott',
    age: 23,
    role: 'Intern',
    action: <Button>Edit</Button>,
  },
  {
    id: 17,
    name: 'Ethan White',
    age: 26,
    role: 'Developer',
    action: <Button>Edit</Button>,
  },
  {
    id: 18,
    name: 'Emma Hall',
    age: 35,
    role: 'Designer',
    action: <Button>Edit</Button>,
  },
  {
    id: 19,
    name: 'Benjamin Young',
    age: 41,
    role: 'Manager',
    action: <Button>Edit</Button>,
  },
  {
    id: 20,
    name: 'Ava Martinez',
    age: 21,
    role: 'Intern',
    action: <Button>Edit</Button>,
  },
];

export const Pinning: StoryFn = () => {
  const getRowId = (row: Data) => row.id;

  return (
    <Table
      size="medium"
      data={dataForPinnExample}
      columns={columns}
      getRowId={getRowId}
      pin="header"
    />
  );
};

export const Selecting: StoryFn = () => {
  const getRowId = (row: Data) => row.id;
  const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(
    new Set()
  );

  const Divider = () => <div className={cx(styles[dividerClass])} />;

  const rowActions = (
    <div className={cx(styles[actionBarClass])}>
      <Divider />
      <Button kind="link">Action</Button> <Button kind="link">Action</Button>
      <Divider />
      <Button kind="link">Action</Button> <Button kind="link">Action</Button>
    </div>
  );

  return (
    <Table
      size="medium"
      data={data}
      columns={columns}
      getRowId={getRowId}
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      rowActions={rowActions}
    />
  );
};
