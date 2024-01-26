import * as React from 'react';

import { Table } from '../../components/Table/Table';

import { RadiusShape } from './types';

import styles from './RadiusTable.module.scss';

interface IColorTableProps {
  data: RadiusShape[];
}

export const RadiusTable: React.FC<IColorTableProps> = ({ data }) => {
  return (
    <Table
      data={data}
      renderExample={(token) => (
        <div
          className={styles['radius-example']}
          style={{ borderRadius: `var(${token})` }}
        />
      )}
      columnNames={['Enum', 'Token', 'Size', 'Usage']}
    />
  );
};
