import { FloatingPortal as FloatingUIPortal } from '@floating-ui/react';

import { FloatingPortalProps } from './types';

export const FloatingPortal = ({
  children,
  id,
  root,
  preserveTabOrder,
}: FloatingPortalProps) => {
  return (
    <FloatingUIPortal id={id} root={root} preserveTabOrder={preserveTabOrder}>
      {children}
    </FloatingUIPortal>
  );
};
