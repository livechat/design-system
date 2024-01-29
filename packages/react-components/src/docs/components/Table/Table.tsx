import * as React from 'react';

import './Table.scss';
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
            {Object.entries(row).map(([key, value], cellIndex) => {
              if (key === 'enum') {
                return (
                  <td onClick={() => handleCopyText(value as string)}>
                    {renderExample && renderExample(row['value'])}
                    {row['enum']}
                    {row['deprecated'] && <i> (deprecated)</i>}
                  </td>
                );
              }

              if (typeof value === 'string') {
                return (
                  <td
                    key={cellIndex}
                    className={key === 'value' ? 'no-wrap' : undefined}
                  >
                    {value}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
