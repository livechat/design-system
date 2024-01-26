import * as React from 'react';

import './Table.css';
import { handleCopyText } from '../../helpers';

interface ITable<T> {
  data: T[];
  columnNames: string[];
  renderExample?: (token: string) => React.ReactNode;
}

export const Table: React.FC<ITable<Record<string, unknown>>> = ({
  data,
  columnNames,
  renderExample,
}) => {
  return (
    <table className="sb-unstyled">
      <thead>
        <tr>
          {columnNames.map((columnName) => (
            <th>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, cellIndex) => {
              if (cellIndex === 0) {
                return (
                  <td onClick={() => handleCopyText(value as string)}>
                    {renderExample && renderExample(row['value'] as string)}
                    {row['enum']}
                  </td>
                );
              }

              if (typeof value === 'string') {
                return <td key={cellIndex}>{value}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
