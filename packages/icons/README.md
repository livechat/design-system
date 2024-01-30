<h1 align="center">
  <img src="./../../docs/assets/logo.png" alt="livechat design-system logo" /><br />
  LiveChat Design System Icons
</h1>

<p align="center">
  <a href="https://www.npmjs.com/@livechat/design-system-icons">
    <img alt="npm version icons" src="https://img.shields.io/npm/v/@livechat/design-system-icons.svg?label=icons">
  </a>
  <a href="https://design.livechat.com/">
    <img src="https://img.shields.io/static/v1?label=documentation&message=storybook&color=ff4685">
  </a>
  <a href="https://github.com/livechat/design-system/actions/workflows/tests.yml">
    <img src="https://github.com/livechat/design-system/actions/workflows/tests.yml/badge.svg" alt="Workflow status badge" loading="lazy">
  </a>
</p>

The icons package provides a collection of icons that can be used to enhance the visual appeal of your applications. These icons are designed to be customizable and easy to incorporate into your projects.

## Installation

Run the following command using [npm](https://www.npmjs.com/) (or with you other favorite package manager, eg. [yarn](https://yarnpkg.com/)):

```
npm install @livechat/design-system-icons --save
```

## Basic usage

To use icons simply import them from the package:

```jsx
import { Edit } from '@livechat/design-system-icons';

<Edit />;
```

But our icons are designed to be used in conjunction with our components library, `@livechat/design-system-react-components`. To use them in this manner, you need to install both packages. Please also refer to the installation guide for the [LiveChat React Components](https://www.npmjs.com/@livechat/design-system-react-components) package.
```
npm install @livechat/design-system-react-components @livechat/design-system-icons --save
```

And then import them like this:


```jsx
import { Edit } from '@livechat/design-system-icons';
import { Icon } from '@livechat/design-system-react-components';

<Icon source={Edit} kind="primary" />;
```

## Adding new icons

1. To install all necessary dependencies, run the following command:
    
    ```
    npm install
    ```

2. Next you need to prepare a SVG by replacing all color values in the `stroke` or/and `fill` attributes with `currentcolor` value. This will allow us to change the color of the icon using the `color` css property.

3. To add a new icon, you need to add a prepared SVG file to the `./svg` directory. The file name should be in the **snake_case** format with `-filled` addition in the name for filled icon variants. 

4. You should execute the `npm run build` command, and our scripts will handle the rest, including adding a new export entry in the <i>package.json</i> file and <i>entryConfig.ts.</i>
5. Commit your changes and create a pull request. ⚠️ Commit message should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) naming pattern `feat(icons): add new icon`. ⚠️ This is crucial as, post squash merging, Git will use the PR name as the commit message.
6. After the pull request is merged, the changes will be published by the Design System team in the next release.
