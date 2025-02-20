import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import image from '../../stories/assets/avatar.jpg';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';
import noop from '../../utils/noop';

import {
  DEFAULT_PICKER_OPTIONS,
  DEFAULT_EXTENDED_OPTIONS,
  DEFAULT_MORE_PICKER_OPTIONS,
  CUSTOM_ITEMS,
} from './constants';
import { Picker } from './Picker';
import { IPickerListItem, IPickerProps } from './types';

import './PickerStories.css';

export default {
  title: 'Components/Picker',
  component: Picker,
  argTypes: {
    options: {
      control: false,
    },
    selected: {
      control: false,
    },
    onSelect: { action: 'changed' },
  },
  parameters: {
    chromatic: { delay: 300 },
  },
} as Meta<typeof Picker>;

const commonWidth: React.CSSProperties = {
  width: 300,
  height: customHeightForChromatic('1000px'),
};

const PickerComponent = (args: IPickerProps) => {
  const [selectedItems, setSelectedItems] = React.useState<
    IPickerListItem[] | null
  >(args.selected || null);

  return (
    <Picker
      {...args}
      selected={selectedItems}
      onSelect={(items) => setSelectedItems(items)}
    />
  );
};

const StoryTemplate: StoryFn<IPickerProps> = (args: IPickerProps) => {
  return (
    <div style={{ height: 320 }}>
      <PickerComponent {...args} />
    </div>
  );
};

export const Default = StoryTemplate.bind({});
Default.args = {
  options: DEFAULT_PICKER_OPTIONS,
  openedOnInit: true,
};

export const States = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 100 }}>
    <StoryDescriptor title="Basic">
      <PickerComponent options={DEFAULT_PICKER_OPTIONS} onSelect={noop} />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select + Basic">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="multi"
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        disabled
      />
    </StoryDescriptor>
    <StoryDescriptor title="ReadOnly">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        inputProps={{ readOnly: true }}
        selected={[
          { key: 'two', name: 'Option two' },
          { key: 'three', name: 'Option three' },
        ]}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Error">
      <PickerComponent options={DEFAULT_PICKER_OPTIONS} onSelect={noop} error />
    </StoryDescriptor>
    <StoryDescriptor title="Error + Disabled">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        disabled
        error
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled + Selected option">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        disabled
        selected={[{ key: 'two', name: 'Option two' }]}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select + Disabled + Selected option">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="multi"
        disabled
        selected={[
          { key: 'two', name: 'Option two' },
          { key: 'three', name: 'Option three' },
        ]}
      />
    </StoryDescriptor>
  </div>
);

export const PickerWithGroupedOptions = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <PickerComponent
      openedOnInit
      options={DEFAULT_EXTENDED_OPTIONS}
      onSelect={noop}
    />
  </div>
);

export const PickerWithMoreOptions = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <StoryDescriptor title="Single select">
      <PickerComponent
        openedOnInit
        options={DEFAULT_MORE_PICKER_OPTIONS}
        onSelect={noop}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select">
      <PickerComponent
        options={DEFAULT_MORE_PICKER_OPTIONS}
        onSelect={noop}
        type="multi"
      />
    </StoryDescriptor>
  </div>
);

const CustomPickerOption: React.FC<React.PropsWithChildren> = ({
  children,
}) => <div className="custom-picker-option">{children}</div>;

export const PickerWithOptionsAsCustomElements = (): React.ReactElement => (
  <div
    style={{
      ...commonWidth,
      marginBottom: 320,
      height: customHeightForChromatic('1000px'),
    }}
  >
    <StoryDescriptor title="Single select">
      <PickerComponent
        openedOnInit
        options={[
          {
            key: 'one',
            name: 'Example custom element one',
            customElement: {
              listItemBody: (
                <CustomPickerOption>
                  <img className="image" src={image} />
                  <div>
                    <div className="title">Example custom element one</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img className="image selected" src={image} />
                  <div className="title selected">
                    Example custom element one
                  </div>
                </CustomPickerOption>
              ),
            },
          },
          {
            key: 'two',
            name: 'Example custom element two',
            customElement: {
              listItemBody: (
                <CustomPickerOption>
                  <img className="image" src={image} />
                  <div>
                    <div className="title">Example custom element two</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img className="image selected" src={image} />
                  <div className="title selected">
                    Example custom element two
                  </div>
                </CustomPickerOption>
              ),
            },
          },
        ]}
        onSelect={noop}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Multi select">
      <PickerComponent
        options={[
          {
            key: 'one',
            name: 'Example custom element one',
            customElement: {
              listItemBody: (
                <CustomPickerOption>
                  <img className="image" src={image} />
                  <div>
                    <div className="title">Example custom element one</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img className="image selected" src={image} />
                  <div className="title selected">Example element one</div>
                </CustomPickerOption>
              ),
            },
          },
          {
            key: 'two',
            name: 'Example custom element two',
            customElement: {
              listItemBody: (
                <CustomPickerOption>
                  <img className="image" src={image} />
                  <div>
                    <div className="title">Example custom element two</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img className="image selected" src={image} />
                  <div className="title selected">Example element two</div>
                </CustomPickerOption>
              ),
            },
          },
        ]}
        type="multi"
        onSelect={noop}
      />
    </StoryDescriptor>
  </div>
);

export const PickerWithCustomSelectedItem = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <StoryDescriptor title="Multi select + Custom option selected">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="multi"
        selected={[
          { key: 'two', name: 'Option two' },
          { key: 'custom-option', name: 'Custom option' },
        ]}
      />
    </StoryDescriptor>
  </div>
);

export const MultiPickerWithCustomSelectedTagProps = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <StoryDescriptor title="Multi select + Custom option selected">
      <PickerComponent
        options={CUSTOM_ITEMS}
        selected={CUSTOM_ITEMS}
        onSelect={noop}
        type="multi"
      />
    </StoryDescriptor>
  </div>
);

export const SearchBehavior = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
    <StoryDescriptor title="Single select - Clear search after selection">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="single"
        clearSearchAfterSelection
      />
    </StoryDescriptor>

    <StoryDescriptor title="Single select - Keep search after selection">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="single"
        clearSearchAfterSelection={false}
      />
    </StoryDescriptor>

    <StoryDescriptor title="Multi select - Clear search after selection">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="multi"
        clearSearchAfterSelection
      />
    </StoryDescriptor>

    <StoryDescriptor title="Multi select - Keep search after selection">
      <PickerComponent
        options={DEFAULT_PICKER_OPTIONS}
        onSelect={noop}
        type="multi"
        clearSearchAfterSelection={false}
      />
    </StoryDescriptor>
  </div>
);
