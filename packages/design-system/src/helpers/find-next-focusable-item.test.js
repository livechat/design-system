import findNextFocusableItem from './find-next-focusable-item';
import { KeyCodes } from '../constants/keyCodes';

describe('Archives | Components | FiltersMenu', () => {
  const items = [
    { itemId: 0, isDisabled: true },
    { itemId: 1, isDisabled: false },
    { itemId: 2, isDisabled: true },
    { itemId: 3, isDisabled: false }
  ];

  const scenarios = [
    { focusedItemId: null, keyCode: KeyCodes.arrowUp, expected: 3 },
    { focusedItemId: 0, keyCode: KeyCodes.arrowUp, expected: 3 },
    { focusedItemId: 0, keyCode: KeyCodes.arrowDown, expected: 1 },
    { focusedItemId: 2, keyCode: KeyCodes.arrowDown, expected: 3 },
    { focusedItemId: 1, keyCode: KeyCodes.arrowUp, expected: 3 },
    {
      focusedItemId: 0,
      keyCode: KeyCodes.enter,
      expected: undefined
    }
  ];

  scenarios.forEach(s => {
    it(`returns correct value for "focusedItemId" ${
      s.focusedItemId
    }, "keyCode" ${s.keyCode}`, () => {
      const item = findNextFocusableItem(items, s.focusedItemId, s.keyCode);

      if (item) {
        expect(item.itemId).toBe(s.expected);
      } else {
        expect(item).toBe(s.expected);
      }
    });
  });
});
