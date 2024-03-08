export interface ITokenScanOutput {
  designTokenCount: number;
  colorStringLiteralCount: number;
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
  apiKey: string;
  protocol: 'http' | 'https';
  host: string;
  port: string;
}

export interface ISendReportToFlagmanProps {
  data: {
    legacyDS: IMetricOutput;
    newDS: IMetricOutput;
    designTokenUsage: {
      designTokenCount: number;
      colorStringLiteralCount: number;
    };
    applicationID: string;
  };
  buildId: string;
}
