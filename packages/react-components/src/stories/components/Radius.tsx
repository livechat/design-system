import * as React from 'react';

import './Table.css';

export const Radius = (): React.ReactElement => {
  return (
    <div>
      <table>
        <tr>
          <th className="first-column">Token</th>
          <th className="second-column">Size</th>
        </tr>
        <tr>
          <td>--radius-0</td>
          <td>0px</td>
        </tr>
        <tr>
          <td>--radius-1</td>
          <td>4px</td>
        </tr>
        <tr>
          <td>--radius-2</td>
          <td>6px</td>
        </tr>
        <tr>
          <td>--radius-3</td>
          <td>8px</td>
        </tr>
      </table>
    </div>
  );
};
