<h1 align="center">
  <img src="./docs/assets/logo.png" alt="livechat design-system logo" /><br />
  LiveChat Design System Monorepo
</h1>

<p align="center">
  <a href="https://www.npmjs.com/@livechat/design-system-react-components">
    <img alt="npm version react-components" src="https://img.shields.io/npm/v/@livechat/design-system-react-components.svg?label=react-components">
  </a>
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

Welcome to the Design System Monorepo! This repository houses a collection of packages and tools related to our design system. We use the [Lerna](https://lerna.js.org/) tool and [NPM workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) to manage these packages efficiently. Below is an overview of the packages included in this monorepo:

## Packages

### 1. React Components

- **Package Name**: `react-components`
- **Description**: This package contains a library of reusable React components designed to be used in various projects. These components are the building blocks of our design system and can be easily integrated into your applications.
- **Usage**: To install and use these components in your project, follow the installation and usage instructions in the `react-components` package documentation.

### 2. Icons

- **Package Name**: `icons`
- **Description**: The `icons` package provides a collection of icons that can be used to enhance the visual appeal of your applications. These icons are designed to be customizable and easy to incorporate into your projects.
- **Usage**: To use these icons, refer to the documentation provided within the `icons` package.

### 3. Example React Project

- **Package Name**: `example-react`
- **Description**: This package serves as a playground React project that demonstrates how to utilize the components and icons from our design system. It's an excellent resource for testing and experimenting with our packages.
- **Usage**: To run the example React project, follow the instructions in the `example-react` package documentation.

## Getting Started

#### Clone this repository to your local machine:

```bash
git clone git@github.com:livechat/design-system.git
```

#### Install the necessary dependencies for the entire monorepo using Lerna:


Required version of `node.js` is `20.14.0`.

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

### 404 and disconnections problems
If you have problems with disconnects while working in the environment, make the following change to the file `packages/react-components/.storybook/main.ts`:
```
...
typescript: {
// reactDocgen: 'react-docgen-typescript',
  check: false,
  reactDocgen: false,
},
...
```
This is a problem that occurred after the last update of Storybook and related packages, we are currently looking for a solution for this.

**Be sure not to commit changes to this file along with other changes made to components.**

## Styling the components aka migration to `@emotion`
We are transitioning our design system components from SCSS to `@emotion` for styling. This change aims to enhance maintainability, improve performance, and provide a more seamless styling approach within React.

**When updating or contributing to the design system, please use Emotion syntax instead of module SCSS files.**

### What Changes?
Styles previously written in `.scss` files are now defined using Emotion’s css API.
Components no longer import `.scss` files but instead define styles within `styles.ts` files.

### How to Use the Updated Components?
You don’t need to make significant changes in consuming applications—components will still expose the same props. However, if you were relying on SCSS class names for custom overrides, you might need to adjust your approach using Emotion’s className prop or theme overrides.

### Example: Before & After

#### Before
```tsx
import styles from './Accordion.module.scss';
...
className: cx(styles[`${baseClass}__label`], {
  [styles[`${baseClass}__label--promo`]]: isPromo,
}),
...
```
```scss
...
&__label {
  margin: 0;
  padding: var(--spacing-5) var(--spacing-12) var(--spacing-5)
    var(--spacing-5);

  &:hover {
    cursor: pointer;
  }

  &--promo {
    padding: var(--spacing-6) var(--spacing-12) var(--spacing-6)
      var(--spacing-6);
  }
}
...
```

#### After
```tsx
import * as styles from './styles';
...
className: styles.label(isPromo),
...
```
```tsx
export const label = (isPromo?: boolean) => css`
  margin: 0;
  ${isPromo
    ? `
    padding: var(${SpacingToken.Spacing6}) var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing6}) var(${SpacingToken.Spacing6});
  `
    : `
    padding: var(${SpacingToken.Spacing5}) var(${SpacingToken.Spacing12}) var(${SpacingToken.Spacing5}) var(${SpacingToken.Spacing5});
  `}
  &:hover {
    cursor: pointer;
  }
`;
```

## Contributing

The guide that describes the contribution process is available [here](./docs/CONTRIBUTION.md).

## Testing

We have prepared a document describing testing process and core principles in the area of quality [here](./docs/TESTING.md).

## Releasing

The package releasing and related documentation is available [here](./docs/RELEASE.md).
