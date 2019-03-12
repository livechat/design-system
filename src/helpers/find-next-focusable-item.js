import { KeyCodes } from '../constants/keyCodes';

const findNextFocusableItem = (items, focusedItemId, keyCode) => {
  if (keyCode !== KeyCodes.arrowUp && keyCode !== KeyCodes.arrowDown) {
    return undefined;
  }

  const currentItemIndex = items
    .map(item => item.itemId)
    .indexOf(focusedItemId);

  const reorderedItems =
    currentItemIndex === -1
      ? items
      : [
          ...items.slice(currentItemIndex, items.lenght),
          ...items.slice(0, currentItemIndex)
        ];

  let activeItems = reorderedItems.filter(
    item => !item.isDisabled && item.itemId !== focusedItemId
  );

  if (keyCode === KeyCodes.arrowUp) {
    activeItems = activeItems.reverse();
  }

  return activeItems[0];
};

export default findNextFocusableItem;
