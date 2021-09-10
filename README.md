Notice: Readme in progress

- [ ] Intro
- [ ] How to use?
- [ ] How it is biuld?
- [x] How to develop?
- [ ] How to release (interal notes)?

# How to develop?

Just run `npm start`. This command will build `styles` and `react-components` packages in "watch" mode. Storybook should start automatically (if not - try to visit localhost:6006).

If Storybook is not enough, you can additionaly run `npm start:example` which will run `example-react` package in "watch" mode.

`example-react` is a simple React app based on create-react-app boilerplate. It has direct dependency on `react-component` package, so every change should be reflected in the app via auto-reload.
