import * as React from 'react';

import {
  Palette,
  Building,
  AccountCircle,
  Group,
} from '@livechat/design-system-icons';

import { Icon } from '../../../Icon';

import { GallerySelectableCard } from './GallerySelectableCard';
import { IGallerySelectableCardProps } from './types';

const ICONS = [Palette, Building, AccountCircle, Group];

const getComponent = (
  index: number,
  isSelected: boolean,
  setSelectedIndex: (index: number) => void,
  withIcon: boolean,
  withCustomElement: boolean,
  type: 'radio' | 'checkbox'
) => {
  let props: IGallerySelectableCardProps = {
    label: `Card ${index + 1}`,
    selectionType: type,
    isSelected,
    onClick: () => setSelectedIndex(index),
    icon: undefined,
    customElement: undefined,
  };

  if (withIcon) {
    const { customElement: _, ...newProps } = props;
    props = {
      ...newProps,
      icon: <Icon size="xlarge" source={ICONS[index]} />,
    };
  } else if (withCustomElement) {
    const { icon: _, ...newProps } = props;
    props = {
      ...newProps,
      customElement: (
        <div className="base-custom-element gallery-custom-element">
          <Icon size="small" source={ICONS[index]} />
          <div>{`Custom element ${index + 1}`}</div>
        </div>
      ),
    };
  }

  return <GallerySelectableCard key={index} {...props} />;
};

interface IRadioCardsProps {
  withIcon: boolean;
  withCustomElement: boolean;
}

export const RadioCards: React.FC<IRadioCardsProps> = ({
  withIcon,
  withCustomElement,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  return [...Array(4)].map((_, index) =>
    getComponent(
      index,
      selectedIndex === index,
      setSelectedIndex,
      withIcon,
      withCustomElement,
      'radio'
    )
  );
};

interface ICheckboxCardsProps {
  withIcon: boolean;
  withCustomElement: boolean;
}

export const CheckboxCards: React.FC<ICheckboxCardsProps> = ({
  withIcon,
  withCustomElement,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((selected) => selected !== index));
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };

  return [...Array(4)].map((_, index) =>
    getComponent(
      index,
      selectedIndex.includes(index),
      handleCardClick,
      withIcon,
      withCustomElement,
      'checkbox'
    )
  );
};
