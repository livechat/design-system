<h1 align="center">
  LiveChat Design System React Components
</h1>

<p align="center">
  <a href="https://www.npmjs.com/@livechat/design-system-react-components">
    <img alt="npm version react-components" src="https://img.shields.io/npm/v/@livechat/design-system-react-components.svg?label=react-components">
  </a>
  <a href="https://design.livechat.com/">
    <img src="https://img.shields.io/static/v1?label=documentation&message=storybook&color=ff4685">
  </a>
  <a href="https://github.com/livechat/design-system/actions/workflows/tests.yml">
    <img src="https://github.com/livechat/design-system/actions/workflows/tests.yml/badge.svg" alt="Workflow status badge" loading="lazy">
  </a>
</p>

This package contains a library of reusable React components designed to be used in various projects. These components are the building blocks of our design system and can be easily integrated into your applications.


## Installation

Run the following command using [npm](https://www.npmjs.com/) (or with you other favorite package manager, eg. [yarn](https://yarnpkg.com/)):

```
npm install @livechat/design-system-react-components @livechat/design-system-icons --save
```

## Basic usage

It is required to import the `CSS` directly into your project so it could be applied to components:

```js
import '@livechat/design-system-react-components/dist/style.css';
```

You can import components directly from the npm package:

```jsx
import { Button } from '@livechat/design-system-react-components';
```

In case of icons there is a separate package (`@livechat/design-system-icons`) to be used in conjunction:

```jsx
import { Edit } from '@livechat/design-system-icons';
import { Icon } from '@livechat/design-system-react-components';

<Icon source={Edit} kind="primary" />;
```

## Documentation

At this stage of the project we consider Storybook and Figma as parts of our documentation ecosystem.

[Storybook](https://design.livechat.com/) - includes design system foundations, describes components API and allows to familiarize with the thier capabilities
[Figma](https://www.figma.com/file/2pFu80PXO5A2tfyrAGnx91/Product-Components) - it's not an official documentation from design perspective but we follow a simple rule of working in public


### Development

Required version of `node.js` is `16.13.2`.

If you're a [volta](https://volta.sh/) user, the project maintains node version entry within `package.json`.

You should start with installing dependencies:

```
npm install
```

After that just execute the `start` command. It will build all necessary packages in `watch` mode. `Storybook` should start automatically (if not - try visiting http://localhost:6006).

```
npm start
```

If `Storybook` is not enough, you can additionaly run `npm start:example` which will run `example-react` package in `watch` mode. `example-react` is a simple [React](https://reactjs.org/) app based on [vite-react boilterplate](https://github.com/vitejs/vite/tree/main/packages/create-vite). It has a direct dependency on `react-components` package, so every change should be reflected in the app via auto-reload.

### Contributing

For the `contribution/testing/releasing` guides please refer to the [main repository](https://github.com/livechat/design-system/) documentation.