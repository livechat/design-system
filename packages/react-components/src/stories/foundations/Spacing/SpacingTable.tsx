import * as React from 'react';

import { Table } from '../../components/Table/Table';

import { SpacingShape } from './types';

import styles from './SpacingTable.module.scss';

interface IColorTableProps {
  data: SpacingShape[];
}

export const SpacingTable: React.FC<IColorTableProps> = ({ data }) => {
  return (
    <Table
      data={data}
      renderExample={(token) => (
        <div
          className={styles['spacing-example']}
          style={{ height: `var(${token})` }}
        />
      )}
      columnNames={['Enum', 'Token', 'Size', 'Usage']}
    />
  );
};
