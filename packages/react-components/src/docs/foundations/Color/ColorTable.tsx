import * as React from 'react';

import { ColorShape } from './types';

interface IColorTableProps {
  data: ColorShape[];
}

export const ColorTable: React.FC<IColorTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Example</th>
          <th>Enum</th>
          <th>Token</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {data.map((color) => (
          <tr>
            <td>
              <div
                className="color-example"
                style={{ backgroundColor: color.value }}
              />
            </td>
            <td>DesignToken.{color.enum}</td>
            <td>{color.value}</td>
            <td>{color.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
