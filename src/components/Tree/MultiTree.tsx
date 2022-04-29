import React, { useCallback, useState, useEffect } from 'react';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateItemStates } from './updateItemStates';
import type { Item } from '../CheckboxList/CheckboxList';
import type { Icons } from '../Checkbox/Checkbox';
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

type MultiTreeProps = {
  disable: boolean;
  isChecked: boolean;
  items: Item[];
  itemName: string;
  checkboxCount: number;
  checkboxPosition: string;
  checkboxDistance: number;
  icons: Icons;
  onSelected: (itemName: string, updateStates: ItemState[]) => void;
  initCheckStates: (item: Item | undefined) => number[];
};

const MultiTree: React.FC<MultiTreeProps> = ({
  disable = false,
  isChecked = true,
  items = [],
  itemName = '',
  checkboxCount = 1,
  checkboxPosition = 'detachLeft',
  checkboxDistance = 5,
  icons = {},
  onSelected = () => {},
  initCheckStates,
}) => {
  const defaultCheckStates = () =>
    [...Array(checkboxCount)].map((v) =>
      isChecked ? CheckboxState.CHECKED : CheckboxState.UNCHECKED
    );
  if (!initCheckStates) initCheckStates = defaultCheckStates;

  const defaultItemStates: ItemState[] = items.map((item) => ({
    id: item.id,
    parentId: item.parentId,
    checkStates: initCheckStates(item),
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
      const ele = document.querySelector(`[data-id='${itemName}-${childId}']`);
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
    const id = e.currentTarget.closest('li')!.dataset.id?.split('-')[1];
    console.log(id);
    const isExpaned = itemStates.find(
      (i) => i.id === parseInt(id!, 10)
    )!.expaned;

    toggleChild(parseInt(id!, 10), isExpaned);
  };

  return (
    <>
      <CheckboxList
        items={items}
        itemName={itemName}
        checkboxCount={checkboxCount}
        onClick={clickHandler}
        getStatesForId={getStatesForId}
        toggle={toggle}
        itemStates={itemStates}
        checkboxPosition={checkboxPosition}
        checkboxDistance={checkboxDistance}
        icons={icons}
      />
    </>
  );
};

export default MultiTree;
