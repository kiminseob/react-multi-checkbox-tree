import React, { useState } from 'react';
import MultiTree from 'components/Tree/MultiTree';
import { treeItem } from 'data/treeItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

function App() {
  const [items, setItems] = useState({
    treeItem,
  });

  const onSelected = (itemName, updatedItems) => {
    setItems((preState) => ({
      ...preState,
      [itemName]: updatedItems,
    }));
  };

  const initCheckStates = (item) => {
    return [0, 1];
  };

  return (
    <>
      <MultiTree
        disable
        items={items.treeItem}
        itemName="treeItems"
        checkboxCount={2}
        onSelected={onSelected}
        initCheckStates={initCheckStates}
        checkboxPosition="attachRight"
      />
      <MultiTree
        items={items.treeItem}
        itemName="treeItems2"
        checkboxCount={4}
        onSelected={onSelected}
        checkboxPosition="detachLeft"
        // checkboxDistance={40}
        icons={{
          indeterminate: <IndeterminateCheckBoxIcon />,
          checked: <CheckBoxIcon />,
          unChecked: <CheckBoxOutlineBlankIcon />,
        }}
      />
      <MultiTree
        items={items.treeItem}
        itemName="treeItems3"
        checkboxCount={3}
        checkboxPosition="attachLeft"
        onSelected={onSelected}
      />
    </>
  );
}

export default App;
