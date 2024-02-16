import * as http from 'http';
import * as https from 'https';
import { Buffer } from 'node:buffer';

import debug from 'debug';

import { FLAGMAN_SERVICE_NAME } from './constants';
import { IFlagmanServerConfig, ISendReportToFlagmanProps } from './types';
import { getCurrentCommit } from './utils';

interface ToFlagman {
  path: string;
  data: string;
  apiKey: string;
  protocol: 'http' | 'https';
  host: string;
  port: string;
}

async function sendToFlagman({
  path,
  apiKey,
  data,
  protocol,
  host,
  port,
}: ToFlagman) {
  const logger = debug(FLAGMAN_SERVICE_NAME);
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
          path,
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
              logger('[%d] %O', response.statusCode, parsedResponseBody);
              resolve(parsedResponseBody);
            } catch (error) {
              logger('%s', 'Failed to parse response body.');
              reject(error);
            }
          });
        }
      );

      req.on('error', (error) => {
        logger('%O', error);
        // Resolving instead of rejecting so that we don't block CI build if Flagman service failed
        resolve(error);
      });

      req.write(data);
      req.end();
    });
  } catch (error) {
    logger('%s', `Failed to send data to ${path}`);
    logger('%O', error);
  }
}

export async function sendReportToFlagman({
  data,
  buildId,
  path,
  apiKey,
  host,
  port,
  protocol,
}: ISendReportToFlagmanProps & IFlagmanServerConfig): Promise<void> {
  const logger = debug(FLAGMAN_SERVICE_NAME);
  const commit = getCurrentCommit();

  if (!commit) {
    logger('%s', 'Unable to find commit ID. Discontinuing.');

    return;
  }

  if (!data) {
    logger('%s', 'Report was not passed. Discontinuing.');

    return;
  }

  if (!buildId) {
    logger(
      '%s',
      'Build ID was not found (probably not CI environment). Discontinuing.'
    );

    return;
  }

  logger('%s', `About to send report for commit ${commit}`);

  const result = JSON.stringify({
    buildId,
    output: 'github',
    commit,
    report: data,
  });

  await sendToFlagman({
    path,
    data: result,
    apiKey,
    host,
    port,
    protocol,
  });
}
