import * as React from 'react';

interface StoryDescriptorProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const StoryDescriptor: React.FC<
  React.PropsWithChildren<StoryDescriptorProps>
> = ({ title, children, ...props }) => (
  <div className="story-container" {...props}>
    <div className="story-title">{title}</div>
    <div className="story-spacer">{children}</div>
  </div>
);
