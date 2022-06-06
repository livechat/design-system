# Technical Roadmap / TODO

## Css styles package

To be framework-agnostic solution we need to bring back the `@livechat/design-system-styles` package. This package should include only css files from `react-components` package.

### Solution proposal

- Use sass compiler to compile scss files from `react-components` package. 1:1 - do not bundle yet.
- Use postcss to add prefix to class names e.g. `lc-`
- Create some main scss file, include there all components css declarations and bundle as index.css/main.css
- Package should export all css files (modules + bunlde + themes/design-tokens)

## React components

### Bugs

In general: A11y issues like no focus, tab/key navigation

- Checkbox doesn't have focus state
- Radio doesn't have focus state
- Field Group - inline label has incorect position
- TagInput

### Improvements

- Pass ref via React.forwardRef to input/picker components
- Review the naming convention `kind` vs `type`, sizes (e.g. button sizes should correspond with input sizes etc.)
- Do not use `console.log` or `alert` in stories. There is a dedicated storybook addon `actions` which should be used instead of logs and alert
- Try to align the Storybook documentation with https://style.monday.com/
- Connect Storybook with figma via https://storybook.js.org/addons/storybook-addon-designs
- Install and use A11y addon (https://storybook.js.org/addons/@storybook/addon-a11y)
- Investigate if there is a possibility to build from different entrypoints. Right now we build single bundle with all components. Maybe there is a possibility and a need to build and use only a fragment (one component).

## Icons

Review the build system implementation. There is a mock of index.d.ts. Maybe we could improve typings in this package.
