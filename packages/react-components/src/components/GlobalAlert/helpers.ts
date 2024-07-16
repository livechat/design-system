import { type FC } from 'react';

import {
  CheckCircle,
  Error,
  Info,
  Warning,
} from '@livechat/design-system-icons';

import { type TopBarAlertKind } from './types';

export const getTopBarAlertIcon = (kind: TopBarAlertKind): FC => {
  switch (kind) {
    case 'info':
      return Info;
    case 'warning':
      return Warning;
    case 'error':
      return Error;
    case 'success':
      return CheckCircle;
  }
};
