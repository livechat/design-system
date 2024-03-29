import * as http from 'http';
import * as https from 'https';
import { Buffer } from 'node:buffer';

import { FLAGMAN_DS_METRICS_PATH } from './constants';
import { IFlagmanServerConfig, ISendReportToFlagmanProps } from './types';
import { getCurrentCommit, logger } from './utils';

interface ToFlagman extends IFlagmanServerConfig {
  data: string;
}

async function sendToFlagman({
  apiKey,
  data,
  protocol,
  host,
  port,
}: ToFlagman) {
  const headers: Record<string, string | number> = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  };

  if (apiKey) {
    headers['X-Flagman-Api-Key'] = apiKey;
  }

  try {
    await new Promise((resolve, reject) => {
      const req = (protocol === 'http' ? http : https).request(
        {
          host,
          port,
          path: FLAGMAN_DS_METRICS_PATH,
          method: 'POST',
          headers,
        },
        (response) => {
          response.setEncoding('utf8');

          let responseBody = '';

          response.on('data', (chunk) => {
            responseBody += chunk;
          });

          response.on('end', () => {
            try {
              const parsedResponseBody = JSON.parse(responseBody);

              resolve(parsedResponseBody);
            } catch (error) {
              logger('Failed to parse response body.');
              reject(error);
            }
          });
        }
      );

      req.on('error', (error) => {
        logger('Error: ', error);
        // Resolving instead of rejecting so that we don't block CI build if Flagman service failed
        resolve(error);
      });

      req.write(data);
      req.end();
    });
  } catch (error) {
    logger('Error:', `Failed to send data to Flagman`);
    logger(error);
  }
}

export async function sendReportToFlagman({
  data,
  buildId,
  apiKey,
  host,
  port,
  protocol,
}: ISendReportToFlagmanProps & IFlagmanServerConfig): Promise<void> {
  const commit = getCurrentCommit();

  if (!commit) {
    throw new Error('Commit was not found. Discontinuing.');
  }

  if (!data) {
    throw new Error('Data was not found. Discontinuing.');
  }

  if (!buildId) {
    throw new Error('Build ID was not found. Discontinuing.');
  }

  if (!apiKey || !host || !port || !protocol) {
    throw new Error(
      'Flagman server configuration is incomplete. Discontinuing.'
    );
  }

  logger(`About to send report for commit ${commit}`);

  const result = JSON.stringify({
    buildId,
    output: 'github',
    commit,
    report: data,
  });

  await sendToFlagman({
    data: result,
    apiKey,
    host,
    port,
    protocol,
  });
}
