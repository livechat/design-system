import * as React from 'react';

import { ColorShape } from './types';

import '../../components/Table/Table.css';

interface IColorTableProps {
  data: ColorShape[];
}

export const ColorTable: React.FC<IColorTableProps> = ({ data }) => {
  const handleCopyText = (text: string): void => {
    void navigator.clipboard.writeText(text);
    alert(`"${text}" copied to clipboard`);
  };

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
        {data.map((color) => (
          <tr>
            <td onClick={() => handleCopyText(color.enum)}>
              <div
                className="color-example"
                style={{ backgroundColor: `var(${color.value})` }}
              />
              {color.enum}
            </td>
            <td>{color.value}</td>
            <td>{color.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
