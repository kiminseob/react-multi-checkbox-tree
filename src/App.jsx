import React, { useState } from 'react';
import MultiTree from 'components/Tree/MultiTree';
import { treeItem } from 'data/treeItem';

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
      />
      <MultiTree
        items={items.treeItem}
        itemName="treeItems"
        checkboxCount={2}
        onSelected={onSelected}
      />
    </>
  );
}

export default App;
