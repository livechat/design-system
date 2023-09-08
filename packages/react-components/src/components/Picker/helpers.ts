import { IPickerListItem } from './types';

export function getAdjacentItemPositions(
  items: IPickerListItem[],
  selectedKeys: string[] | null
): Record<string, 'top' | 'middle' | 'bottom'> {
  const newAdjacentItems: Record<string, 'top' | 'middle' | 'bottom'> = {};

  if (selectedKeys && selectedKeys.length > 1) {
    const filteredSelectedKeys = items
      .map((item) => item.key)
      .filter((key) => selectedKeys.includes(key));

    for (let i = 0; i < filteredSelectedKeys.length; i++) {
      const currentKey = filteredSelectedKeys[i];
      const nextKey = filteredSelectedKeys[i + 1];
      const prevKey = filteredSelectedKeys[i - 1];

      const isNextAdjacent =
        nextKey &&
        Math.abs(
          items.findIndex((item) => item.key === nextKey) -
            items.findIndex((item) => item.key === currentKey)
        ) === 1;
      const isPrevAdjacent =
        prevKey &&
        Math.abs(
          items.findIndex((item) => item.key === prevKey) -
            items.findIndex((item) => item.key === currentKey)
        ) === 1;

      if (isNextAdjacent && isPrevAdjacent) {
        newAdjacentItems[currentKey] = 'middle';
      } else if (isNextAdjacent) {
        newAdjacentItems[currentKey] = 'top';
      } else if (isPrevAdjacent) {
        newAdjacentItems[currentKey] = 'bottom';
      }
    }
  }

  return newAdjacentItems;
}
