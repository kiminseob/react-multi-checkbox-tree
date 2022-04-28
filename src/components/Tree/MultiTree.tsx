import React, { useCallback, useState, useEffect } from 'react';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateItemStates } from './updateItemStates';
import type { Item } from '../CheckboxList/CheckboxList';
import styles from '../CheckboxList/checkboxlist.module.scss';

export const CheckboxState = {
  UNCHECKED: 0,
  CHECKED: 1,
  INDETERMINATE: 2,
};

export type ItemState = {
  id: number;
  parentId: number;
  checkStates: number[];
  visible: boolean;
  expaned: boolean;
};

const MultiTree = ({
  disable = false,
  isChecked = true,
  items = [],
  itemName = '',
  checkboxCount = 1,
  onSelected = () => {},
}: {
  disable: boolean;
  isChecked: boolean;
  items: Item[];
  itemName: string;
  checkboxCount: number;
  onSelected: (itemName: string, updateStates: ItemState[]) => void;
}) => {
  const initStates = () =>
    [...Array(checkboxCount)].map((v) =>
      isChecked ? CheckboxState.CHECKED : CheckboxState.UNCHECKED
    );

  const defaultItemStates: ItemState[] = items.map((i) => ({
    id: i.id,
    parentId: i.parentId,
    checkStates: initStates(),
    visible: true,
    expaned: true,
  }));

  const [itemStates, setItemStates] = useState<ItemState[]>(defaultItemStates);

  const getStatesForId = useCallback(
    (id: number) => itemStates.find((i) => i.id === id)?.checkStates,
    [itemStates]
  );

  const clickHandler = useCallback(
    (id: number, idx: number) => {
      if (disable) return;
      const updatedStates = updateItemStates(itemStates, items, id, idx);
      setItemStates(updatedStates);
      onSelected(itemName, updatedStates);
    },
    [itemStates]
  );

  const getChildIds = (parentId: number) =>
    items.filter((i) => i.parentId === parentId).map((i) => i.id);

  const toggleChild = (id: number, isExpaned: Boolean) => {
    const childIds = getChildIds(id);

    childIds.map((childId) => {
      const ele = document.querySelector(`[data-id='${childId}']`);
      ele!.className = isExpaned ? styles.invisible : styles.visible;
    });

    onSelected(
      itemName,
      itemStates.map((i) => {
        i.expaned = i.id === id ? !isExpaned : i.expaned;
        i.visible = childIds.indexOf(i.id) >= 0 ? !isExpaned : i.visible;
        return i;
      })
    );

    if (isExpaned) {
      childIds.map((childId) => toggleChild(childId, isExpaned));
    }
  };

  const toggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    const { id } = e.currentTarget.closest('li')!.dataset;
    const isExpaned = itemStates.find(
      (i) => i.id === parseInt(id!, 10)
    )!.expaned;

    toggleChild(parseInt(id!, 10), isExpaned);
  };

  return (
    <>
      <CheckboxList
        items={items}
        checkboxCount={checkboxCount}
        onClick={clickHandler}
        getStatesForId={getStatesForId}
        toggle={toggle}
        itemStates={itemStates}
      />
    </>
  );
};

export default MultiTree;
