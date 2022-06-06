# How does it look like?

[See the Storybook](https://v1--613a8e945a5665003a05113b.chromatic.com/)

# How to use?

For React based projects:

`npm i --save @livechat/design-system-react-components`

If you also want to use icons:

`npm i --save @livechat/design-system-icons`

# How to develop?

Just run `npm start`. This command will build all necessary packages in "watch" mode. Storybook should start automatically (if not - try to visit localhost:6006).

If Storybook is not enough, you can additionaly run `npm start:example` which will run `example-react` package in "watch" mode.

`example-react` is a simple React app based on vite-react boilterplate. It has direct dependency on `react-components` package, so every change should be reflected in the app via auto-reload.

# How to release?

You need to be a member of @livechat organization on npm. Then after authorization (`npm login`) you can publish packages into npm registry.

To bump package versions and publish them into registry please run `npm run deploy`.
