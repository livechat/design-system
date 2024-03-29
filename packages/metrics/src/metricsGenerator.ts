import scanner, { IReactScannerConfig } from 'react-scanner';

import { ApplicationID } from './constants';
import { sendReportToFlagman } from './flagmanService';
import { scanForTokenUsages } from './tokenScan';
import { IFlagmanServerConfig, IMetrics } from './types';
import { logger, prepareOutput } from './utils';

interface IProps {
  rootDir: string;
  reactScannerConfig?: IReactScannerConfig;
  newDSLibraryAlias?: string;
  oldDSLibraryAlias?: string;
}

export const generateMetrics = async ({
  rootDir,
  reactScannerConfig,
  newDSLibraryAlias,
  oldDSLibraryAlias,
}: IProps): Promise<IMetrics> => {
  const newDSLibrary =
    newDSLibraryAlias ?? '@livechat/design-system-react-components';
  const oldDSLibrary = oldDSLibraryAlias ?? '@livechat/design-system';

  const config = {
    ...reactScannerConfig,
    crawlFrom: './',
    includeSubComponents: true,
    rootDir,
    processors: ['count-components-and-props'],
  };

  const newDSOutput = await scanner.run(
    { ...config, importedFrom: newDSLibrary },
    rootDir
  );
  const oldDSOutput = await scanner.run(
    { ...config, importedFrom: oldDSLibrary },
    rootDir
  );

  const designTokenUsage = scanForTokenUsages(rootDir);

  return {
    newDS: prepareOutput(newDSOutput),
    legacyDS: prepareOutput(oldDSOutput),
    designTokenUsage,
  };
};

export const generateAndSendMetrics = async (
  metricOptions: IProps,
  serverOptions: IFlagmanServerConfig,
  applicationID: string,
  buildId: string
): Promise<void> => {
  if (!metricOptions?.rootDir) {
    throw new Error('Root directory is required');
  }
  if (!applicationID) {
    throw new Error('Application ID is required');
  }
  if (!Object.values(ApplicationID).includes(applicationID as ApplicationID)) {
    throw new Error(
      `Invalid application ID, must be one of the predefined values: ${Object.values(
        ApplicationID
      ).join(', ')}`
    );
  }
  if (!buildId) {
    throw new Error('Build ID is required');
  }
  logger('Generating metrics...');
  const metrics = await generateMetrics(metricOptions);
  logger('Metrics generated. Sending to Flagman...');

  await sendReportToFlagman({
    data: { ...metrics, applicationID },
    buildId,
    ...serverOptions,
  });
  logger('Metrics sent to Flagman.');
};
