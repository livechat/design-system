import * as React from 'react';

import cx from 'clsx';

interface StoryDescriptorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  inverted?: boolean;
  dmOnlyInverted?: boolean;
  gap?: string;
}

export const StoryDescriptor: React.FC<
  React.PropsWithChildren<StoryDescriptorProps>
> = ({ title, children, inverted, gap, dmOnlyInverted, ...props }) => (
  <div
    className={cx('story-container', {
      'story-container-inverted': inverted,
      'story-container-dm-only-inverted': dmOnlyInverted,
    })}
    {...props}
  >
    <div
      className={cx('story-title', {
        'story-title-inverted': inverted,
        'story-title-dm-only-inverted': dmOnlyInverted,
      })}
    >
      {title}
    </div>
    <div className="story-spacer" style={{ gap }}>
      {children}
    </div>
  </div>
);
