import { execSync, StdioOptions } from 'child_process';
import * as path from 'path';

import { IComponentsAndPropsResult } from 'react-scanner';

// eslint-disable-next-line no-console
export const logger = console.log;

export const prepareOutput = (output: IComponentsAndPropsResult) => {
  const result = Object.entries(output).map(([name, { instances, props }]) => ({
    name,
    instances,
    props,
  }));

  const totalUses = result.reduce((acc, curr) => acc + curr.instances, 0);

  return { components: result, totalUses };
};

export const execCommand = (
  command: string,
  { stdio = 'inherit' as StdioOptions } = {}
) => execSync(command, { cwd: path.resolve(), stdio });

export const execCommandWithResult = (command: string) =>
  execCommand(command, { stdio: 'pipe' }).toString().trim();

export const getCurrentCommit = (): string =>
  execCommandWithResult('git rev-parse HEAD');
