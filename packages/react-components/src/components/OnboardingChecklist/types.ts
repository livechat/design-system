import * as React from 'react';

export interface IChecklistItemProps {
  id: string;
  title: string;
  description: string;
  cta: React.ReactElement;
  placeholder: React.ReactElement;
}

export interface ICheckListItem
  extends Omit<IChecklistItemProps, 'placeholder'> {
  isActive: boolean;
  isChecked: boolean;
  isLastElement: boolean;
  onClick: (id: string) => void;
}

type CompleteItem = {
  title: string;
  titleLabel?: string;
  placeholder?: React.ReactElement;
  delay?: number;
};

export interface IOnboardingChecklistProps {
  className?: string;
  title: string;
  titleLabel?: string;
  items: IChecklistItemProps[];
  activeId: string;
  checkedId: string[];
  onActiveChange: (id: string) => void;
  placeholderClassName?: string;
  isCompleted?: boolean;
  completeItem: CompleteItem;
}
