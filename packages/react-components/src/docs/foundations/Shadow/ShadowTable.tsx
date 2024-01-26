import * as React from 'react';

import { handleCopyText } from '../../helpers';

import { ShadowShape } from './types';

import '../../components/Table/Table.css';

interface IColorTableProps {
  data: ShadowShape[];
}

export const ShadowTable: React.FC<IColorTableProps> = ({ data }) => {
  return (
    <table className="sb-unstyled">
      <thead>
        <tr>
          <th>Enum</th>
          <th>Token</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {data.map((shadow) => (
          <tr>
            <td onClick={() => handleCopyText(shadow.enum)}>
              <div
                className="color-example"
                style={{ backgroundColor: `var(${shadow.value})` }}
              />
              {shadow.enum}
            </td>
            <td>{shadow.value}</td>
            <td>{shadow.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
