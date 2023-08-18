import * as React from 'react';

import noop from '../../utils/noop';
import { Heading } from '../Typography';

import imageDefault from './assets/image2.png';
import promoImage from './assets/promo-img.png';
import { PromoBannerV2 } from './PromoBannerV2';
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

export const Default = (): React.ReactElement => (
  <PromoBannerV2
    {...defaultProps}
    additionalContent={<img src={imageDefault} />}
  >
    <div style={{ marginBottom: 'var(--spacing-1)' }}>
      <Heading as="div" size="sm" className="promo-header">
        Title text up 2 lines
      </Heading>
    </div>
    Description text up to 4 lines
  </PromoBannerV2>
);

export const WithStyledAdditionalContent = (): React.ReactElement => (
  <div>
    <div>
      <PromoBannerV2
        {...defaultProps}
        additionalContent={
          <div className="image-position">
            <img src={promoImage} />
          </div>
        }
      >
        <div style={{ marginBottom: 'var(--spacing-1)' }}>
          <Heading as="div" size="sm" className="promo-header">
            Title text up 2 lines
          </Heading>
        </div>
        Description text up to 4 lines
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
          <Heading as="div" size="sm" className="promo-header">
            Title text up 2 lines
          </Heading>
        </div>
        Description text up to 4 lines
      </PromoBannerV2>
    </div>
  </div>
);

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
