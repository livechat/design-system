import * as React from 'react';

export interface FloatingPortalProps {
  /**
   * The content to render inside the portal.
   */
  children: React.ReactNode;
  /**
   * The target ID - the portal will be appended to the element with this ID, or the body if not specified.
   */
  id?: string;
  /**
   * The root element to append the portal to.
   */
  root?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  /**
   * Whether to preserve the tab order of the portal.
   */
  preserveTabOrder?: boolean;
}
