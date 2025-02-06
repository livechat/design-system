import { ReactElement } from 'react';

import { Accordion } from '../Accordion';
import { ActionBar } from '../ActionBar';
import { getDefaultOptions } from '../ActionBar/constants';
import { Button } from '../Button';
import { SkeletonAvatar, SkeletonText, SkeletonWrapper } from '../Skeleton';
import { Heading, Text } from '../Typography';

import './stories-helpers.css';

export const AppContent = ({
  onStartGuideClick,
}: {
  onStartGuideClick: () => void;
}): ReactElement => {
  return (
    <div className="main">
      <div id="chat-list-column" className="column left">
        <div className="column-header">
          <Heading size="sm">Chats</Heading>
        </div>
        <div className="chats-list">
          {[...Array(7)].map((_, index) => (
            <div
              key={`chats-list-item-${index}`}
              id={`chats-list-item-${index}`}
              className="chats-list-item"
            >
              <SkeletonWrapper>
                <SkeletonAvatar size={36} />
                <SkeletonWrapper vertical>
                  <SkeletonText width={100} />
                  <SkeletonText />
                </SkeletonWrapper>
              </SkeletonWrapper>
            </div>
          ))}
        </div>
      </div>
      <div className="column center">
        <div className="feed">
          <SkeletonWrapper>
            <SkeletonAvatar size={36} />
            <SkeletonWrapper vertical>
              <SkeletonText height={36} />
              <SkeletonText height={26} />
              <SkeletonText height={46} />
            </SkeletonWrapper>
          </SkeletonWrapper>
          <SkeletonWrapper>
            <SkeletonWrapper vertical>
              <SkeletonText height={26} />
              <SkeletonText height={16} />
            </SkeletonWrapper>
            <SkeletonAvatar size={36} />
          </SkeletonWrapper>
        </div>
        <div className="start-guide ">
          <Button onClick={onStartGuideClick}>Start guide</Button>
        </div>
        <div className="text-area">
          <SkeletonWrapper id="text-area">
            <SkeletonText height={130} />
          </SkeletonWrapper>
        </div>
      </div>
      <div className="column right">
        <div className="column-header">
          <ActionBar
            id="action-bar-area"
            className="action-bar-area"
            options={getDefaultOptions(() => {})}
          />
        </div>
        <div className="sections-list">
          <Accordion label="Section 1">
            <Text>Section 1 content</Text>
          </Accordion>
          <Accordion id="accordion" label="Section 2">
            <Text>Section 2 content</Text>
          </Accordion>
          <Accordion label="Section 3">
            <Text>Section 3 content</Text>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
