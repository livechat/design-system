import scanner, { IReactScannerConfig } from 'react-scanner';

import { scanForTokenUsages } from './tokenScan';
import { IMetrics } from './types';
import { prepareOutput } from './utils';

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
