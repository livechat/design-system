/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Colors from '@livechat/design-system-colors';
import { Theme } from './types';

const lightTheme: Theme = {
  primary: Colors.blue500,
  primaryHover: Colors.blue600,
  primaryDisabled: Colors.blue100,
  basic: '#ffffff',
  basicHover: '#f9fbfb',
  basicDisabled: Colors.gray50,
  inactive: Colors.gray200,
  danger: Colors.red500,
  dangerHover: Colors.red600,
  dangerDisabled: Colors.red100,
  success: Colors.green500,
  warning: Colors.yellow500,
  info: Colors.blue300,
  tip: Colors.gray800,
  tipText: '#ffffff',
  tipInverted: '#ffffff',
  tipInvertedText: Colors.gray900,
  tipImportant: '#facf50',
  tipImportantText: Colors.gray900,
  textPrimary: Colors.gray900,
  textSecondary: Colors.gray700,
  textTertiary: Colors.gray600,
  textPlaceholder: Colors.gray500,
  textOnPrimary: '#ffffff',
  uiBackground: '#ffffff',
  ui: Colors.gray40,
  uiHover: Colors.gray50,
  overlay: 'rgba(0, 0, 0, 0.5)',
  uiFilter: Colors.blue800,
  divider: Colors.gray100,
  border: Colors.gray200,
  borderHover: Colors.gray400,
  selected: Colors.blue400,
  highlight: Colors.blue100,
  badgePrimary: Colors.red500,
  badgeSecondary: Colors.gray200
};

export default lightTheme;
