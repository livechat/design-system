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
  <a href="https://design.livechat.com/">
    <img src="https://img.shields.io/static/v1?label=documentation&message=storybook&color=ff4685">
  </a>
  <a href="https://github.com/livechat/design-system/actions/workflows/tests.yml">
    <img src="https://github.com/livechat/design-system/actions/workflows/tests.yml/badge.svg" alt="Workflow status badge" loading="lazy">
  </a>
</p>

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

In case of icons there is a separate package to be used in conjunction:

```jsx
import { Edit } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '@livechat/design-system-react-components';

<Icon source={Edit} kind="primary" />;
```

## Documentation

At this stage of the project we consider Storybook and Figma as parts of our documentation ecosystem.

[Storybook](https://design.livechat.com/) - includes design system foundations, describes components API and allows to familiarize with the thier capabilities
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

### Rules of contribution

1. In order to start working on changes, you must first create an issue on our [board](https://github.com/orgs/livechat/projects/7/views/1?filterQuery=),
   using one of the templates depending on if this is a feature request or bug report [here](https://github.com/livechat/design-system/issues/new/choose). If an
   issue turns out to be related to another which is already on the board, the DS team will take care of the appropriate connections. In addition to the description,
   the ticket should also contain an appropriate label, the contributor should be entered as an assignee, and should be added to the project (LiveChat Design System).
2. In order to start work, first update branch `main`, and then create a new branch from this branch in which future changes will be placed. We adopted the
   nomenclature for the branch `feature/[task_id]`.
3. If changes require it, appropriate unit tests should also be included, and an additional case should be attached to the Storybook documentation (in the `.stories.tsx` file).
4. After the work is completed, create a pull request directed to branch `main`.
   1. **Conventional PR Naming**: Ensure your pull request title follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) naming pattern `type(scope): description`. This is crucial as, post squash merging, Git will use the PR name as the commit message.
      <br/>To mark changes as a **breaking change**, include a `!` after the type and scope, followed by a colon and a space, like so: `type(scope)!: description`.
      <br/>For now we will use the following types:
      - `feat` - for new features
      - `fix` - for bug fixes
      - `docs` - for documentation changes
   2. **Review**: In pull request, you should call `livechat/design-system` in the reviewers field.
   3. **Template**: The merge template contains a checklist of things that need to be completed to meet the requirements, it will make the work easier for everyone.
5. You will probably notice in your pull request under "Some checks haven't completed yet" Chromatic pending checks approval. Chromatic is a tool that we use
   for visual regression testing. The check in this tool is required for general approval of changes and it's covered by design system team.
6. After the work is completed and the reviewers accept it, the responsibility for the rest of the changes is on the design system team side, which will perform
   the merge and release the changes in the future. Design system team deals with determining the status of the task on the board side, they close it with an
   appropriate comment.

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
