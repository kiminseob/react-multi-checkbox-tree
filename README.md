# react-multi-checkbox-tree

react-multi-checkbox-tree is a component for multiple checkboxes.

![examples](https://github.com/kiminseob/react-multi-checkbox-tree/blob/main/docs/simple-example.gif)

## Install

```shell
npm install -S react-multi-checkbox-tree
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

## Checkbox Position Example

![customStyle-examples](https://github.com/kiminseob/react-multi-checkbox-tree/blob/main/docs/checkboxPosition-exmaple.png)

```jsx
...
export default function () {
  return (
    <MultiTree
      treeId="treeItems"
      items={treeItem}
      checkboxCount={3}
      checkboxPosition="attachLeft"
    />
  );
}
```

## Props

This document lists all props of MultiTree component.

| Name                 | Type                                        | Default      | Description                                                                                                                |                                                                                                                                                                                                                                      |
| -------------------- | ------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **treeId**           | string                                      | ''           | It is a unique tree name. Required when constructing multiple trees                                                        |                                                                                                                                                                                                                                      |
| **items**            | Item[]                                      | []           | Dataset to build the tree                                                                                                  |                                                                                                                                                                                                                                      |
| **checkboxCount**    | number                                      | 1            | The number of checkboxes                                                                                                   |                                                                                                                                                                                                                                      |
| **checkboxPosition** | 'detachLeft'\| 'attachLeft'\| 'attachRight' | 'detachLeft' | The position of the checkbox                                                                                               |                                                                                                                                                                                                                                      |
| **checkboxDistance** | number                                      | 5            | If the checkbox position is 'detachLeft', it defines the distance from the item                                            |                                                                                                                                                                                                                                      |
| **indent**           | number                                      | 24           | The size of the checkbox is 24\*24. If you use a custom checkbox with a different size, you must set it to the same length |                                                                                                                                                                                                                                      |
| **icons**            | object                                      | {}           | Apply custom icon                                                                                                          | <pre>{<br> indeterminate: ReactElement,<br> check: ReactElement,<br> unCheck: ReactElement,<br> expand: ReactElement,<br> collapse: ReactElement<br>}</pre>                                                                          |
| **disable**          | boolean                                     | false        | Disable the checkbox                                                                                                       |                                                                                                                                                                                                                                      |
| **isChecked**        | boolean                                     | true         | Indicates a checked state                                                                                                  |                                                                                                                                                                                                                                      |
| **isExpand**         | boolean                                     | true         | Indicates a extended state                                                                                                 |                                                                                                                                                                                                                                      |
| **onCheck**          | function                                    | () => {}     | Event that occurs when a checkbox is clicked                                                                               |                                                                                                                                                                                                                                      |
| **onExpand**         | function                                    | () => {}     | Event that occurs whan a checkbox expands and collapses                                                                    |                                                                                                                                                                                                                                      |
| **initCheckStates**  | function                                    | () => {}     | Determines whether each item is checked or not                                                                             |                                                                                                                                                                                                                                      |
| **checkedItems**     | string[]                                    | []           | Determines whether the checkbox is checked by 'checkboxName'. You need to add a checkbox name to the dataset.              | <pre>/\* 'checkboxName' is the same as the number of checkboxes, and each name is given in order \*/ <br><br>treeItem = [<br>{<br> id: 1,<br> name: 'root1',<br> parentId: 0,<br> checkboxName: ['write', 'read']<br> ...<br>}</pre> |
