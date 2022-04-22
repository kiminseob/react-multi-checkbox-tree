import { Item } from '../CheckboxList/CheckboxList';
import { CheckboxState, ItemState } from './Tree';

export const updateItemStates = (
  oldState: ItemState[],
  items: Item[],
  clickedId: number,
  idx: number
) => {
  const newState = oldState.map((i) => ({ ...i }));
  // getters
  const getItemState = (id: number, idx: number) =>
    newState.find((i) => i.id === id)!.state[idx];

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
      newState.find((i) => i.id === parent.id)!.state[idx] =
        CheckboxState.CHECKED;
    } else if (
      childStates.length ===
      childStates.filter((s) => s === CheckboxState.UNCHECKED).length
    ) {
      newState.find((i) => i.id === parent.id)!.state[idx] =
        CheckboxState.UNCHECKED;
    } else {
      newState.find((i) => i.id === parent.id)!.state[idx] =
        CheckboxState.INDETERMINATE;
    }
    updateParent(parent.id, idx);
  };
  const setUnchecked = (id: number) => {
    const checkedId = newState.find((i) => i.id === id);
    checkedId!.state[idx] = CheckboxState.UNCHECKED;
    if (idx === 0) checkedId!.state[1] = CheckboxState.UNCHECKED;

    // 자식들의 id를 찾아서 recursive하게 uncheck 한다.
    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setUnchecked(childId));
    updateParent(id, 0);
    updateParent(id, 1);
  };
  const setChecked = (id: number) => {
    const checkedId = newState.find((i) => i.id === id);
    checkedId!.state[idx] = CheckboxState.CHECKED;
    if (idx === 1) checkedId!.state[0] = CheckboxState.CHECKED;

    items
      .filter((i) => i.parentId === id)
      .map((i) => i.id)
      .forEach((childId) => setChecked(childId));
    updateParent(id, 0);
    updateParent(id, 1);
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
