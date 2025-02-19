import * as React from 'react';

import { Tag as TagIcon } from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';
import { IPickerListItem, Picker } from '../Picker';
import { Tag } from '../Tag';
import { Heading, Text } from '../Typography';

import {
  Accordion,
  AccordionPromo as AccordionPromoComponent,
} from './Accordion';
import { RULE_PICKER_OPTIONS, TAGS_PICKER_OPTIONS } from './stories-helpers';

import './Accordion.css';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionPromo: AccordionPromoComponent,
  },
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

export const Examples = (): React.ReactElement => {
  const [ruleSelected, setRuleSelected] = React.useState<
    IPickerListItem[] | null
  >([RULE_PICKER_OPTIONS[0]]);
  const [tagSelected, setTagSelected] = React.useState<
    IPickerListItem[] | null
  >([TAGS_PICKER_OPTIONS[0]]);

  return (
    <div>
      <StoryDescriptor title="With changing label">
        <Accordion
          label={{
            closed: (
              <div className="label">
                <Icon source={TagIcon} />
                Tag <Tag>{ruleSelected && ruleSelected[0].name}</Tag>
                and
                {tagSelected &&
                  tagSelected &&
                  tagSelected.map((tag) => <Tag key={tag.key}>{tag.name}</Tag>)}
              </div>
            ),
            open: <div className="label">Edit your tags</div>,
          }}
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
      </StoryDescriptor>
      <StoryDescriptor title="With multiline element">
        <Accordion
          label="Default"
          multilineElement={
            <div className="multiline">
              <p>{`Hello {{ticket.requesterName}},`}</p>
              <p>
                We haven't heard back from you for some time. If you need any
                further help, please follow up on this email.
              </p>
              <p>Thank you.</p>
            </div>
          }
        >
          Default accordion content
        </Accordion>
      </StoryDescriptor>
      <StoryDescriptor title="With footer">
        <Accordion label="Default" footer={<div>Example footer element</div>}>
          Default accordion content
        </Accordion>
      </StoryDescriptor>
    </div>
  );
};

export const AccordionPromo = (): React.ReactElement => {
  return (
    <AccordionPromoComponent label="Default">
      Default accordion content
    </AccordionPromoComponent>
  );
};

export const AccordionPromoExamples = (): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="With changing label">
        <AccordionPromoComponent
          label={{
            closed: (
              <div>
                <Heading
                  as="div"
                  size="xs"
                  className="accordion-promo-closed-heading"
                >
                  This example headline has 40 characters
                </Heading>
                <Text
                  as="div"
                  size="sm"
                  className="accordion-promo-closed-description"
                >
                  A description with a maximum of 100 characters. That usually
                  means only one or two sentences
                </Text>
              </div>
            ),
            open: (
              <Heading as="div" size="xs">
                Example headline for open state
              </Heading>
            ),
          }}
        >
          Default accordion content
        </AccordionPromoComponent>
      </StoryDescriptor>
      <StoryDescriptor title="With multiline element">
        <AccordionPromoComponent
          label="Default"
          multilineElement={
            <div className="multiline">
              <p>{`Hello {{ticket.requesterName}},`}</p>
              <p>
                We haven't heard back from you for some time. If you need any
                further help, please follow up on this email.
              </p>
              <p>Thank you.</p>
            </div>
          }
        >
          Default accordion content
        </AccordionPromoComponent>
      </StoryDescriptor>
      <StoryDescriptor title="With footer">
        <AccordionPromoComponent
          label="Default"
          footer={<div>Example footer element</div>}
        >
          Default accordion content
        </AccordionPromoComponent>
      </StoryDescriptor>
    </div>
  );
};
