All notable changes to this project will be documented in this file.

## v0.6.6

_Release: 2020-02-07_

##### New Features

-Updating gray base color and [color]100 switch values in @livechat/design-system-colors (#165)

##### Bug Fixes

- fixing inner-shadow appearing on Safari mobile (#167)
- numeric input improvements, fix min max value (#164)

## v0.6.5

_Release: 2019-01-15_

##### Refactors

- adding Notification error about old tooltip components deprecation

## v0.6.4

_Release: 2019-01-10_

##### New Features

- Allow `autofocusedItemId` property to DropdownList component (#154)

##### Bug Fixes

- fixing classname in CssTollip docs (#160)
- fixing keydown and hover handlers issue in DropdownList - arrow down/up handler stopped working after hovering items (#154)

## v0.6.3

_Release: 2019-12-05_

##### Bug Fixes

- Adding missing ButtonGroup typescript types definition

## v0.6.2

_Release: 2019-11-26_

##### Bug Fixes

- Fixing `Card` title wrapper offset (#151)
- Controlled button styles improvement (#150)
- Changing wrong `Button` type in the `Modal` component docs (#152)

##### Refactors

- package `Node` version bump

## v0.6.1

_Release: 2019-10-30_

##### Refactors

- Improve readme

## v0.6.0

_Release: 2019-10-24_

##### Refactors

- Introducing `Lerna` to LiveChat design system repository.
  The `livechat/design-system` repository was converted to monorepo. All new packages related to our design system ecosystem will be added here. This approach gives as a couple of advantages:
  - more maintainable packages structure
  - all dependencies in a single folder, simple releases with Lerna
  - faster development across dependencies
  - consistent linting and configuration across all packages
  - reusable code (ie. common `helpers` can be moved to standalone package)

---

## v0.5.6

_Release: 2019-10-14_

##### New Features

- Exporting TextField component (#142)

---

## v0.5.5

_Release: 2019-10-14_

##### Bug Fixes

- UploadBar - fixing scroll issue on old browsers (#134)

---

## v0.5.4

_Release: 2019-10-09_

##### Bug Fixes

- Adding `Omit` type to support typescript in version 3.1 (#138)

---

## v0.5.3

_Release: 2019-10-09_

##### Bug Fixes

- `Switch` ts types fix (#133) - it was not possible to use ie. disabled attribute in ts projects
- fixing `Modal` close button type (#135)

---

## v0.5.2

_Release: 2019-09-30_

##### New Features

- new upload components (#120)
  - ProgressBar
  - ProgressCircle
  - FileUploadProgress (ProgressBar with title, icon, etc.)
  - UploadBar - complete component for upload of single or multiple files
- adjust Tabs styles (#127)

---

## v0.5.1

_Release: 2019-09-18_

##### New Features

- adding optional X close button to PopperTooltip and CssTooltip (#124)
- adding optional 'close on Esc press' feature to PopperTooltip (#124)

##### Bug Fixes

- fixing z-index issue in GuideTooltip component Overlay (#119)

---

## v0.5.0

_Release: 2019-09-17_

##### New Features

- Buttons - UI changes
  - changing color and border color css properties of basic button (#116)
  - adding secondary button (#116)
  - adding SVG icon support (#122)

##### Bug Fixes

- fixing issue with line-height in multiline buttons (#122)

---

## v0.4.6

_Release: 2019-09-02_

##### New Features

- `UserGuideTooltip` - adding possibility to make spotlight non-clickable by adding `disableSpotlightPointerEvents` property (#117)

##### Refactors

- changing compact `Button` font-size to `15px` (#114)

##### Bug Fixes

- fixing wrong `Card` component styles - `18px` padding in all directions (#113)
- closing `Modal` on mousedown outside instead of click (#115)

---

## v0.4.5

_Release: 2019-08-20_

##### New Features

- handling error in field group (#105)
- `UserGuideTooltip` - allow custom scrollable wrapper (#108)
- `forwardRef` enabled for `TextArea` and `TextAreaField` (#109)

##### Refactors

- change checkbox structure to allow good work for alone HTML/CSS (#106)

##### Bug Fixes

- `NumericInput` - adding missing type attribute to buttons (#107)
- fixing `InAppMessage` footer styles issue on mobile devices (#111)

---

## v0.4.4

_Release: 2019-08-05_

##### New Features

- new `ButtonGroup` and `UserGuideTooltip` components
- adding themes to `PopperTooltip` and `CssTooltip` - 'invert' and 'important'

##### Bug Fixes

- fixing `RadioButton` and `CheckboxField` - IE11 styles issue
- adding missing form components interfaces

---

## v0.4.3

_Release: 2019-07-15_

##### Bug Fixes

- `Toast` component styles fix for long action names
- `Switch` interface change - removing redundant onChange property

---

## v0.4.2

_Release: 2019-06-19_

##### New Features

- adding optional `onOpen` property to `PopperTooltip` - for tooltips with `click` and `hover` trigger action types
- extending `Dropdown` and `DropdownList` components:
  - adding dropdown content resize observer
  - custom key codes for Dropdown close and DropdownList select events
  - prevent default on item select with the keydown event
  - adding autofocus first item to DropdownList component
  - adding a new property to control dropdown keyboard events
  - passing event as argument of `onItemSelect` property (optional)

##### Refactors

- refactoring Dropdown and Switch prop types and default props - it was not visible in the docs

##### Bug Fixes

- `Toast` component styles fix - elements inside of `Toast` were positioned incorectly (ie11, firefox, safari)

---

## v0.4.1

_Release: 2019-06-11_

##### Bug Fixes

- `Tab` component documentation update - main handler changed from `onSelect` to `onClick` in the previous release
- passing number `0` as `Tab` description caused wrong render of the component

---

## v0.4.0

_Release: 2019-06-06_

##### New Features

- `Card` and `Divider` components

##### Refactors

- documentation styles updated
- adding typescript types and support for other html properties to `Tabs`, `TabsWrapper` and `TabsList` components
- `footer` prop of `Modal` component is now optional

##### Deprecations

- `Tabs` main handler `onSelect` changed to `onClick`. `onSelect` property will handling HTML `onselect` event

---

## v0.3.1

_Release: 2019-05-20_

##### New Features

- Adding new prop to DropdownList component - `onItemFocus`. Now it's possible to get information which item is focused.

---

## v0.3.0

_Release: 2019-05-17_

##### New Features

- `Loader` component
- `PopperTooltip` and `CssTooltip` - refactored tooltip components

##### Deprecations

- `Tooltip` and `TooltipContent` components are now deprecatedand will stop working in '@livechat/design-system 0.5.0',
  `PopperTooltip` and `CssTooltip` should be used instead of these

##### Bug Fixes

- Dropdown's `referenceElement` property is handled properly, `triggerRenderer` is not required

---

## v0.2.1

_Release: 2019-05-07_

##### Refactors

- Unlocking HTML `type` prop in the Button component
- Adding Element shims for SSR

---

## v0.2.0

_Release: 2019-04-29_

##### New Features

- Adding Switch component

##### Optimizations

- Migrating docs to new version of webpack (^3.6.0 -> ^4.28.4) and react-styleguidist (7.0.20 -> ^8.0.6)
- Adding partial support for docs on IE11 browser

---

## v0.1.4

_Release: 2019-04-24_

##### New Features

- Optional searchEmptyState props - Select search results empty state
- Optional onSearchPhraseChange props for getting search phrase value in a Select's parent component

---

## v0.1.3

_Release: 2019-04-18_

##### Bug Fixes

- Fixing click outside of modal Modal - removed listener attached to document, handling click on overlay instead

## v0.1.2

_Release: 2019-03-25_

##### Bug Fixes

- Fixing ModalFooter height issue - shrinking when dropdown had lots of content

---

## v0.1.1

_Release: 2019-03-22_

##### New Features

- Adding arrows to dropdown, visible when enabled in modifiers property

##### Bug Fixes

- Adding missing shouldCloseOnSelect property in MultiSelect typescript definition

---

## v0.1.0

_Release: 2019-03-18_

##### New Features

- Handling select and multiselect disabled props
- Introducing two modes of dropdown visibility handling for select/multiselect
- Adding new `shouldCloseOnSelect` prop on multiselect

##### Refactors

- Adding null refs null checks
- Adding proper ref type for button component

---

## v0.0.25

_Release: 2019-03-14_

##### Refactors

- IE11 fix for Dropdown item content

---

## v0.0.24

_Release: 2019-03-12_

##### New Features

- Adding new Dropdown (with popper.js as positioning engine) and DropdownList components

##### Refactors

- Forwarding ref to button component

---

## v0.0.23

_Release: 2019-03-11_

##### Refactors

- Adding typescript typings for TextArea component
- Removing max-width from Button component styles

---

## v0.0.22

_Release: 2019-02-18_

##### Bug Fixes

- Blocking select dropdown click events when its not visible

---

## v0.0.21

_Release: 2019-02-11_

##### Deprecations

- `InApp` components renamed to `InAppMessage` (i.e. `InAppBase -> InAppMessageBase`)

##### Bug Fixes

- Fixing max-height for InAppMessage components

##### Refactors

- Refactored documentation for `InAppMessages`

---

## v0.0.20

_Release: 2019-02-06_

##### New Features

- Adding loading state to Button component

##### Bug Fixes

- Fixing Multiselect selected item display issue on IE11 and Safari

---

## v0.0.19

_Release: 2019-02-04_

##### New Features

- InApp - new component used for communication with customers.

---

## v0.0.18

_Release: 2019-01-30_

##### New Features

- Adding support for removing items with backspace keydown in Multiselect
- Clearing search phrase on item select and on list close

##### Refactors

- Extending ToastWrapper props with HTMLAttributes to support outside className property
- Removing leftover prop itemsLimit from ToastConsumer

---

## v0.0.17

_Release: 2019-01-24_

##### New Features

- RangeDatePicker - adding support for picking the end date first and going backwards

##### Bug Fixes

- Adding fallbacks for default Source Sans Pro font-family
- Fixing datepicker miscalculation in day mouse entering handler

---

## v0.0.16

_Release: 2019-01-09_

##### New Features

- Adding first type of date picker component - RangeDatePicker.

---

## v0.0.15

_Release: 2018-12-18_

##### Optimizations

- Enhance TS typings for Button component with ButtonHTMLAttributes

---

## v0.0.14

_Release: 2018-12-07_

##### New Features

- TS typings for FieldGroup component

---

## v0.0.13

_Release: 2018-12-03_

##### Refactors

- New colors and styling for button's states (hover, focus, active)

##### Bug Fixes

- Fixing issue with checkbox and radio label width

---

## v0.0.12

_Release: 2018-11-29_

##### New Features

- TS typings for CheckboxField and RadioButton

##### Bug Fixes

- Style fixes in CheckboxField, RadioButton and Tooltips

---

## v0.0.11

_Release: 2018-11-21_

##### New Features

- New components
  - MultiSelect and MultiSelectField
  - NumericInput and NumericInputField

##### Optimizations

- Updating rollup config and refactoring config to reduce bundle size

##### Refactors

- Changing types path and removing dts-bundle lib

---

### v0.0.10

_Release: 2018-11-20_

##### Bug Fixes

- Fixing button interface

---

### v0.0.9

_Release: 2018-11-15_

##### New Features

- Adding modals:
  - BaseModal component with events handlers and overlay
  - 2 predefined modal components: Modal and ActionModal

##### Refactors

- Adding ts typings for Input and InputField components

---

### v0.0.8

_Release: 2018-11-14_

##### Bug Fixes

- Fixing tooltip content arrow align (typo in the code)

##### Deprecations

- TooltipContent property change: align => arrowAlign

---

### v0.0.7

_Release: 2018-11-14_

##### Bug Fixes

- Removing unnecessary css source map

---

### v0.0.6

_Release: 2018-11-12_

##### New Features

- New Select and SelectField components

---

### v0.0.5

_Release: 2018-11-07_

##### New Features

- Add inline option for tooltips for positioning it with inline elements

---

### v0.0.4

_Release: 2018-11-06_

##### Refactors

- Adding ts typings for Tooltip and TooltipContent

---

### v0.0.3

_Release: 2018-10-28_

##### Bug Fixes

- Fixing rollup bundle issue with undefined React named exports

---

### v0.0.2

_Release: 2018-10-26_

##### New Features

- UI form components
  - Form
  - FieldGroup
  - FormGroup
  - InputField
  - TextAreaField
  - CheckboxField
  - RadioButton
- Single Toasts components (5 types) and ToastWrapper for positioning and animations (slide, fade)
- NotificationSystem for managing Toasts across app
- Html snippets in documentation
- Typescript types for Button, NotificationSystem and Toasts

##### Bug Fixes

- Missing className prop on Button

---

### v0.0.1

_Release: 2018-08-01_

##### New Features

- Webpack build for styleguidist
- Rollup for bundling package
- Introducing css-modules to build library with standalone css file
- Eslint extended with Airbnb config
- Jest and Enzyme for testing
- Istanbul as coverage reporter
- CSS by PostCSS with PreCSS and Autoprefixer as a plugins
- Scss support
- React Styleguidist for component documentation
- Button component with different sizes and color sets
- Tab component (with releated TabList and TabWrapper)
- Tooltip component

---

This project adheres to [Semantic Versioning](http://semver.org/).

### vX.X.X

_Release: XXXX-XX-XX_

##### New Features

##### Optimizations

##### Deprecations

##### Bug Fixes

##### Refactors
