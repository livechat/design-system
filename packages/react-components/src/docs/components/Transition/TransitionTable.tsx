import * as React from 'react';
import '../Table/Table.css';
import { FC } from 'react';

export const TransitionTable: FC<{
  enumName: string;
  entries: [string, string][];
  useCases: Map<string, { title?: string; description: string; value: number }>;
}> = ({ enumName, entries, useCases }) => {
  return (
    <div>
      <table>
        <tr>
          <th className="enum-column">Enum</th>
          <th className="first-column">Token name</th>
          <th className="second-column">Value</th>
          <th>Use case</th>
        </tr>
        {entries.map(([key, value]) => {
          const useCaseTitle = useCases.get(value)?.title;

          return (
            <tr>
              <td>
                {enumName}.{key}
              </td>
              <td>{value}</td>
              <td>{useCases.get(value)?.value}</td>
              <td>
                {useCaseTitle && <b>{useCaseTitle}</b>}
                <br />
                {useCases.get(value)?.description}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
