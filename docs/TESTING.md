# Quality and testing

## Introduction

Quality assurance is mainly provided by `@livechat/design-system` team, especially before merging to the main branch. We highly encourage you to follow the practices mentioned below to minimize the effort related to testing the changes and fixes provided.

We believe in a good balance of manual and automated approaches in the area of quality.

In order to start testing please follow installation and running instructions as described [here](../README.md).

## Manual testing

Manual testing is done using [Storybook](https://storybook.js.org/) and a separate instance is published for every PR (feature branch) using [Chromatic](https://www.chromatic.com/). For each component, the first story allows using [Controls](https://storybook.js.org/docs/react/essentials/controls) and [Actions](https://storybook.js.org/docs/react/essentials/actions), which simplify the process of testing most of the scenarios. The remaining stories work as a sort of documentation that can be used in order to compare implementation with designs. Other useful add-ons:

- [Measure & Outline](https://storybook.js.org/docs/react/essentials/measure-and-outline)
- [Theme Switcher](https://storybook.js.org/addons/storybook-addon-themes)
- [Viewport](https://storybook.js.org/docs/react/essentials/viewport)

Storybook instances are currently available under the following link pattern:
https://{branch-name}--613a8e945a5665003a05113b.chromatic.com/

where {branch-name} is a branch name where `/` and other special characters should be replaced with `-`.

You can also find a direct link to the latest commit instance in the PR checks section:
![image](https://user-images.githubusercontent.com/46003125/189325522-e47a5a96-6657-40fb-9a86-cdc45ebe566c.png)

# Visual regression

[Chromatic](https://www.chromatic.com/) is used for visual regression and is available in GitHub actions. Tests are run automatically after each commit, a direct link to results can be found in the PR checks section:

![image](https://user-images.githubusercontent.com/46003125/189325825-da23cce6-bad9-4633-b3dc-ca0ca1974402.png)

Each change needs to be manually reviewed in `Chromatic` and although not required should be accepted as a good practice. It's worth noting that we're currently on a free plan, and some quota limitations might occur. With the increase in `Chromatic` usage, the LiveChat team will invest in a paid plan.

# Automatic Testing

Although `Storybook` covers most of the scenarios we still invest in automated coverage using a unit testing framework called [Vitest](https://vitest.dev/). As much as possible we try to avoid "technical" verification and focus on implementation testing. Instead, our tests are designed to simulate user actions and observations, following these [rules](https://testing-library.com/docs/guiding-principles/). To do so we utilize [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and other packages from [Testing Library](https://testing-library.com/) family.

Writing tests for each component must be approached individually, there is no proven recipe that will suit everyone, because components have their own purpose. You know best how the component should work and these scenarios should be covered with tests. 

Nevertheless, below are some rules that we follow when creating unit tests:
- We aim for 100% coverage
- Each new component must include unit tests
- Each new feature or update of an existing component must include additional tests, and, if necessary, also modification of the existing ones to better fulfill their role
- Each component should check whether the user can pass his class to it, and in the case of more complex components, when there are more class-related parameters, it should also check whether they are passed
- If a given component consists of several smaller ones, each of them should be covered with tests based on its API, and the main component should contain tests as part of its usage scenarios
- Unit tests should be based on the DOM (UI consistencies are checked by visual tests)
  - Components should be built in accordance with [a11y standards](https://www.a11yproject.com/), and tests should be based on interactions with these elements in purely functional terms (we refer to an element by `role`, `label`, `type`, `text`, and ultimately via `testId`)
  - If the component contains logic transferred to a `helpers` file, such a file should also contain tests to check whether a given logic returns correct data
  - We check every possible component variant based on its API (handlers are/are not launched in specific cases, if necessary, whether they transmit correct data, if any prop affects the display/hiding of a specific element, we check whether it is visible from the DOM or contains appropriate props informing about its status)
  - Since we focus on `a11y`, we should also take care of users who work only with the keyboard. This mainly applies to more complicated components that include our custom keyboard support, the test should take into account such interaction (for example, whether focus on the trigger and clicking `space` opens the list)

# Testing principles

- UI- and UX-wise the verification should be performed based on our public [Figma](https://www.figma.com/file/2pFu80PXO5A2tfyrAGnx91/Product-Components?node-id=6250%3A30703) design. LiveChat's designers will provide final acceptance in case of doubts.
- basic accessibility should be tested (e.g keyboard controls, color contrasts), although @livechat/design-system team will focus on greater support in this area after releasing `v1.0.0`.
- manual testing is done using `Storybook` controls with an assumption of correct/reasonable data provided.
- design system is targeting the atomic approach, therefore, extreme parameters and scenarios should be handled externally (from a development perspective). `@livechat/design-system` is open for discussions on what should be supported in case of issues.
- each component should be tested and work out of the box on all modern browsers. We do not define a specific list of browsers and are open to analyzing issues focusing on specific cases.
- our pull request template assumes that a change should be covered from the quality perspective by
  - design review
  - added or updated `Storybook` scenarios
  - unit/integration tests
  - a reasonable dose of self-review in the area of code and functionality
