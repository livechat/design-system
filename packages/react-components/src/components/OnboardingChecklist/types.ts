import * as React from 'react';

type ChecklistItemButton = {
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  onClick: () => void;
};

export interface IChecklistItemProps {
  id: string;
  title: string;
  description: string;
  primaryButton: ChecklistItemButton;
  secondaryButton?: ChecklistItemButton;
  placeholder: React.ReactElement;
}

export interface ICheckListItem
  extends Omit<IChecklistItemProps, 'placeholder'> {
  isActive: boolean;
  isChecked: boolean;
  isLastElement: boolean;
  onClick: (id: string) => void;
}

export interface IOnboardingChecklistProps {
  title: string;
  titleLabel?: string;
  items: IChecklistItemProps[];
  activeId: string;
  checkedId: string[];
  onActiveChange: (id: string) => void;
}
