import {
  FloatingPortal as FloatingUIPortal,
  FloatingPortalProps,
} from '@floating-ui/react';

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
