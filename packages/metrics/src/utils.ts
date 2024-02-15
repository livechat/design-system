import { IComponentsAndPropsResult } from 'react-scanner';

export const prepareOutput = (output: IComponentsAndPropsResult) => {
  const result = Object.entries(output).map(([name, { instances, props }]) => ({
    name,
    instances,
    props,
  }));

  const totalUses = result.reduce((acc, curr) => acc + curr.instances, 0);

  return { components: result, totalUses };
};
