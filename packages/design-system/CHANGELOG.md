## Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
### vX.X.X
_Release: XXXX-XX-XX_
##### New Features
##### Optimizations
##### Deprecations
##### Bug Fixes
##### Refactors

----
### v0.0.1
_Release: 2018-08-01_

##### New Features
* Webpack build for styleguidist
* Rollup for bundling package
* Introducing css-modules to build library with standalone css file 
* Eslint extended with Airbnb config
* Jest and Enzyme for testing
* Istanbul as coverage reporter
* CSS by PostCSS with PreCSS and Autoprefixer as a plugins
* Scss support
* React Styleguidist for component documentation
* Button component with different sizes and color sets
* Tab component (with releated TabList and TabWrapper)
* Tooltip component

----
### v0.0.2
_Release: 2018-10-26_

##### New Features
* UI form components
  * Form
  * FieldGroup
  * FormGroup
  * InputField
  * TextAreaField
  * CheckboxField
  * RadioButton
* Single Toasts components (5 types) and ToastWrapper for positioning and animations (slide, fade)
* NotificationSystem for managing Toasts across app
* Html snippets in documentation
* Typescript types for Button, NotificationSystem and Toasts

##### Bug Fixes
* Missing className prop on Button

----
### v0.0.3
_Release: 2018-10-28_

##### Bug Fixes
* Fixing rollup bundle issue with undefined React named exports

----
### v0.0.4
_Release: 2018-11-06_

##### Refactors
* Adding ts typings for Tooltip and TooltipContent

----
### v0.0.5
_Release: 2018-11-07_

##### New Features
* Add inline option for tooltips for positioning it with inline elements

----
### v0.0.6
_Release: 2018-11-12_

##### New Features
* New Select and SelectField components

----
### v0.0.7
_Release: 2018-11-14_

##### Bug Fixes
* Removing unnecessary css source map

----
### v0.0.8
_Release: 2018-11-14_

##### Bug Fixes
* Fixing tooltip content arrow align (typo in the code)

##### Deprecations
* TooltipContent property change: align => arrowAlign

----
### v0.0.9
_Release: 2018-11-15_

##### New Features
* Adding modals:
  * BaseModal component with events handlers and overlay
  * 2 predefined modal components: Modal and ActionModal

##### Refactors
* Adding ts typings for Input and InputField components

----
### v0.0.10
_Release: 2018-11-20_

##### Bug Fixes
* Fixing button interface

----
## v0.0.11
_Release: 2018-11-21_

##### New Features
* New components
  * MultiSelect and MultiSelectField
  * NumericInput and NumericInputField

##### Optimizations
* Updating rollup config and refactoring config to reduce bundle size

##### Refactors
* Changing types path and removing dts-bundle lib

----
## v0.0.12
_Release: 2018-11-29_

##### New Features
* TS typings for CheckboxField and RadioButton 

##### Bug Fixes
* Style fixes in CheckboxField, RadioButton and Tooltips

----
## v0.0.13
_Release: 2018-12-03_

##### Refactors
* New colors and styling for button's states (hover, focus, active)

##### Bug Fixes
* Fixing issue with checkbox and radio label width

----
## v0.0.14
_Release: 2018-12-07_

##### New Features
* TS typings for FieldGroup component