/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Theme } from './types';

const legacyTheme: Theme = {
  primary: '#4384f5',
  primaryHover: '#4379d6',
  primaryDisabled: '#c3d7fa',
  basic: '#ffffff',
  basicHover: '#f9fbfb',
  basicDisabled: '#fbfcfe',
  danger: '#d64646',
  dangerHover: '#b9484a',
  dangerDisabled: '#eec4c5',
  success: '#4bb678',
  warning: '#efa842',
  info: '#5ca8f5',
  tip: '#424d57',
  tipInversed: '#ffffff',
  tipImportant: '#facf50',
  textPrimary: 'rgba(66, 77, 89, 1)',
  textSecondary: 'rgba(66, 77, 89, 0.7)',
  textTertiary: 'rgba(66, 77, 89, 0.5)',
  textPlaceholder: 'rgba(66, 77, 89, 0.4)',
  textOnPrimary: '#ffffff',
  uiBackground: '#ffffff',
  ui: '#f3f7f9',
  uiHover: '#e1e9ec',
  overlay: 'rgba(0, 0, 0, 0.5)',
  uiFilter: '#59699e',
  divider: '#dde2e6',
  border: '#bcc6d0',
  borderHover: '#a0a6ab',
  selected: '#3e7ce4',
  highlight: '#dae7fd'
};

// const x = {
//   "named": {
//     // "$primary-color": "#4384f5",
//     // "$hover-background-color": "#e1e9ec",
//     "$hover-basic-color": "#f9fbfb",
//     "$hover-primary-color": "#4379d6",
//     "$hover-red-color": "#b9484a",
//     "$loading-btn-basic-color": "#fbfcfe",
//     "$loading-btn-primary-color": "#c3d7fa",
//     "$loading-btn-error-color": "#eec4c5",
//     "$font-primary-color": "rgba(66, 77, 89, 1)",
//     "$font-secondary-color": "rgba(66, 77, 89, 0.7)",
//     "$font-tertiary-color": "rgba(66, 77, 89, 0.5)",
//     "$font-placeholder-color": "rgba(66, 77, 89, 0.4)",
//     "$border-primary-color": "#bcc6d0",
//     "$field-hover-border-color": "#a0a6ab",
//     "$field-background-color": "#dde2e5",
//     "$divider-color": "#dde2e6",
//     "$overlay-background-color": "rgba(0, 0, 0, 0.5)",
//     "$ui-background-color": "#f3f7f9",
//     "$ui-background-color-hover": "#e1e8ed",
//     "$ui-filter-color": "#59699e",
//     "$ui-tooltip-color": "#424d57",
//     "$ui-tooltip-important-color": "#facf50",
//     // "$error-color": "#d64646",
//     // "$success-color": "#4bb678",
//     // "$warning-color": "#efa842",
//     // "$info-color": "#5ca8f5",
//     "white": "#fff"
//   },
//   "unamed_by_context": {
//     "btn": ["#d0d2d5"],
//     "date-picker": ["#7a8289", "#eaecec", "#8b9898", "#a0a6ab", "#3e7ce4", "#dce0e0", "#4a90e2", "#dae7fd", "#e7e8e9"],
//     "loader": ["#deeefd", "#4e5665"],
//     "modal body backgroiund": ["#f8f8fa"],
//     "progress": ["#deeefd", "#f7e4e4"],
//     "tab": ["#8e949a"],
//     "uploadBar": ["#dde2e6", "#21a961", "#424d57", "#f4574c"]
//   }
// }

export default legacyTheme;

// "#4a90e2", datepicker-range-bg: "#dae7fd",  datepicker-selected-day-bg: "#3e7ce4"  progress-bar-background: "deeefd"   