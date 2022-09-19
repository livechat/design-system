<h1 align="center">
  <img src="./docs/assets/logo.png" alt="livechat design-system logo" /><br />
  LiveChat Design System
</h1>

<p align="center">
  <a href="https://www.npmjs.com/@livechat/design-system-react-components">
    <img alt="npm version react-components" src="https://img.shields.io/npm/v/@livechat/design-system-react-components.svg?label=react-components">
  </a>
  <a href="https://www.npmjs.com/@livechat/design-system-icons">
    <img alt="npm version icons" src="https://img.shields.io/npm/v/@livechat/design-system-icons.svg?label=icons">
  </a>
  <a href="https://v1--613a8e945a5665003a05113b.chromatic.com/">
    <img src="https://img.shields.io/static/v1?label=examples&message=storybook&color=ff4685">
  </a>
  <a href="https://github.com/livechat/design-system/actions/workflows/tests.yml">
    <img src="https://img.shields.io/github/workflow/status/livechat/design-system/Tests/v1?label=tests">
  </a>
</p>

## Installation

Run the following command using [npm](https://www.npmjs.com/) (or with you other favorite package manager, eg. [yarn](https://yarnpkg.com/)):

```
npm install @livechat/design-system-react-components @livechat/design-system-icons --save
```

## Basic usage

Import the `CSS` directly into your project:

```js
import '@livechat/design-system-react-components/dist/style.css';
```

You can import components directly from the npm package:

```jsx
import { Button } from '@livechat/design-system-react-components';
```

In case of icons there is a separate package to be used in conjunction:

```jsx
import { Edit as EditIcon } from '@livechat/design-system-icons/react/material';
import { Icon } from '@livechat/design-system-react-components';

<Icon source={EditIcon} kind="primary" />;
```

## Documentation

At this stage of the project we consider Storybook and Figma as parts of our documentation ecosystem.

[Storybook](https://v1--613a8e945a5665003a05113b.chromatic.com/) - includes design system foundations, describes components API and allows to familiarize with the thier capabilities
[Figma](https://www.figma.com/file/2pFu80PXO5A2tfyrAGnx91/Product-Components) - it's not an official documentation from design perspective but we follow a simple rule of working in public

## Contributing

Design System is mainly maintained by the teams of:

<a href="https://www.livechat.com/">
  <img alt="livechat logo" src="./docs/assets/livechat-logo.png" height="10"><span>&nbsp;Livechat</span>
</a>
<br/>
<a href="https://www.helpdesk.com/">
  <img alt="helpdesk logo" src="./docs/assets/helpdesk-logo.png" height="10"><span>&nbsp;HelpDesk</span>
</a>
<br/>
<a href="https://www.knowledgebase.com/">
  <img alt="helpdesk logo" src="./docs/assets/knowledgebase-logo.png" height="10"><span>&nbsp;KnowledgeBase</span>
</a>

Any external contribution is welcome and teams mentioned above will help in the process of [development](#development) or [reporting problems or ideas](https://github.com/livechat/design-system/issues/new/choose). Design system is a [proposed solution](https://developers.livechat.com/docs/monetization/app-review-process#design-system) for authors building application targeting [LiveChat Marketplace](https://www.livechat.com/marketplace/), therefore, we're open for any feedback from 3rd party developers.

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

### Testing

We have prepared a document describing testing process and core principles in the area of quality [here](./docs/TESTING.md).

### Releasing

The package releasing and related documentation is available [here](./docs/RELEASE.md).
