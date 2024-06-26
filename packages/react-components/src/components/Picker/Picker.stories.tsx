import * as React from 'react';

import { Meta, StoryContext, StoryFn } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { VirtuosoMockContext } from 'react-virtuoso';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import noop from '../../utils/noop';

import {
  DEFAULT_PICKER_OPTIONS,
  DEFAULT_EXTENDED_OPTIONS,
  DEFAULT_MORE_PICKER_OPTIONS,
} from './constants';
import { Picker } from './Picker';
import { IPickerListItem, IPickerProps } from './types';

import './Picker.stories.css';

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
} as Meta<typeof Picker>;

const commonWidth: React.CSSProperties = { width: 300 };

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

const CustomPickerOption: React.FC = ({ children }) => (
  <div className="custom-picker-option">{children}</div>
);

export const PickerWithOptionsAsCustomElements = (): React.ReactElement => (
  <div style={{ ...commonWidth, marginBottom: 320 }}>
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
                  <img
                    className="image"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
                  <div>
                    <div className="title">Example custom element one</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img
                    className="image selected"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
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
                  <img
                    className="image"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
                  <div>
                    <div className="title">Example custom element two</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img
                    className="image selected"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
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
                  <img
                    className="image"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
                  <div>
                    <div className="title">Example custom element one</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img
                    className="image selected"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
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
                  <img
                    className="image"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
                  <div>
                    <div className="title">Example custom element two</div>
                    <div className="description">Example custom element</div>
                  </div>
                </CustomPickerOption>
              ),
              selectedItemBody: (
                <CustomPickerOption>
                  <img
                    className="image selected"
                    src="https://avatars2.githubusercontent.com/u/29309941?s=88&v=4"
                  />
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

export const PickerIntegrationTest = (
  args: IPickerProps
): React.ReactElement => {
  return (
    <div style={{ height: 320 }}>
      <VirtuosoMockContext.Provider
        value={{ viewportHeight: 400, itemHeight: 10 }}
      >
        <PickerComponent {...args} />
      </VirtuosoMockContext.Provider>
    </div>
  );
};
PickerIntegrationTest.args = {
  options: DEFAULT_PICKER_OPTIONS,
};
PickerIntegrationTest.tags = ['dev'];
PickerIntegrationTest.play = async ({
  canvasElement,
  step,
}: StoryContext<typeof Picker>['play']) => {
  const canvas = within(canvasElement.parentElement!);

  await step('Render picker', async () => {
    await expect(canvas.getByRole('combobox')).toBeVisible();
  });

  await step('Open the list after trigger click', async () => {
    await userEvent.click(canvas.getByText('Select option'));
    await expect(canvas.getByRole('listbox')).toBeVisible();
  });

  await step('Select single option', async () => {
    await userEvent.click(canvas.getByText('Option one'));
  });

  await step('Close the list and show selected option', async () => {
    await expect(canvas.queryByRole('listbox')).not.toBeInTheDocument();
    await expect(canvas.getByRole('combobox')).toHaveTextContent('Option one');
  });
};
