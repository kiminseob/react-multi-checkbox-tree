import React, { useState, useEffect } from 'react';
import Tree from 'ConfigCheckboxTree/Tree/Tree';
import { example } from 'data/treeData';

const CheckboxState = {
  UNCHECKED: 0,
  CHECKED: 1,
  INDETERMINATE: 2,
};
const privilegeNames = ['쓰기'];
const privileges = ['ROLE_MASTER_WRITE', 'ROLE_JEUS_WRITE'];

function App() {
  const [defaultItemStates, setDefaultItemStates] = useState({
    example: [],
  });

  const onSelected = (roleName, updateStates) => {
    setDefaultItemStates((preState) => ({
      ...preState,
      [roleName]: updateStates,
    }));
  };

  useEffect(() => {
    setDefaultItemStates({
      example: makeDefaultItemStates(example),
    });
  }, [privileges]);

  const searchAllParent = (items, parentId, idx) => {
    const parent = items?.find(({ id }) => id === parentId);

    if (!parent) return false;
    if (privileges.find((privilege) => privilege === parent?.privileges[idx])) {
      return true;
    }

    return searchAllParent(items, parent.parentId, idx);
  };

  const getCheckboxState = (items, id, parentId, basePrivileges, idx) => {
    // 처음 생성할 경우 , 자신이 체크되어 있는 경우, 부모~루트 중에 체크되어 있는 경우
    if (
      !privileges ||
      privileges.length === 0 ||
      privileges.find((privilege) => privilege === basePrivileges[idx]) ||
      searchAllParent(items, parentId, idx)
    ) {
      return CheckboxState.CHECKED;
    }

    // INDETERMINATE 상태 여부 판단
    const checkedChildCount = items
      .filter((i) => i.parentId === id)
      .filter(
        (_child) => privileges.indexOf(_child.privileges[idx]) >= 0
      ).length;

    return checkedChildCount === 0
      ? CheckboxState.UNCHECKED
      : CheckboxState.INDETERMINATE;
  };

  const makeDefaultItemStates = (items) =>
    items.map(({ id, privileges, parentId }) => ({
      privileges,
      id,
      parentId,
      state: [
        CheckboxState.CHECKED,
        getCheckboxState(items, id, parentId, privileges, 1),
      ],
      visible: true,
      expaned: true,
    }));

  return (
    <Tree
      disable={false}
      items={example}
      itemStates={defaultItemStates.example}
      roleName="example"
      privilegeNames={privilegeNames}
      onSelected={onSelected}
    />
  );
}

export default App;
