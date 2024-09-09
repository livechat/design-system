import * as React from 'react';

import { ComponentCoreProps } from '../../utils/types';

export type AccordionLabel =
  | React.ReactNode
  | { open: React.ReactNode; closed: React.ReactNode };

export interface IAccordionProps extends ComponentCoreProps {
  /**
   * Specify the content of the accordion
   */
  children: React.ReactNode;
  /**
   * Specify the label of the accordion, single element or different for open and closed state
   */
  label: AccordionLabel;
  /**
   * Specify the multiline element, which will be displayed under the label
   */
  multilineElement?: React.ReactNode;
  /**
   * Specify the kind of the accordion
   */
  kind?: 'default' | 'warning' | 'error';
  /**
   * Specify if the accordion should be open on init
   */
  openOnInit?: boolean;
  /**
   * Set to control accordion state
   */
  isOpen?: boolean;
  /**
   * Optional handler called on accordion close
   */
  onClose?: () => void;
  /**
   * Optional handler called on accordion open
   */
  onOpen?: () => void;
}

export interface IAccordionAnimatedLabelProps {
  open: React.ReactNode;
  closed: React.ReactNode;
  isOpen: boolean;
}
