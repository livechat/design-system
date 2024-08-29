import * as React from 'react';

import { Tag as TagIcon } from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';
import { IPickerListItem, Picker } from '../Picker';
import { Tag } from '../Tag';

import { Accordion } from './Accordion';
import { RULE_PICKER_OPTIONS, TAGS_PICKER_OPTIONS } from './stories-helpers';

import './Accordion.stories.css';

export default {
  title: 'Components/Accordion',
  component: Accordion,
} as Meta<typeof Accordion>;

export const Default = (): React.ReactElement => {
  return <Accordion label="Accordion label">Accordion content</Accordion>;
};

export const Kinds = (): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Default">
        <Accordion label="Default" kind="default">
          Default accordion content
        </Accordion>
      </StoryDescriptor>
      <StoryDescriptor title="Warning">
        <Accordion label="Warning" kind="warning">
          Warning accordion content
        </Accordion>
      </StoryDescriptor>
      <StoryDescriptor title="Error">
        <Accordion label="Error" kind="error">
          Error accordion content
        </Accordion>
      </StoryDescriptor>
    </div>
  );
};

export const Example = (): React.ReactElement => {
  const [ruleSelected, setRuleSelected] = React.useState<
    IPickerListItem[] | null
  >([RULE_PICKER_OPTIONS[0]]);
  const [tagSelected, setTagSelected] = React.useState<
    IPickerListItem[] | null
  >([TAGS_PICKER_OPTIONS[0]]);

  return (
    <div>
      <Accordion
        label={
          <div className="label">
            <Icon source={TagIcon} />
            Tag <Tag>{ruleSelected && ruleSelected[0].name}</Tag>
            and
            {tagSelected &&
              tagSelected &&
              tagSelected.map((tag) => <Tag key={tag.key}>{tag.name}</Tag>)}
          </div>
        }
      >
        <div className="accordion-content-container">
          <div className="rule-picker">
            <Picker
              id="rule-picker"
              options={RULE_PICKER_OPTIONS}
              selected={ruleSelected}
              hideClearButton
              searchDisabled
              onSelect={(selected) => setRuleSelected(selected)}
            />
          </div>
          <Picker
            id="first-picker"
            type="multi"
            options={TAGS_PICKER_OPTIONS}
            selected={tagSelected}
            onSelect={(selected) => setTagSelected(selected)}
          />
        </div>
      </Accordion>
    </div>
  );
};
