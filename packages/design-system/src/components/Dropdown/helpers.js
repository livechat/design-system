export function getFirstFocusableItemId(items) {
  const focusableItem = items.find(item => !item.isDisabled);

  if (!focusableItem) {
    return null;
  }
  return focusableItem.itemId;
}
