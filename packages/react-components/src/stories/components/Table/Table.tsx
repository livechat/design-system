import * as React from 'react';

import './Table.scss';
import { handleCopyText } from '../../helpers';

type BasicTableData = Record<string, unknown> & {
  enum: string | number;
  token: string;
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
    <>
      <p>
        ℹ️ Click on the <b>Enum</b> or <b>Token</b> value to copy it to the
        clipboard.
      </p>
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
                    <td
                      key={cellIndex}
                      onClick={() => handleCopyText(value as string)}
                    >
                      <div className="example-field copy-text">
                        {renderExample && renderExample(row['token'])}
                        {row['enum']}
                        {row['deprecated'] && <i> (deprecated)</i>}
                      </div>
                    </td>
                  );
                }

                if (key === 'token') {
                  return (
                    <td
                      key={cellIndex}
                      className="no-wrap copy-text"
                      onClick={() => handleCopyText(value as string)}
                    >
                      {value}
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
    </>
  );
};
