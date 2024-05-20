import * as React from 'react';

import noop from '../../utils/noop';
import { Display, Heading, Text } from '../Typography';

import imageDefault from './assets/image2.png';
import promoImage from './assets/promo-img.png';
import { IPromoBannerV2Props, PromoBannerV2 } from './PromoBannerV2';
import './PromoBannerV2.stories.css';

export default {
  title: 'Components/PromoBannerV2',
  component: PromoBannerV2,
  argTypes: {
    primaryButton: {
      control: false,
    },
    secondaryButton: {
      control: false,
    },
    additionalContent: {
      control: false,
    },
    onClose: {
      action: 'click',
    },
  },
};

const defaultProps = {
  primaryButton: {
    label: 'Main CTA',
    handleClick: noop,
  },
  secondaryButton: {
    label: 'Secondary CTA',
    handleClick: noop,
  },
  onClose: noop,
};

export const Default = (args: IPromoBannerV2Props): React.ReactElement => (
  <PromoBannerV2 {...args} additionalContent={<img src={imageDefault} />}>
    <div style={{ marginBottom: 'var(--spacing-1)' }}>
      <Heading as="div" size="sm" className="promo-header">
        Title text up 2 lines
      </Heading>
    </div>
    <Text as="div">Description text up to 4 lines</Text>
  </PromoBannerV2>
);
Default.args = {
  ...defaultProps,
};

export const WithStyledAdditionalContent = (
  args: IPromoBannerV2Props
): React.ReactElement => (
  <div>
    <div>
      <PromoBannerV2
        {...args}
        additionalContent={
          <div className="image-position">
            <img src={promoImage} />
          </div>
        }
      >
        <div style={{ marginBottom: 'var(--spacing-1)' }}>
          <Display bold>Title text up 2 lines</Display>
        </div>
        <Text as="div">Description text up to 4 lines</Text>
      </PromoBannerV2>
    </div>
    <div style={{ width: 450, marginTop: 30 }}>
      <PromoBannerV2
        {...defaultProps}
        additionalContent={
          <div className="image-position">
            <img src={promoImage} />
          </div>
        }
      >
        <div style={{ marginBottom: 'var(--spacing-1)' }}>
          <Display bold size="sm">
            Title text up 2 lines
          </Display>
        </div>
        <Text as="div">Description text up to 4 lines</Text>
      </PromoBannerV2>
    </div>
  </div>
);
WithStyledAdditionalContent.args = {
  ...defaultProps,
};

export const WithStyledMainContent = (): React.ReactElement => (
  <div style={{ maxWidth: 1100 }}>
    <PromoBannerV2 className="custom-background">
      <div className="custom-text-position">
        <span className="head">Feed Chip</span>
        <span className="text">with knowledge...</span>
      </div>
    </PromoBannerV2>
  </div>
);
