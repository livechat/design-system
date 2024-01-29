import * as React from 'react';

import './Table.css';
import { handleCopyText } from '../../helpers';

type BasicTableData = Record<string, unknown> & {
  enum: string;
  value: string;
  deprecated?: boolean;
};

interface ITable {
  data: BasicTableData[];
  columnNames: string[];
  renderExample?: (token: string) => React.ReactNode;
}

export const Table: React.FC<ITable> = ({
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
                    {renderExample && renderExample(row['value'])}
                    {row['enum']}
                    {row['deprecated'] && <i> (deprecated)</i>}
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
