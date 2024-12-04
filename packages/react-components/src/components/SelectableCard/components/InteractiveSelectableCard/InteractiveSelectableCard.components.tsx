import * as React from 'react';

import { InteractiveSelectableCard } from './InteractiveSelectableCard';

const getComponent = (
  index: number,
  isSelected: boolean,
  setSelectedIndex: (index: number) => void,
  type: 'radio' | 'checkbox',
  children: React.ReactNode
) => (
  <InteractiveSelectableCard
    key={index}
    selectionType={type}
    isSelected={isSelected}
    onClick={() => setSelectedIndex(index)}
    style={{ maxWidth: 514 }}
  >
    {children}
  </InteractiveSelectableCard>
);

interface IRadioCardsProps {
  children: React.ReactNode;
}

export const RadioCards: React.FC<IRadioCardsProps> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  return [...Array(3)].map((_, index) =>
    getComponent(
      index,
      selectedIndex === index,
      setSelectedIndex,
      'radio',
      children
    )
  );
};

interface ICheckboxCardsProps {
  children: React.ReactNode;
}

export const CheckboxCards: React.FC<ICheckboxCardsProps> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((selected) => selected !== index));
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };

  return [...Array(3)].map((_, index) =>
    getComponent(
      index,
      selectedIndex.includes(index),
      handleCardClick,
      'checkbox',
      children
    )
  );
};
