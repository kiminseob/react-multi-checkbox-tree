import React from 'react';
import CheckboxPositionAssemble from '../CheckboxItems/CheckboxPositionAssemble';
import styles from './checkboxlist.module.scss';
import { ItemState, Icons, Item } from 'types';

type CheckboxListProps = {
  itemStates: ItemState[];
  items: Item[];
  treeId: string;
  checkboxCount: number;
  checkboxPosition: string;
  checkboxDistance: number;
  idsToRender?: number[];
  indentLevel?: number;
  icons: Icons;
  indent: number;
  isExpand: boolean;
  onClick: (id: number, idx: number) => void;
  getStatesForId: (id: number) => number[] | undefined;
  toggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  itemStates,
  items,
  treeId,
  checkboxCount,
  checkboxPosition,
  checkboxDistance,
  idsToRender = [],
  indentLevel = 0,
  icons,
  indent,
  isExpand,
  onClick = () => {},
  getStatesForId,
  toggle,
}) => {
  if (!idsToRender.length) {
    idsToRender = items.filter((i) => !i.parentId).map((i) => i.id);
  }

  const getNodeItems = (parentId: number) =>
    items.filter((i) => i.parentId === parentId);

  const getChildNodes = (parentId: number) => {
    const nodeItems = getNodeItems(parentId);
    if (!nodeItems.length) return null;
    return (
      <CheckboxList
        itemStates={itemStates}
        items={items}
        treeId={treeId}
        checkboxCount={checkboxCount}
        checkboxPosition={checkboxPosition}
        checkboxDistance={checkboxDistance}
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        icons={icons}
        indent={indent}
        isExpand={isExpand}
        onClick={onClick}
        getStatesForId={getStatesForId}
        toggle={toggle}
      />
    );
  };

  return (
    <ul className={styles.list}>
      {idsToRender.map((id) => {
        const item = items.find((i) => i.id === id)!;
        const checkboxStates = getStatesForId(id);

        return (
          <React.Fragment key={item.id}>
            <li
              className={
                isExpand
                  ? styles.visible
                  : item.parentId === 0
                  ? styles.visible
                  : styles.invisible
              }
              data-id={`${treeId}-${item.id}`}
            >
              <div>
                {CheckboxPositionAssemble(
                  checkboxPosition,
                  {
                    item,
                    icons,
                    indent,
                    checkboxCount,
                    checkboxStates,
                    onClick,
                  },
                  { item, itemStates, icons, getNodeItems, toggle },
                  { item },
                  { indentLevel, indent, checkboxDistance }
                )}
              </div>
            </li>
            {getChildNodes(item.id)}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default CheckboxList;
