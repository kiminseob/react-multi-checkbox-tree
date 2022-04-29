/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import CheckboxItems from '../CheckboxItems/CheckboxItems';
import styles from './checkboxlist.module.scss';
import type { ItemState } from '../Tree/MultiTree';
import type { Icons } from '../Checkbox/Checkbox';

export type Item = {
  id: number;
  name: string;
  parentId: number;
};

type CheckboxListProps = {
  itemStates: ItemState[];
  items: Item[];
  itemName: string;
  checkboxCount: number;
  checkboxPosition: string;
  checkboxDistance: number;
  idsToRender?: number[];
  indentLevel?: number;
  icons: Icons;
  onClick: (id: number, idx: number) => void;
  getStatesForId: (id: number) => number[] | undefined;
  toggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  itemStates,
  items,
  itemName,
  checkboxCount,
  checkboxPosition,
  checkboxDistance,
  idsToRender = [],
  indentLevel = 0,
  icons,
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
        itemName={itemName}
        checkboxCount={checkboxCount}
        checkboxPosition={checkboxPosition}
        checkboxDistance={checkboxDistance}
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        icons={icons}
        onClick={onClick}
        getStatesForId={getStatesForId}
        toggle={toggle}
      />
    );
  };

  const setArrowIcon = (id: number) =>
    itemStates.find((i) => i.id === id)?.expaned ? (
      <ArrowDropDown sx={innerStyle.arrow} />
    ) : (
      <ArrowRight sx={innerStyle.arrow} />
    );

  return (
    <ul className={styles.list}>
      {idsToRender.map((id) => {
        const item = items.find((i) => i.id === id)!;
        const checkboxStates = getStatesForId(id);

        return (
          <React.Fragment key={item?.id}>
            <li data-id={`${itemName}-${item!.id}`}>
              <div>
                {checkboxPosition === 'detachLeft' && (
                  <>
                    <CheckboxItems
                      item={item!}
                      icons={icons}
                      checkboxCount={checkboxCount}
                      checkboxStates={checkboxStates!}
                      onClick={onClick}
                      style={{
                        marginRight:
                          indentLevel === 0
                            ? checkboxDistance
                            : checkboxDistance + indentLevel * 20,
                      }}
                    />
                    <CheckboxListControl
                      item={item}
                      itemStates={itemStates}
                      icons={icons}
                      getNodeItems={getNodeItems}
                      toggle={toggle}
                    />
                    <div>{item?.name}</div>
                  </>
                )}
                {checkboxPosition === 'attachLeft' && (
                  <>
                    <div
                      style={{
                        marginRight: indentLevel * 20,
                      }}
                    />
                    <CheckboxListControl
                      item={item}
                      itemStates={itemStates}
                      icons={icons}
                      getNodeItems={getNodeItems}
                      toggle={toggle}
                    />
                    <CheckboxItems
                      item={item!}
                      icons={icons}
                      checkboxCount={checkboxCount}
                      checkboxStates={checkboxStates!}
                      onClick={onClick}
                      style={{
                        marginRight: 5,
                      }}
                    />
                    <div>{item?.name}</div>
                  </>
                )}
                {checkboxPosition === 'attachRight' && (
                  <>
                    <div
                      style={{
                        marginRight: indentLevel * 20,
                      }}
                    />
                    <CheckboxListControl
                      item={item}
                      itemStates={itemStates}
                      icons={icons}
                      getNodeItems={getNodeItems}
                      toggle={toggle}
                    />
                    <div
                      style={{
                        marginRight: 5,
                      }}
                    >
                      {item?.name}
                    </div>
                    <CheckboxItems
                      item={item!}
                      icons={icons}
                      checkboxCount={checkboxCount}
                      checkboxStates={checkboxStates!}
                      onClick={onClick}
                    />
                  </>
                )}
              </div>
            </li>
            {getChildNodes(item!.id)}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

type CheckboxListControl = {
  item: Item;
  itemStates: ItemState[];
  icons: Icons;
  getNodeItems: (parentId: number) => Item[];
  toggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const CheckboxListControl: React.FC<CheckboxListControl> = ({
  item,
  itemStates,
  icons,
  getNodeItems,
  toggle,
}) => {
  const setIcon = (id: number) =>
    itemStates.find((i) => i.id === id)?.expaned ? (
      <ArrowDropDown sx={innerStyle.arrow} />
    ) : (
      <ArrowRight sx={innerStyle.arrow} />
    );

  return getNodeItems(item!.id).length !== 0 ? (
    <span onClick={toggle}>{setIcon(item!.id)}</span>
  ) : (
    <></>
  );
};

const innerStyle = {
  arrow: { width: '20px', height: '20px' },
};

export default CheckboxList;
