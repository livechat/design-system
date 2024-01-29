import * as React from 'react';

import { Table } from '../../components/Table/Table';

import { ShadowShape } from './types';

import styles from './ShadowTable.module.scss';

interface IColorTableProps {
  data: ShadowShape[];
}

export const ShadowTable: React.FC<IColorTableProps> = ({ data }) => {
  return (
    <Table
      data={data}
      renderExample={(token) => (
        <div
          className={styles['shadow-example']}
          style={{ boxShadow: `var(${token})` }}
        />
      )}
      columnNames={['Enum', 'Token', 'Usage']}
    />
  );
};
