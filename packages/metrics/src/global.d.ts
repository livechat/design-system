declare module 'react-scanner' {
  const run: (
    config: Record<string, unknown>,
    path: string
  ) => Promise<IComponentsAndPropsResult>;
  interface IReactScannerConfig {
    rootDir: string;
    crawlFrom: string;
    includeSubComponents?: boolean;
    processors?:
      | 'count-components'
      | 'count-components-and-props'
      | 'raw-report';
  }
  interface IComponentsAndPropsResult {
    [componentName: string]: {
      instances: number;
      props: { [prop: string]: number };
    };
  }
  export type { IReactScannerConfig, IComponentsAndPropsResult };
  export default { run };
}
