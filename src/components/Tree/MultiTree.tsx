import React, { useCallback, useState, useEffect } from 'react';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateItemStates } from './updateItemStates';
import { Item, Icons, ItemState } from 'types';
import styles from '../CheckboxList/checkboxlist.module.scss';

export const CheckboxState = {
  UNCHECKED: 0,
  CHECKED: 1,
  INDETERMINATE: 2,
};

type MultiTreeProps = {
  disable: boolean;
  isChecked: boolean;
  isExpand: boolean;
  items: Item[];
  itemName: string;
  checkboxCount: number;
  checkboxPosition: string;
  checkboxDistance: number;
  indent: number;
  icons: Icons;
  onCheck: (itemName: string, updateStates: ItemState[]) => void;
  onExpand: (itemName: string, checkStates: number[] | undefined) => void;
  initCheckStates: (item: Item | undefined) => number[];
};

const MultiTree: React.FC<MultiTreeProps> = ({
  disable = false,
  isChecked = true,
  isExpand = true,
  items = [],
  itemName = '',
  checkboxCount = 1,
  checkboxPosition = 'detachLeft',
  checkboxDistance = 5,
  indent = 24,
  icons = {},
  onCheck = () => {},
  onExpand = () => {},
  initCheckStates,
}) => {
  const defaultCheckStates = () =>
    [...Array(checkboxCount)].map((v) =>
      isChecked ? CheckboxState.CHECKED : CheckboxState.UNCHECKED
    );
  if (!initCheckStates) initCheckStates = defaultCheckStates;

  const defaultItemStates: ItemState[] = items.map((item) => ({
    ...item,
    checkStates: initCheckStates(item),
    expand: isExpand,
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
      onCheck(itemName, updatedStates);
    },
    [itemStates]
  );

  const getChildIds = (parentId: number) =>
    items.filter((i) => i.parentId === parentId).map((i) => i.id);

  const toggleChild = (id: number, isExpand: Boolean) => {
    const childIds = getChildIds(id);

    childIds.map((childId) => {
      const ele = document.querySelector(`[data-id='${itemName}-${childId}']`);
      ele!.className = isExpand ? styles.invisible : styles.visible;
    });

    setItemStates(
      itemStates.map((i) => {
        i.expand = i.id === id ? !isExpand : i.expand;
        return i;
      })
    );

    if (isExpand) {
      childIds.map((childId) => toggleChild(childId, isExpand));
    }
  };

  const toggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    const id = e.currentTarget.closest('li')!.dataset.id!.split('-')[1];
    const isExpand = itemStates.find((i) => i.id === parseInt(id, 10))!.expand;

    onExpand(itemName, getStatesForId(parseInt(id, 10)));
    toggleChild(parseInt(id!, 10), isExpand);
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
        indent={indent}
        icons={icons}
        isExpand={isExpand}
      />
    </>
  );
};

export default MultiTree;
