import * as React from 'react';

import cx from 'clsx';

interface StoryDescriptorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  inverted?: boolean;
  gap?: string;
}

export const StoryDescriptor: React.FC<
  React.PropsWithChildren<StoryDescriptorProps>
> = ({ title, children, inverted, gap, ...props }) => (
  <div
    className={cx('story-container', { 'story-container-inverted': inverted })}
    {...props}
  >
    <div className={cx('story-title', { 'story-title-inverted': inverted })}>
      {title}
    </div>
    <div className="story-spacer" style={{ gap }}>
      {children}
    </div>
  </div>
);
