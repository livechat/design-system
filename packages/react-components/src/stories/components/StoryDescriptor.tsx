import * as React from 'react';

type StoryDescriptorProps = {
  title: string;
};

export const StoryDescriptor: React.FC<
  React.PropsWithChildren<StoryDescriptorProps>
> = ({ title, children }) => (
  <div className="story-container">
    <div className="story-title">{title}</div>
    <div className="story-spacer">{children}</div>
  </div>
);
