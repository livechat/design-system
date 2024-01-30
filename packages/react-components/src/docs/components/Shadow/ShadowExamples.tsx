import * as React from 'react';

import { StoryDescriptor } from '../StoryDescriptor';

import styles from './ShadowExamples.module.scss';

const baseClass = 'div';

const Example = ({ name, token }: { name: string; token: string }) => {
  return (
    <StoryDescriptor title={name}>
      <div className={styles['example-wrapper']}>
        <div
          className={`
            ${styles['example-wrapped']}
            ${styles[`${baseClass}--${token}`]}
            `}
        ></div>
      </div>
    </StoryDescriptor>
  );
};

export const ShadowExamples = (): React.ReactElement => {
  return (
    <div>
      <Example name="Float" token="float" />
      <Example name="PopOver" token="pop-over" />
      <Example name="Modal" token="modal" />
      <Example name="Tooltip" token="tooltip" />
      <Example name="TooltipArrowBottom" token="tooltip-arrow-bottom" />
      <Example name="TooltipArrowTop" token="tooltip-arrow-top" />
      <Example name="TooltipArrowRight" token="tooltip-arrow-right" />
      <Example name="TooltipArrowLeft" token="tooltip-arrow-left" />
      <Example name="Focus" token="focus" />
      <Example name="DividerBottom" token="divider-bottom" />
      <Example name="DividerTop" token="divider-top" />
      <Example name="DividerBottomLeft" token="divider-bottom-left" />
      <Example name="DividerTopLeft" token="divider-top-left" />
      <Example name="DividerTopRight" token="divider-top-right" />
      <Example name="DividerBottomRight" token="divider-bottom-right" />
      <Example name="MessageBox" token="message-box" />
    </div>
  );
};
