import { ReactNode } from 'react';

export type IEmptyStateProps = (
  | {
      type?: 'full';
      description?: string | ReactNode;
    }
  | {
      type: 'inline';
      description?: never;
      image?: never;
    }
) & {
  title: string;
  actions?: ReactNode;
  centered?: boolean;
} & (
    | { image?: string; icon?: never }
    | { image?: never; icon?: ReactNode }
    | { image?: never; icon?: never }
  );
