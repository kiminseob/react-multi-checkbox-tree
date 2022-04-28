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

  return (
    <MultiTree
      items={items.treeItem}
      itemName="treeItems"
      checkboxCount={2}
      onSelected={onSelected}
    />
  );
}

export default App;
