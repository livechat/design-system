import * as React from 'react';

import { AccordionAnimatedLabel } from './components';

import type { AccordionLabel } from './types';

export const isLabelObject = (
  label: React.ReactNode | { open: React.ReactNode; closed: React.ReactNode }
): label is { open: React.ReactNode; closed: React.ReactNode } => {
  return (
    (label as { open: React.ReactNode; closed: React.ReactNode }).open !==
      undefined &&
    (label as { open: React.ReactNode; closed: React.ReactNode }).closed !==
      undefined
  );
};

export const getLabel = (
  label: AccordionLabel,
  currentlyOpen: boolean
): React.ReactNode => {
  if (isLabelObject(label)) {
    const props = {
      open: label.open,
      closed: label.closed,
      isOpen: currentlyOpen,
    };

    return <AccordionAnimatedLabel {...props} />;
  }

  return label;
};
