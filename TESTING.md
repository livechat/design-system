# Testing environment

Install the project as described [here](./README.md).

# Manual testing

Manual testing is done on Storybook branches available in each PR [See the Storybook](https://v1--613a8e945a5665003a05113b.chromatic.com/)

# Visual regression

Chromatic is used for visual regression and available in Github actions

# Automatic Testing

Basic tests are done using Jest and Render plugin

# Testing principals

- design should be verified with figma project
- basic accessibility should be tested (e.g keyboard controls)
- testing is done on controls with assumption of correct/reasonable data and conditions in context of the component
- extreme parameters should be handled by the user and are not Design System responsibility
