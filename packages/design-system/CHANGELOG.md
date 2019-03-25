## Change Log
All notable changes to this project will be documented in this file.

## v0.1.2
_Release: 2019-03-25_

##### Bug Fixes
* Fixing ModalFooter height issue - shrinking when dropdown had lots of content

----

## v0.1.1
_Release: 2019-03-22_

##### New Features
* Adding arrows to dropdown, visible when enabled in modifiers property

##### Bug Fixes
* Adding missing shouldCloseOnSelect property in MultiSelect typescript definition

----

## v0.1.0
_Release: 2019-03-18_

##### New Features
* Handling select and multiselect disabled props
* Introducing two modes of dropdown visibility handling for select/multiselect
* Adding new `shouldCloseOnSelect` prop on multiselect

##### Refactors
* Adding null refs null checks
* Adding proper ref type for button component

----

## v0.0.25
_Release: 2019-03-14_

##### Refactors
* IE11 fix for Dropdown item content

----

## v0.0.24
_Release: 2019-03-12_

##### New Features
* Adding new Dropdown (with popper.js as positioning engine) and DropdownList components

##### Refactors
* Forwarding ref to button component

----

## v0.0.23
_Release: 2019-03-11_

##### Refactors
* Adding typescript typings for TextArea component
* Removing max-width from Button component styles

----

## v0.0.22
_Release: 2019-02-18_

##### Bug Fixes
* Blocking select dropdown click events when its not visible

----

## v0.0.21
_Release: 2019-02-11_

##### Deprecations
* `InApp` components renamed to `InAppMessage` (i.e. `InAppBase -> InAppMessageBase`)

##### Bug Fixes
* Fixing max-height for InAppMessage components

##### Refactors
* Refactored documentation for `InAppMessages`

----

## v0.0.20
_Release: 2019-02-06_

##### New Features
* Adding loading state to Button component

##### Bug Fixes
* Fixing Multiselect selected item display issue on IE11 and Safari

----

## v0.0.19
_Release: 2019-02-04_

##### New Features
* InApp - new component used for communication with customers.

----

## v0.0.18
_Release: 2019-01-30_

##### New Features
* Adding support for removing items with backspace keydown in Multiselect
* Clearing search phrase on item select and on list close

##### Refactors
* Extending ToastWrapper props with HTMLAttributes to support outside className property
* Removing leftover prop itemsLimit from ToastConsumer

----

## v0.0.17
_Release: 2019-01-24_

##### New Features
* RangeDatePicker - adding support for picking the end date first and going backwards

##### Bug Fixes
* Adding fallbacks for default Source Sans Pro font-family
* Fixing datepicker miscalculation in day mouse entering handler

----

## v0.0.16
_Release: 2019-01-09_

##### New Features
* Adding first type of date picker component - RangeDatePicker.

----

## v0.0.15
_Release: 2018-12-18_

##### Optimizations
* Enhance TS typings for Button component with ButtonHTMLAttributes

----

## v0.0.14
_Release: 2018-12-07_

##### New Features
* TS typings for FieldGroup component

----

## v0.0.13
_Release: 2018-12-03_

##### Refactors
* New colors and styling for button's states (hover, focus, active)

##### Bug Fixes
* Fixing issue with checkbox and radio label width

----

## v0.0.12
_Release: 2018-11-29_

##### New Features
* TS typings for CheckboxField and RadioButton 

##### Bug Fixes
* Style fixes in CheckboxField, RadioButton and Tooltips

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

### v0.0.10
_Release: 2018-11-20_

##### Bug Fixes
* Fixing button interface

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

### v0.0.8
_Release: 2018-11-14_

##### Bug Fixes
* Fixing tooltip content arrow align (typo in the code)

##### Deprecations
* TooltipContent property change: align => arrowAlign

----

### v0.0.7
_Release: 2018-11-14_

##### Bug Fixes
* Removing unnecessary css source map

----

### v0.0.6
_Release: 2018-11-12_

##### New Features
* New Select and SelectField components

----

### v0.0.5
_Release: 2018-11-07_

##### New Features
* Add inline option for tooltips for positioning it with inline elements

----

### v0.0.4
_Release: 2018-11-06_

##### Refactors
* Adding ts typings for Tooltip and TooltipContent

----

### v0.0.3
_Release: 2018-10-28_

##### Bug Fixes
* Fixing rollup bundle issue with undefined React named exports

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

------------------

This project adheres to [Semantic Versioning](http://semver.org/).
### vX.X.X
_Release: XXXX-XX-XX_
##### New Features
##### Optimizations
##### Deprecations
##### Bug Fixes
##### Refactors
