import { KeyCodes } from './constants';
import { IDropdownListItem } from './DropdownListItem';

export function getFirstFocusableItemId(
  items: IDropdownListItem[]
): null | number {
  const focusableItem: IDropdownListItem | undefined = items.find(
    (item) => !item.isDisabled
  );

  if (!focusableItem) {
    return null;
  }

  return focusableItem.itemId;
}

export const findNextFocusableItem = (
  items: IDropdownListItem[],
  focusedItemId: number,
  keyCode: number
): IDropdownListItem | null => {
  if (keyCode !== KeyCodes.arrowUp && keyCode !== KeyCodes.arrowDown) {
    return null;
  }

  const currentItemIndex: number = items
    .map((item: { itemId: number }) => item.itemId)
    .indexOf(focusedItemId);

  const reorderedItems: IDropdownListItem[] =
    currentItemIndex === -1
      ? items
      : [
          ...items.slice(currentItemIndex, items.length),
          ...items.slice(0, currentItemIndex),
        ];

  let activeItems: IDropdownListItem[] = reorderedItems.filter(
    (item: IDropdownListItem) =>
      !item.isDisabled && item.itemId !== focusedItemId
  );

  if (keyCode === KeyCodes.arrowUp) {
    activeItems = activeItems.reverse();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return activeItems[0];
};

export const getMergedClassNames = (
  classNames: string,
  classNameProperty?: string
): string => {
  if (classNameProperty) {
    return `${classNames} ${classNameProperty}`;
  }

  return classNames;
};

export default findNextFocusableItem;
