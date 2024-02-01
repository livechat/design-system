import * as React from 'react';

import { Table } from '../../components/Table/Table';

import { TransitionShape } from './types';

interface ITransitionTableProps {
  data: TransitionShape[];
}

export const TransitionTable: React.FC<ITransitionTableProps> = ({ data }) => {
  return <Table data={data} columnNames={['Enum', 'Token', 'Size', 'Usage']} />;
};
