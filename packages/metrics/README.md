<h1 align="center">
  LiveChat Design System Metrics
</h1>

<p align="center">
  <a href="https://www.npmjs.com/@livechat/design-system-metrics">
    <img alt="npm version metrics" src="https://img.shields.io/npm/v/@livechat/design-system-metrics.svg?label=metrics">
  </a>
  <a href="https://design.livechat.com/">
    <img src="https://img.shields.io/static/v1?label=documentation&message=storybook&color=ff4685">
  </a>
  <a href="https://github.com/livechat/design-system/actions/workflows/tests.yml">
    <img src="https://github.com/livechat/design-system/actions/workflows/tests.yml/badge.svg" alt="Workflow status badge" loading="lazy">
  </a>
</p>

The metrics package provides a way to gather and display data in a consistent manner. It is designed to be customizable and easy to incorporate into your projects.
Right now, there are two types of metrics available:
- `DesignTokens usage` - a metric that shows how many times a design token is used in the project versus how many times inline color values are used.
- `Component usage` - a metric that shows how many times a component is used in the project.

## Installation

Run the following command using [npm](https://www.npmjs.com/) (or with you other favorite package manager, eg. [yarn](https://yarnpkg.com/)):

```
npm install -D @livechat/design-system-metrics
```

## Intro

Library exports two functions that you can use to collect metrics data. 
- `generateAndSendMetrics` - a function that scans the project and sends the metrics data to the Flagman Service for further processing.
- `generateMetrics` - a function that scans the project and returns an object with metrics data. Can be used to locally gather metrics data.
 
These functions are designed to be used in conjunction with the Flagman Service, which is a part of the LiveChat infrastructure.

## How to use
### `generateAndSendMetrics`

A main function that scans the project and sends the metrics data to the Flagman Service for further processing. It takes a few configuration objects as arguments:
- `scannerConfig` - a configuration object for the [react-scanner](https://www.npmjs.com/package/react-scanner#config-options) package. The only required property is `rootDir` - a path to the root directory of the project.
- `flagmanConfig` - a configuration object for the Flagman Service. It should contain the following properties:
   - `protocol` - a protocol that is used to authenticate the request.
   - `host` - a host of the Flagman Service.
   - `port` - a port of the Flagman Service.
   - `apiKey` - an API key that is used to authenticate the request.
- `APP_ID` - an ID of the application that the metrics are gathered for. Available AppIDs are: `AGENT_APP`, `ACCOUNTS`, `HELPDESK`.
- `BUILD_ID` - an ID of the build that the metrics are gathered for.

Best way to automate metrics collection is to create a script in your project and run it as a part of your CI/CD pipeline. For example, you can add a `metrics` script to your `package.json` file and run it using `npm run metrics` command.
```json
{
  "scripts": {
    "metrics": "node ./scripts/metrics.js"
  }
}
```
```javascript
// scripts/metrics.js
const { generateAndSendMetrics } = require('@livechat/design-system-metrics');

(async () => {
  const APP_ID = 'AGENT_APP' | 'ACCOUNTS' | 'HELPDESK';
  await generateAndSendMetrics(
          { rootDir: 'src' },
          { protocol: 'http', host: 'flagman_host', port: 'flagman_port', apiKey: 'api_key' },
          APP_ID,
          BUILD_ID
  );
})();
````
   
### `generateMetrics`

A simplified function that only scans the project and returns an object with metrics data. It takes a configuration object as an argument. The configuration object should contain the following properties:
   - `rootDir` - a path to the root directory of the project.
   - `reactScannerConfig` (optional) - a configuration object for the [react-scanner](https://www.npmjs.com/package/react-scanner#config-options) package. 
   - `newDSLibraryAlias` (optional) - an alias for the new design system library. By default, it is set to `@livechat/design-system-react-components`.
   - `oldDSLibraryAlias` (optional) - an alias for the old design system library. By default, it is set to `@livechat/design-system`.


Example usage:
```javascript
const { generateMetrics } = require('@livechat/design-system-metrics');
   
const metricsData = await generateMetrics({
  rootDir: '/path/to/your/project',
});
```
Example result:
```json
{
   "newDS": {
      "components": [{
         "name": "Button",
         "instances": 124,
         "props": {"onClick": 115, "kind": 124, "children": 124}
      }],
      "totalUses": 2097
   },
   "legacyDS": {
      "components": [],
      "totalUses": 488
   },
   "designTokenUsage": { "designTokenCount": 999, "colorStringLiteralCount": 999 }
}
```
