export interface ITokenScanOutput {
  designTokenCount: number;
  inlineColorCodeCount: number;
}

interface IComponentOutput {
  name: string;
  instances: number;
  props: { [prop: string]: number };
}

export interface IMetricOutput {
  components: IComponentOutput[];
  totalUses: number;
}
export interface IMetrics {
  designTokenUsage: ITokenScanOutput;
  newDS: IMetricOutput;
  legacyDS: IMetricOutput;
}

export interface IFlagmanServerConfig {
  path: string;
  apiKey: string;
  protocol: 'http' | 'https';
  host: string;
  port: string;
}

export interface ISendReportToFlagmanProps {
  data: unknown;
  buildId: string;
}
