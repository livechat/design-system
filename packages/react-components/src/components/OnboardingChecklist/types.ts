import * as React from 'react';

type ChecklistItemButton = {
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  onClick: () => void;
};

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  primaryButton: ChecklistItemButton;
  secondaryButton?: ChecklistItemButton;
}

export interface ICheckListItem extends ChecklistItem {
  isActive: boolean;
  isChecked: boolean;
  isLastElement: boolean;
  onClick: (id: string) => void;
}

export interface IOnboardingChecklistProps {
  title: string;
  titleLabel?: string;
  items: ChecklistItem[];
  activeId: string;
  checkedId: string[];
  onActiveChange: (id: string) => void;
}
