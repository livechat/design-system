import * as React from 'react';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Tag } from '../Tag';

import { DetailsCard } from './DetailsCard';
import { DetailsCardInfo } from './DetailsCardInfo';

export default {
  title: 'Components/DetailsCard',
  component: DetailsCard,
};

export const Default = () => {
  return (
    <div
      style={{
        width: 500,
      }}
    >
      <DetailsCard label="Card with text">
        <div>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </div>
      </DetailsCard>
      <DetailsCard label="Card with Info components" withDivider openOnInit>
        <DetailsCardInfo label="Groups">
          <Avatar
            type="text"
            text="General"
            shape="rounded-square"
            size="xxsmall"
          />
          General
        </DetailsCardInfo>
        <DetailsCardInfo label="Chat ID">RJL354332</DetailsCardInfo>
        <DetailsCardInfo label="Queued for">30s</DetailsCardInfo>
        <DetailsCardInfo label="Started on">
          <Button kind="link" href="">
            Pricing page
          </Button>
        </DetailsCardInfo>
        <DetailsCardInfo label="Tags">
          <Tag size="small">Sales</Tag>
          <Tag size="small">Refund</Tag>
          <Button size="compact" kind="text">
            +Add
          </Button>
        </DetailsCardInfo>
        <Button kind="secondary" style={{ marginTop: 8 }}>
          View more
        </Button>
      </DetailsCard>
      <DetailsCard label="Test label" withDivider>
        <div>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </div>
      </DetailsCard>
    </div>
  );
};
