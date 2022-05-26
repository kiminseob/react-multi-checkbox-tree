# react-multi-checkbox-tree

react-multi-checkbox-tree is a component for multiple checkboxes.

![examples](https://github.com/kiminseob/react-multi-checkbox-tree/blob/main/docs/simple-example.gif)

## Install

```shell
npm install react-multi-checkbox-tree
```

## Tree Data

- **id** - It is a unique numeric value.
- **name** - The name of the checkbox.
- **parentId** - It points to the parent's ID. If the value is 0, it is the root.

```js
export const treeItem = [
  {
    id: 1,
    name: 'root1',
    parentId: 0,
  },
  {
    id: 2,
    name: 'item1',
    parentId: 1,
  },
  {
    id: 3,
    name: 'item2',
    parentId: 1,
  },
  {
    id: 4,
    name: 'item3',
    parentId: 2,
  },
  {
    id: 5,
    name: 'item4',
    parentId: 3,
  },
  {
    id: 6,
    name: 'item5',
    parentId: 4,
  },
  {
    id: 7,
    name: 'item6',
    parentId: 4,
  },
  {
    id: 8,
    name: 'item7',
    parentId: 5,
  },
  {
    id: 9,
    name: 'item8',
    parentId: 8,
  },
  {
    id: 10,
    name: 'root2',
    parentId: 0,
  },
  {
    id: 11,
    name: 'item9',
    parentId: 10,
  },
  {
    id: 12,
    name: 'item10',
    parentId: 10,
  },
];
```

## Simple Example

```jsx
import React from 'react';
import MultiTree from 'react-multi-checkbox-tree';
import { treeItem } from 'treeItem';

export default function () {
  return <MultiTree treeId="treeItems" items={treeItem} checkboxCount={2} />;
}
```

## Custom Style Example

![customStyle-examples](https://github.com/kiminseob/react-multi-checkbox-tree/blob/main/docs/customStyle-example.png)

```jsx
...
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

export default function () {
  return (
    <MultiTree
      treeId="treeItems"
      items={treeItem}
      checkboxCount={2}
      icons={{
        indeterminate: <IndeterminateCheckBoxIcon />,
        check: <CheckBoxIcon />,
        unCheck: <CheckBoxOutlineBlankIcon />,
      }}
    />
  );
}
```

## Props

This document lists all props of MultiTree component.

| Name                 | Type                                      | Default      | Description |
| -------------------- | ----------------------------------------- | ------------ | ----------- |
| **treeId**           | string                                    | ''           |             |
| **items**            | Item[]                                    | []           |             |
| **checkedItems**     | string[]                                  | []           |             |
| **checkboxCount**    | number                                    | 1            |             |
| **checkboxPosition** | 'detachLeft'\|'attachLeft'\|'attachRight' | 'detachLeft' |             |
| **checkboxDistance** | number                                    | 5            |             |
| **indent**           | number                                    | 24           |             |
| **icons**            | React Element                             | []           |             |
| **disable**          | boolean                                   | false        |             |
| **isChecked**        | boolean                                   | true         |             |
| **isExpand**         | boolean                                   | true         |             |
| **onCheck**          |                                           |              |             |
| **onExpand**         |                                           |              |             |
| **initCheckStates**  |                                           |              |             |
| **...**              |                                           |              |             |
