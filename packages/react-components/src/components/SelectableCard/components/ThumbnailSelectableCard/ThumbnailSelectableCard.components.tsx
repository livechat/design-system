import * as React from 'react';

import {
  Palette,
  Building,
  AccountCircle,
  Group,
} from '@livechat/design-system-icons';

import { Icon } from '../../../Icon';

import { ThumbnailSelectableCard } from './ThumbnailSelectableCard';

const ICONS = [Palette, Building, AccountCircle, Group];

interface IRadioCardsProps {
  withDescription?: boolean;
  withIcon?: boolean;
  withCustomElement?: boolean;
}

const getComponent = (
  index: number,
  isSelected: boolean,
  setSelectedIndex: (index: number) => void,
  withDescription: boolean | undefined,
  withIcon: boolean | undefined,
  withCustomElement: boolean | undefined,
  type: 'radio' | 'checkbox'
) => (
  <ThumbnailSelectableCard
    key={index}
    label={`Card ${index + 1}`}
    selectionType={type}
    isSelected={isSelected}
    onClick={() => setSelectedIndex(index)}
    {...(withDescription && {
      description: `Description for card ${index + 1}`,
    })}
    {...(withIcon && { icon: <Icon source={ICONS[index]} /> })}
    {...(withCustomElement && {
      customElement: (
        <div className="thumbnail-custom-element">
          <Icon size="small" source={ICONS[index]} />
          <div>{`Custom element ${index + 1}`}</div>
        </div>
      ),
    })}
  />
);

export const RadioCards: React.FC<IRadioCardsProps> = ({
  withDescription,
  withIcon,
  withCustomElement,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  return [...Array(4)].map((_, index) =>
    getComponent(
      index,
      selectedIndex === index,
      setSelectedIndex,
      withDescription,
      withIcon,
      withCustomElement,
      'radio'
    )
  );
};

interface ICheckboxCardsProps {
  withDescription?: boolean;
  withIcon?: boolean;
  withCustomElement?: boolean;
}

export const CheckboxCards: React.FC<ICheckboxCardsProps> = ({
  withDescription,
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
      withDescription,
      withIcon,
      withCustomElement,
      'checkbox'
    )
  );
};
