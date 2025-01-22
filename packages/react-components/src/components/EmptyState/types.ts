import { ReactNode } from 'react';

export type IEmptyStateProps = (
  | {
      type?: 'full';
      description?: string | ReactNode;
    }
  | {
      type: 'inline';
      description?: never;
    }
) & {
  title: string;
  actions?: ReactNode;
} & (
    | { image?: string; icon?: never }
    | { image?: never; icon?: ReactNode }
    | { image?: never; icon?: never }
  );
