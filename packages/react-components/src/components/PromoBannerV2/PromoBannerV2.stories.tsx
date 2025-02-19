import * as React from 'react';

import noop from '../../utils/noop';
import { Display, Heading, Text } from '../Typography';

import imageDefault from './assets/image2.png';
import promoImage from './assets/promo-img.png';
import { PromoBannerV2 } from './PromoBannerV2';
import * as styles from './PromoBannerV2.stories.styles';
import { IPromoBannerV2Props } from './types';

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
      <Heading as="div" size="sm" className={styles.promoHeader}>
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
          <div className={styles.imagePosition}>
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
          <div className={styles.imagePosition}>
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
    <PromoBannerV2 className={styles.customBackground}>
      <div className={styles.customTextPosition}>
        <span className={styles.head}>Feed Chip</span>
        <span className={styles.text}>with knowledge...</span>
      </div>
    </PromoBannerV2>
  </div>
);

export const Dark = (args: IPromoBannerV2Props): React.ReactElement => (
  <PromoBannerV2
    {...args}
    className={styles.darkPromoBanner}
    additionalContent={<img src="https://placehold.co/600x360" />}
    additionalContentClassName={styles.darkPromoAdditionalContent}
  >
    <Heading size="sm" className={styles.darkPromoHeader}>
      Hi 👋 Using Shopify integration?
    </Heading>
    <Text noMargin>
      We want to make it as useful as possible and would love your thoughts on
      that!
    </Text>
    <Text>
      Join us for a video call, and we'll thank you with a $25 gift card.
    </Text>
  </PromoBannerV2>
);

Dark.args = {
  primaryButton: {
    label: 'Schedule a call',
    handleClick: noop,
    kind: 'high-contrast',
  },
  secondaryButton: {
    label: 'Remind me in a week',
    handleClick: noop,
  },
  onClose: noop,
  kind: 'dark',
};
