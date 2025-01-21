import { ReactNode } from 'react';

import { IconSource } from 'components/Icon';

export type IEmptyStateProps = (
  | {
      type?: 'full' | undefined;
      description?: string | ReactNode;
    }
  | {
      type: 'inline';
      description?: never;
    }
) & {
  title: string;
  actions?: ReactNode;
} & ({ image: string; icon?: never } | { image?: never; icon: IconSource });
