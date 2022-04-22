import React, { useCallback, useState, useEffect } from 'react';
import CheckboxList from '../CheckboxList/CheckboxList';
import { updateItemStates } from './updateItemStates';
import type { Item } from '../CheckboxList/CheckboxList';
import styles from '../CheckboxList/checkboxlist.module.scss';

export enum CheckboxState {
  UNCHECKED,
  CHECKED,
  INDETERMINATE,
}

export type ItemState = {
  privileges: string[];
  id: number;
  parentId: number;
  state: Array<CheckboxState>;
  visible: Boolean;
  expaned: Boolean;
};

type RoleDetailInfo = {
  privileges: string[];
};

const Tree = ({
  disable = false,
  items,
  roleName,
  privilegeNames = [],
  onSelected = () => {},
  itemStates = [],
}: {
  disable: boolean;
  items: Item[];
  roleName: string;
  privilegeNames: string[];
  onSelected: (roleName: string, updateStates: ItemState[]) => void;
  updatedPrivileges: (roleName: string, privileges?: (string | null)[]) => void;
  itemStates: ItemState[];
}) => {
  const getStateForId = useCallback(
    (id: number) => itemStates.find((i) => i.id === id)?.state,
    [itemStates]
  );

  const clickHandler = useCallback(
    (id, idx) => {
      if (disable) return;
      const updatedStates = updateItemStates(itemStates, items, id, idx);
      onSelected(roleName, updatedStates);
    },
    [itemStates]
  );

  const searchTree = (
    idx: number,
    states: ItemState,
    positioned: boolean[]
  ): string | null => {
    const { id, parentId, state, privileges } = states;

    switch (state[idx]) {
      case 1:
        positioned[id] = true;
        return positioned[parentId] ? null : privileges[idx];
      default:
        return null;
    }
  };

  const getPrivileges = (
    updatedStates: ItemState[],
    idx: number
  ): Array<string | null> => {
    const positioned: boolean[] = [];
    return updatedStates.map((states) => searchTree(idx, states, positioned));
  };

  const updatePrivileges = (updatedStates: ItemState[]) =>
    getPrivileges(updatedStates, 1).filter((privilege) => privilege);

  const getChildIds = (parentId: number) =>
    items.filter((i) => i.parentId === parentId).map((i) => i.id);

  const toggleChild = (id: number, isExpaned: Boolean) => {
    const childIds = getChildIds(id);

    childIds.map((childId) => {
      const ele = document.querySelector(`[data-id='${childId}']`);
      ele!.className = isExpaned ? styles.invisible : styles.visible;
    });

    onSelected(
      roleName,
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
        onClick={clickHandler}
        getStateForId={getStateForId}
        privilegeNames={privilegeNames}
        toggle={toggle}
        itemStates={itemStates}
      />
    </>
  );
};

export default Tree;
