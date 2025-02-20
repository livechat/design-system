import * as React from 'react';

export interface IChecklistItemProps {
  /**
   * Define the unique id of the item
   */
  id: string;
  /**
   * Set the title of the item
   */
  title: string;
  /**
   * Set the additional text for the title
   */
  titleHint?: string;
  /**
   * Set the description of the item
   */
  description?: string;
  /**
   * Set the custom content of the item
   */
  customContent?: React.ReactElement;
  /**
   * The element to display when the item is active
   */
  cta: React.ReactElement;
  /**
   * The element to display in the right column when the item is active
   */
  placeholder: React.ReactElement;
}

export interface ICheckListItem
  extends Omit<IChecklistItemProps, 'placeholder'> {
  isActive: boolean;
  isChecked: boolean;
  onClick: (id: string) => void;
}

export type ICompletionMessageDataProps = {
  /**
   * Set the title of the complete state
   */
  title: string;
  /**
   * Set the greeting text of the complete state
   */
  greetingText?: string;
  /**
   * The element to display when the checklist is completed before the animation starts
   */
  placeholder?: React.ReactElement;
  /**
   * Define the delay betweend displaying complete placeholder and the animation starts
   */
  delay?: number;
  /**
   * Define the custom heigh of content visible after checklist complete
   */
  height?: number;
};

export interface IOnboardingChecklistProps {
  /**
   * The CSS class for the component
   */
  className?: string;
  /**
   * Set the title of the checklist
   */
  title: string;
  /**
   * Set the greeting text of the checklist
   */
  greetingText?: string;
  /**
   * The list of items to display
   */
  items: IChecklistItemProps[];
  /**
   * Set to define the active item
   */
  activeItemId: string;
  /**
   * Set to defined the complete items
   */
  completedItemsIds: string[];
  /**
   * Callback function when list element is clicked
   */
  onActiveChange: (id: string) => void;
  /**
   * The CSS class for the right column
   */
  placeholderClassName?: string;
  /**
   * Set to define the checklist is completed
   */
  isCompleted?: boolean;
  /**
   * Complete element which will be displayed when `isCompleted` is true
   */
  completionMessageData: ICompletionMessageDataProps;
}
