import * as React from 'react';

import {
  Palette,
  Building,
  AccountCircle,
  Group,
} from '@livechat/design-system-icons';

import { Icon } from '../../../Icon';

import { GallerySelectableCard } from './GallerySelectableCard';

const ICONS = [Palette, Building, AccountCircle, Group];

interface IRadioCardsProps {
  withIcon?: boolean;
  withCustomElement?: boolean;
}

const getComponent = (
  index: number,
  isSelected: boolean,
  setSelectedIndex: (index: number) => void,
  withIcon: boolean | undefined,
  withCustomElement: boolean | undefined,
  type: 'radio' | 'checkbox'
) => (
  <GallerySelectableCard
    key={index}
    label={`Card ${index + 1}`}
    selectionType={type}
    isSelected={isSelected}
    onClick={() => setSelectedIndex(index)}
    {...(withIcon && { icon: <Icon size="xlarge" source={ICONS[index]} /> })}
    {...(withCustomElement && {
      customElement: (
        <div className="gallery-custom-element">
          <Icon size="small" source={ICONS[index]} />
          <div>{`Custom element ${index + 1}`}</div>
        </div>
      ),
    })}
  />
);

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
  withIcon?: boolean;
  withCustomElement?: boolean;
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
