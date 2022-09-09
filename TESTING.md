# Quality and testing

## Introduction

Quality assurance is mainly provided by @livechat/design-system team, especially before merging to the main branch. We highly encourage you to follow the practices mentioned below to minimize the effort related to testing the changes and fixes provided.

We believe in a good balance of manual and automated approaches in the area of quality.

In order to start testing please follow installation and running instructions as described [here](./README.md).

## Manual testing

Manual testing is done using [Storybook](https://storybook.js.org/) and a separate instance is published for every PR (feature branch) using [Chromatic](https://www.chromatic.com/). For each component, the first story allows using [Controls](https://storybook.js.org/docs/react/essentials/controls) and [Actions](https://storybook.js.org/docs/react/essentials/actions), which simplify the process of testing most of the scenarios. The remaining stories work as a sort of documentation that can be used in order to compare implementation with designs. Other useful add-ons:
* [Measure & Outline](https://storybook.js.org/docs/react/essentials/measure-and-outline)
* [Theme Switcher](https://storybook.js.org/addons/storybook-addon-themes)
* [Viewport](https://storybook.js.org/docs/react/essentials/viewport)

Storybook instances are currently available under the following link pattern:
https://{branch-name}--613a8e945a5665003a05113b.chromatic.com/

where {branch-name} is a branch name where `/` and other special characters should be replaced with `-`.

You can also find a direct link to the latest commit instance in the PR checks section:
{image}

# Visual regression

Chromatic is used for visual regression and available in Github actions

# Automatic Testing

Basic tests are done using Jest and Render plugin

# Testing principals

- design should be verified with figma project
- basic accessibility should be tested (e.g keyboard controls)
- testing is done on controls with assumption of correct/reasonable data and conditions in context of the component
- extreme parameters should be handled by the user and are not Design System responsibility
