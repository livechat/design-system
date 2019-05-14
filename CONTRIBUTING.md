### Getting started

- Install [Node6 or Node8](https://nodejs.org/en/), preferably using [nvm](https://github.com/creationix/nvm)
- Clone this repository: `git clone https://github.com/livechat/design-system` (or download zip)
- CD to project directory: `cd design-system`
- Install dependencies: `npm install`

### NPM Scripts

- `styleguide`: run styleguidist server with eslint at http://localhost:6060
- `styleguide:build`: run styleguidist build
- `start`: bundles the library with watch flag, usefull for development with external app instead of styleguidist
- `build`: bundles the library with rollup to the dist dir
- `prebuild`: removes build directory (before build script)
- `prepare`: runs both before the package is packed and published and on local npm install
- `predeploy`: runs before deploying design system guide to github pages
- `deploy`: deploy design system guide to github pages
- `test`: runs tests
- `test:coverage`: runs tests with coverage report
- `test:watch`: runs tests in watch mode

### Developing a Component

A typical UI component should comply with the following guidelines:

- If it has no state, it should be declared as a [Dumb Component](#dumb-component).
- Unless having another team member approval, all components should have `className` and `style` props declared.
- It should have [tests](#running-tests).
- It should have [Styleguidist examples](#document-the-component-with-styleguidist) about its usage.
- All code must follow the configured code style.
- For any design concept, follow styles from [Zeplin](https://zpl.io/a8K8YnE).
- Component example file should contain html markup for aplications/websites which doesn't use React
- Component should use scss style file
- Css should be inspired by BEM, but doesn't need to follow it strickly
- Style file should use defined sass variables, mixins etc.
- Component should have typescript typings

You can view and test your component in two ways:

- use styleguidist as development enviroment for your component
- use npm link feature to see it in your app

### NPM Link

You should start with executing these two commands:

- design-system library root directory -> run `npm link`
- app root directory -> run `npm link @livechat/design-system`

You can run build script after new changes (or use npm start).

If you want to learn more about npm link read [this basic article](https://poznajprogramowanie.pl/enhance-your-development-workflow-with-npm-link/)

### Document a component with styleguidist

- `npm run styleguide`
- Open a browser at `http://localhost:6060`

Styleguidist monitors the `<root-dir>/src/components` directory for components. Nevertheless, examples are user-defined in a `<Component-name>.md` file within the subdirectory of the component. Remember to add your new component in `setup.js` to see it in docs.

### Running tests

Unit and snapshot tests, uses Jest as test runner.

- `npm run test or npm run test:watch` for run the test optional with watching mode

### Check tests coverage

Istanbul is used for code coverage and reporting, so:

- `npm run coverage` and check your testing skills

### Try the bundle

- `npm run build` for bundle library
