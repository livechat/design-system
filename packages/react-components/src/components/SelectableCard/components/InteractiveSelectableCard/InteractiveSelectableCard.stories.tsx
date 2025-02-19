import { Palette } from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../../../stories/components/StoryDescriptor';
import { Icon } from '../../../Icon';
import { Heading, Text } from '../../../Typography';

import { GridCol, GridRow, GridWrapper } from './InteractiveGrid';
import { InteractiveSelectableCard } from './InteractiveSelectableCard';
import {
  CheckboxCards,
  RadioCards,
} from './InteractiveSelectableCard.components';

import '../../SelectableCard.css';

export default {
  title: 'Components/SelectableCard/InteractiveSelectableCard',
  component: InteractiveSelectableCard,
} as Meta<typeof InteractiveSelectableCard>;

export const RadioTypeExamples = () => (
  <>
    <StoryDescriptor title="Content">
      <RadioCards>
        <div>
          <Heading size="xs" className="interactive-heading">
            Default custom page event
          </Heading>
          <Text className="interactive-text">
            Goal is achieved when a specific condition set in your website’s
            code. This can be filling out a registration form.
          </Text>
        </div>
      </RadioCards>
    </StoryDescriptor>
    <StoryDescriptor title="Content in rows">
      <RadioCards>
        <GridWrapper>
          <GridRow>
            <div>
              <Heading size="xs" className="interactive-heading">
                Default custom page event
              </Heading>
              <Text className="interactive-text">
                Goal is achieved when a specific condition set in your website’s
                code. This can be filling out a registration form.
              </Text>
            </div>
          </GridRow>
          <GridRow>
            <div className="base-custom-element interactive-custom-element">
              <Icon source={Palette} />
              <div>Replace me with Image, animation, video</div>
            </div>
          </GridRow>
        </GridWrapper>
      </RadioCards>
    </StoryDescriptor>
    <StoryDescriptor title="Content in columns">
      <RadioCards>
        <GridWrapper>
          <GridCol>
            <div>
              <Heading size="xs" className="interactive-heading">
                Default custom page event
              </Heading>
              <Text className="interactive-text">
                Goal is achieved when a specific condition set in your website’s
                code. This can be filling out a registration form.
              </Text>
            </div>
          </GridCol>
          <GridCol>
            <div className="base-custom-element interactive-custom-element">
              <Icon source={Palette} />
              <div>Replace me with Image, animation, video</div>
            </div>
          </GridCol>
        </GridWrapper>
      </RadioCards>
    </StoryDescriptor>
  </>
);

export const CheckboxTypeExamples = () => (
  <>
    <StoryDescriptor title="Content">
      <CheckboxCards>
        <div>
          <Heading size="xs" className="interactive-heading">
            Default custom page event
          </Heading>
          <Text className="interactive-text">
            Goal is achieved when a specific condition set in your website’s
            code. This can be filling out a registration form.
          </Text>
        </div>
      </CheckboxCards>
    </StoryDescriptor>
    <StoryDescriptor title="Content in rows">
      <CheckboxCards>
        <GridWrapper>
          <GridRow>
            <div>
              <Heading size="xs" className="interactive-heading">
                Default custom page event
              </Heading>
              <Text className="interactive-text">
                Goal is achieved when a specific condition set in your website’s
                code. This can be filling out a registration form.
              </Text>
            </div>
          </GridRow>
          <GridRow>
            <div className="base-custom-element interactive-custom-element">
              <Icon source={Palette} />
              <div>Replace me with Image, animation, video</div>
            </div>
          </GridRow>
        </GridWrapper>
      </CheckboxCards>
    </StoryDescriptor>
    <StoryDescriptor title="Content in columns">
      <CheckboxCards>
        <GridWrapper>
          <GridCol>
            <div>
              <Heading size="xs" className="interactive-heading">
                Default custom page event
              </Heading>
              <Text className="interactive-text">
                Goal is achieved when a specific condition set in your website’s
                code. This can be filling out a registration form.
              </Text>
            </div>
          </GridCol>
          <GridCol>
            <div className="base-custom-element interactive-custom-element">
              <Icon source={Palette} />
              <div>Replace me with Image, animation, video</div>
            </div>
          </GridCol>
        </GridWrapper>
      </CheckboxCards>
    </StoryDescriptor>
  </>
);
