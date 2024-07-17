import { FC } from 'react';

import {
  CheckCircle,
  Error,
  Info,
  Warning,
} from '@livechat/design-system-icons';

import { getTopBarAlertIcon } from './helpers';
import { TopBarAlertKind } from './types';

describe('getTopBarAlertIcon', () => {
  const iconMap: { [key in TopBarAlertKind]: FC } = {
    info: Info,
    warning: Warning,
    error: Error,
    success: CheckCircle,
  };

  (Object.keys(iconMap) as TopBarAlertKind[]).forEach((kind) => {
    test(`returns correct icon for "${kind}" kind`, () => {
      const IconComponent = getTopBarAlertIcon(kind);
      expect(IconComponent).toBe(iconMap[kind]);
    });
  });
});
