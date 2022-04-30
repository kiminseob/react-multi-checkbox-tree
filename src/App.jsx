import React, { useState } from 'react';
import MultiTree from 'components/Tree/MultiTree';
import { treeItem } from 'data/treeItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlineBlankTwoToneIcon from '@mui/icons-material/CheckBoxOutlineBlankTwoTone';

import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import IndeterminateCheckBoxTwoToneIcon from '@mui/icons-material/IndeterminateCheckBoxTwoTone';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// defulat icon size : 24 * 24;

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
    return [1, 1];
  };

  return (
    <>
      <MultiTree
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
        checkboxDistance={10}
        icons={{
          indeterminate: <IndeterminateCheckBoxIcon />,
          check: <CheckBoxIcon />,
          unCheck: <CheckBoxOutlineBlankIcon />,
        }}
      />
      <MultiTree
        items={items.treeItem}
        itemName="treeItems3"
        checkboxCount={3}
        checkboxPosition="attachLeft"
        onSelected={onSelected}
        icons={{
          indeterminate: <IndeterminateCheckBoxTwoToneIcon />,
          check: <CheckBoxTwoToneIcon />,
          unCheck: <CheckBoxOutlineBlankTwoToneIcon />,
          expand: <ExpandMoreIcon />,
          collapse: <ChevronRightIcon />,
        }}
      />
    </>
  );
}

export default App;
