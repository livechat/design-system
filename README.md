# How does it look like?

[See the Storybook](https://v1--613a8e945a5665003a05113b.chromatic.com/)

# How to install?

Install [Homebrew Package Manager](http://mxcl.github.io/homebrew/) and then check it by running commands:

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```
brew doctor
```

Install NVM (Node Version Manager):

```
brew install nvm
```

and follow instructions presented by brew (you will need to add a proper entry to .bash_profile).

After installing nvm, you should install our preferred node and npm version. Required version for node is `16.13.0`. It comes with npm `8.1.0`. Please make sure that you're using the correct version of both, as you might encounter unintended `package-lock.json` updates along with other errors.

```
nvm install 16.13.0
nvm use 16.13.0
```

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

# How to release?

You need to be a member of @livechat organization on npm. Then after authorization (`npm login`) you can publish packages into npm registry.

To bump package versions and publish them into registry please run `npm run deploy`.
