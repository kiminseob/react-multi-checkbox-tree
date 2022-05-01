import { CheckboxState } from './MultiTree';
import { Item, ItemState } from 'types';

export const updateItemStates = (
  oldState: ItemState[],
  items: Item[],
  clickedId: number,
  idx: number
) => {
  const newState = oldState.map((i) => ({ ...i }));
  // getters
  const getItemState = (id: number, idx: number) =>
    newState.find((i) => i.id === id)!.checkStates[idx];

  // setters
  const updateParent = (id: number, idx: number) => {
    const item = items.find((i) => i.id === id);
    const parent = items.find((i) => i.id === item!.parentId);
    if (!parent) return;
    const childIds = items
      .filter((i) => i.parentId === parent.id)
      .map((i) => i.id);
    const childStates = childIds.map((childId) => getItemState(childId, idx));
    if (
      childStates.length ===
      childStates.filter((s) => s === CheckboxState.CHECKED).length
    ) {
      console.log('check', parent.id);
      newState.find((i) => i.id === parent.id)!.checkStates[idx] =
        CheckboxState.CHECKED;
    } else if (
      childStates.length ===
      childStates.filter((s) => s === CheckboxState.UNCHECKED).length
    ) {
      console.log('uncheck', parent.id);
      newState.find((i) => i.id === parent.id)!.checkStates[idx] =
        CheckboxState.UNCHECKED;
    } else {
      console.log(
        'INDETERMINATE',
        childStates,
        childStates.length,
        childStates.filter((s) => s === CheckboxState.UNCHECKED).length,
        parent.id
      );
      newState.find((i) => i.id === parent.id)!.checkStates[idx] =
        CheckboxState.INDETERMINATE;
    }
    updateParent(parent.id, idx);
  };

  const setUnchecked = (id: number) => {
    const checkedId = newState.find((i) => i.id === id);
    checkedId!.checkStates[idx] = CheckboxState.UNCHECKED;

    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setUnchecked(childId));
    updateParent(id, idx);
  };

  const setChecked = (id: number) => {
    const checkedId = newState.find((i) => i.id === id);
    checkedId!.checkStates[idx] = CheckboxState.CHECKED;

    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setChecked(childId));
    updateParent(id, idx);
  };

  // actual logic
  const itemState = getItemState(clickedId, idx);

  if (itemState === CheckboxState.CHECKED) {
    setUnchecked(clickedId);
  } else {
    setChecked(clickedId);
  }
  return newState;
};
