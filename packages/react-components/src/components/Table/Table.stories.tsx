import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import cx from 'clsx';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Button } from '../Button';

import {
  dataForPinningExample,
  columnsForPinningExample,
} from './stories-constants';
import { generateData } from './stories-helpers';
import { Table } from './Table';
import { Column, Data, DataForPinningExample } from './types';

import styles from './Table.module.scss';
import storyStyles from './Table.stories.module.scss';

export default {
  title: 'Components/Table',
  component: Table,
  decorators: [
    (Story: StoryFn) => (
      <div
        className={cx(isChromatic() && storyStyles['table-width-chromatic'])}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Table>;

const actionBarClass = 'action-bar';
const dividerClass = `${actionBarClass}__divider`;

const columns: Column<Data>[] = [
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

export const Default: StoryFn = () => {
  const getRowId = (row: Data) => row.id;
  const data = generateData(4);

  return (
    <Table size="medium" data={data} columns={columns} getRowId={getRowId} />
  );
};

export const Resizing: StoryFn = () => {
  const getRowId = (row: Data) => row.id;
  const data = generateData(4);

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

export const Stripped: StoryFn = () => {
  const getRowId = (row: Data) => row.id;
  const data = generateData(4);

  return (
    <>
      <StoryDescriptor title="Rows">
        <Table
          size="medium"
          data={data}
          columns={columns}
          getRowId={getRowId}
          stripped="rows"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Columns">
        <Table
          size="medium"
          data={data}
          columns={columns}
          getRowId={getRowId}
          stripped="columns"
        />
      </StoryDescriptor>
    </>
  );
};

export const Sizes: StoryFn = (): React.ReactElement => {
  const getRowId = (row: Data) => row.id;
  const data = generateData(4);

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

export const Pinning: StoryFn = () => {
  const getRowId = (row: Data) => row.id;
  const data = generateData(10);

  return (
    <>
      <StoryDescriptor title="Header">
        <Table
          size="large"
          data={data}
          columns={columns}
          getRowId={getRowId}
          pin="header"
        />
      </StoryDescriptor>
      <StoryDescriptor title="Left Column" />
      <StoryDescriptor title="" style={{ overflow: 'scroll' }}>
        <Table
          size="medium"
          data={dataForPinningExample}
          columns={columnsForPinningExample}
          getRowId={(row: DataForPinningExample) => row.userId}
          pin="leftColumn"
        />
      </StoryDescriptor>
    </>
  );
};

export const MultiSelect: StoryFn = () => {
  const getRowId = (row: Data) => row.id;
  const data = generateData(4);
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
