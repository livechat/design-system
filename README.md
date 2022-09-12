# How does it look like?

[See the Storybook](https://v1--613a8e945a5665003a05113b.chromatic.com/)

# How to install?

To run the project, first You need to use a the tool for managing the node version, which is convenient for you.
We suggest using [Volta](https://volta.sh/).

Required version of node is `16.13.2` and npm `8.1.0`.

Then, just run `npm install`.

# How to use?

For React based projects:

`npm i --save @livechat/design-system-react-components`

If you also want to use icons:

`npm i --save @livechat/design-system-icons`

Currently, for component styles to be available in your application, you need to add an import:

`import '@livechat/design-system-react-components/dist/style.css';`

# How to develop?

Just run `npm start`. This command will build all necessary packages in "watch" mode. Storybook should start automatically (if not - try to visit localhost:6006).

If Storybook is not enough, you can additionaly run `npm start:example` which will run `example-react` package in "watch" mode.

`example-react` is a simple React app based on vite-react boilterplate. It has direct dependency on `react-components` package, so every change should be reflected in the app via auto-reload.

# How to test?

We have prepared a document describing testing process and principles [here](./TESTING.md).

# How to release?

We have entire document about that take a look [here](./RELEASE.md).
