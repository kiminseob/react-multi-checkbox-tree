import React, { useCallback, useState, useEffect } from 'react';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateItemStates } from './updateItemStates';
import { Item, Icons, ItemState, CustomStyle } from 'types';
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
  treeId: string;
  checkboxCount: number;
  checkboxPosition: string;
  checkboxDistance: number;
  checkedItems: string[];
  indent: number;
  icons: Icons;
  customStyle: CustomStyle;
  onCheck: (
    treeId: string,
    updateStates: ItemState[],
    checkedItems: (string | null)[]
  ) => void;
  onExpand: (treeId: string, checkStates: number[] | undefined) => void;
  initCheckStates: (item: Item | undefined) => number[];
};

const MultiTree: React.FC<MultiTreeProps> = ({
  disable = false,
  isChecked = true,
  isExpand = true,
  items = [],
  treeId = '',
  checkboxCount = 1,
  checkboxPosition = 'detachLeft',
  checkboxDistance = 5,
  checkedItems = [],
  indent = 24,
  icons = {},
  customStyle = {},
  onCheck = () => {},
  onExpand = () => {},
  initCheckStates,
}) => {
  const searchAllParent = (parentId: number, idx: number): boolean => {
    const parent = items.find(({ id }) => id === parentId);

    if (!parent) return false;

    return checkedItems.find(
      (checkedItem) => checkedItem === parent.checkboxName[idx]
    )
      ? true
      : searchAllParent(parent.parentId, idx);
  };

  const initCheckStatesWithName = (
    id: number,
    parentId: number,
    checkboxName: string[]
  ) => {
    return [...Array(checkboxCount)].map((v, idx) => {
      // 처음 생성할 경우 , 자신이 체크되어 있는 경우, 부모~루트 중에 체크되어 있는 경우
      if (
        checkedItems.find((checkedItem) => checkedItem === checkboxName[idx]) ||
        searchAllParent(parentId, idx)
      ) {
        return CheckboxState.CHECKED;
      }

      // INDETERMINATE 상태 여부 판단
      const checkedChildCount = items
        .filter((i) => i.parentId === id)
        .filter(
          (child) => checkedItems.indexOf(child.checkboxName[idx]) >= 0
        ).length;

      return checkedChildCount === 0
        ? CheckboxState.UNCHECKED
        : CheckboxState.INDETERMINATE;
    });
  };

  const defaultCheckStates = () =>
    [...Array(checkboxCount)].map((v) =>
      isChecked ? CheckboxState.CHECKED : CheckboxState.UNCHECKED
    );
  if (!initCheckStates) initCheckStates = defaultCheckStates;

  const defaultItemStates: ItemState[] = items.map((item) => ({
    ...item,
    checkStates:
      checkedItems.length > 0
        ? initCheckStatesWithName(item.id, item.parentId, item.checkboxName)
        : initCheckStates(item),
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
      onCheck(treeId, updatedStates, updateCheckdItems(updatedStates));
    },
    [itemStates]
  );
  const searchTree = (
    idx: number,
    states: ItemState,
    positioned: boolean[]
  ): string | null => {
    const { id, parentId, checkStates, checkboxName } = states;

    if (!checkboxName || checkboxName.length === 0) return null;

    switch (checkStates[idx]) {
      case 1:
        positioned[id] = true;
        return positioned[parentId] ? null : checkboxName[idx];
      default:
        return null;
    }
  };

  const getCheckboxNames = (
    updatedStates: ItemState[],
    idx: number
  ): Array<string | null> => {
    const positioned: boolean[] = [];
    return updatedStates.map((states) => searchTree(idx, states, positioned));
  };

  const updateCheckdItems = (updatedStates: ItemState[]) =>
    [...Array(checkboxCount)]
      .reduce(
        (acc, cur, idx) => [
          ...getCheckboxNames(updatedStates, idx).filter(
            (checkboxName) => checkboxName
          ),
          ...acc,
        ],
        []
      )
      .filter((v: string) => v);

  const getChildIds = (parentId: number) =>
    items.filter((i) => i.parentId === parentId).map((i) => i.id);

  const toggleChild = (id: number, isExpand: Boolean) => {
    const childIds = getChildIds(id);

    childIds.map((childId) => {
      const ele = document.querySelector(`[data-id='${treeId}-${childId}']`);
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

    onExpand(treeId, getStatesForId(parseInt(id, 10)));
    toggleChild(parseInt(id!, 10), isExpand);
  };

  return (
    <>
      <CheckboxList
        items={items}
        treeId={treeId}
        checkboxCount={checkboxCount}
        onClick={clickHandler}
        getStatesForId={getStatesForId}
        toggle={toggle}
        itemStates={itemStates}
        checkboxPosition={checkboxPosition}
        checkboxDistance={checkboxDistance}
        customStyle={customStyle}
        indent={indent}
        icons={icons}
        isExpand={isExpand}
      />
    </>
  );
};

export default MultiTree;
