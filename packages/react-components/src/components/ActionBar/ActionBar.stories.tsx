import * as React from 'react';

import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { ActionBar } from './ActionBar';
import { getDefaultOptions } from './constants';

export default {
  title: 'Experimental/ActionBar',
  component: ActionBar,
  argTypes: {
    options: {
      control: false,
    },
    activeOptionKey: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof ActionBar>;

export const Default = (): React.ReactElement => {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  return (
    <div style={{ width: 220, height: 150 }}>
      <ActionBar
        activeOptionKey={activeKey}
        options={getDefaultOptions(setActiveKey)}
      />
    </div>
  );
};

export const Horizontal = (): React.ReactElement => {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [verticalActiveKeyScroll, setActiveKeyScroll] = React.useState<
    string | null
  >(null);

  return (
    <>
      <StoryDescriptor title={'Horizontal'}>
        <div style={{ width: 220, height: 50 }}>
          <ActionBar
            id="action-bar-area-no-scroll"
            activeOptionKey={activeKey}
            options={getDefaultOptions(setActiveKey)}
          />
        </div>
      </StoryDescriptor>
      <StoryDescriptor title={'Horizontal with scroll'}>
        <div style={{ width: 220, height: 50 }}>
          <ActionBar
            id="action-bar-area-scroll"
            type="scroll"
            activeOptionKey={verticalActiveKeyScroll}
            options={getDefaultOptions(setActiveKeyScroll)}
          />
        </div>
      </StoryDescriptor>
    </>
  );
};

export const Vertical = (): React.ReactElement => {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [activeKeyScroll, setActiveKeyScroll] = React.useState<string | null>(
    null
  );

  return (
    <>
      <StoryDescriptor title={'Vertical'}>
        <div style={{ height: 220, width: 50 }}>
          <ActionBar
            id="action-bar-area-vertical"
            vertical
            activeOptionKey={activeKey}
            options={getDefaultOptions(setActiveKey)}
          />
        </div>
      </StoryDescriptor>
      <StoryDescriptor title={'Vertical with scroll'}>
        <div style={{ height: 220, width: 50 }}>
          <ActionBar
            id="action-bar-area-vertical-scroll"
            vertical
            type="scroll"
            activeOptionKey={activeKeyScroll}
            options={getDefaultOptions(setActiveKeyScroll)}
          />
        </div>
      </StoryDescriptor>
    </>
  );
};
