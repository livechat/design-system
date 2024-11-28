import * as React from 'react';

import { Building } from '@livechat/design-system-icons';

import { Icon } from '../Icon';

import { ThumbnailSelectableCard } from './components';

interface IRadioCardsProps {
  withDescription?: boolean;
  withIcon?: boolean;
  withCustomElement?: boolean;
}

export const RadioCards: React.FC<IRadioCardsProps> = ({
  withDescription,
  withIcon,
  withCustomElement,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  return [...Array(4)].map((_, index) => (
    <ThumbnailSelectableCard
      key={index}
      label={`Card ${index + 1}`}
      selectionType="radio"
      isSelected={selectedIndex === index}
      onClick={() => setSelectedIndex(index)}
      {...(withDescription && {
        description: `Description for card ${index + 1}`,
      })}
      {...(withIcon && { icon: <Icon source={Building} /> })}
      {...(withCustomElement && {
        customElement: (
          <div className="custom-element">
            <Icon size="small" source={Building} />
            <div>{`Custom element ${index + 1}`}</div>
          </div>
        ),
      })}
    />
  ));
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

  return [...Array(4)].map((_, index) => (
    <ThumbnailSelectableCard
      key={index}
      label={`Card ${index + 1}`}
      selectionType="checkbox"
      isSelected={selectedIndex.includes(index)}
      onClick={() => handleCardClick(index)}
      {...(withDescription && {
        description: `Description for card ${index + 1}`,
      })}
      {...(withIcon && { icon: <Icon source={Building} /> })}
      {...(withCustomElement && {
        customElement: (
          <div className="custom-element">
            <Icon size="small" source={Building} />
            <div>{`Custom element ${index + 1}`}</div>
          </div>
        ),
      })}
    />
  ));
};
