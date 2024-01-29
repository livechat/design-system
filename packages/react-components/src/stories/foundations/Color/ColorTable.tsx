import * as React from 'react';

import { Table } from '../../components/Table/Table';

import { ColorShape } from './types';

import styles from './ColorTable.module.scss';

interface IColorTableProps {
  data: ColorShape[];
}

export const ColorTable: React.FC<IColorTableProps> = ({ data }) => {
  return (
    <Table
      data={data}
      renderExample={(token) => (
        <div
          className={styles['color-example']}
          style={{ backgroundColor: `var(${token})` }}
        />
      )}
      columnNames={['Enum', 'Token', 'Usage']}
    />
  );
};
