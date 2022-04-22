/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import Checkbox from '../Checkbox/Checkbox';
import { CheckboxState } from '../Tree/Tree';
import styles from './checkboxlist.module.scss';
import type { ItemState } from '../Tree/Tree';

export type Item = {
  privileges: string[];
  id: number;
  name: string;
  parentId: number;
};

type CheckboxListProps = {
  itemStates: ItemState[];
  items: Item[];
  idsToRender?: number[];
  indentLevel?: number;
  onClick?: (id: number, idx: number) => void;
  getStateForId: (id: number) => CheckboxState[] | undefined;
  privilegeNames?: string[];
  toggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  itemStates,
  items,
  getStateForId,
  idsToRender = [],
  indentLevel = 1,
  onClick = () => {},
  privilegeNames,
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
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
        onClick={onClick}
        getStateForId={getStateForId}
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
      {privilegeNames && (
        <li>
          <div>
            {privilegeNames?.map((privilegeName) => (
              <div className={styles.privilegeName}>{privilegeName}</div>
            ))}
          </div>
        </li>
      )}
      {idsToRender.map((id) => {
        const item = items.find((i) => i.id === id);
        const checkboxState = getStateForId(id);
        const [READ, WRITE] = checkboxState ?? [0, 0];
        return (
          <React.Fragment key={item?.id}>
            <li data-id={item!.id}>
              <div>
                <div
                  className={styles.checkbox}
                  style={{
                    marginRight: indentLevel * 25,
                  }}
                >
                  <Checkbox
                    onClick={() => onClick(item!.id, 1)}
                    isChecked={WRITE === CheckboxState.CHECKED}
                    isIndeterminate={WRITE === CheckboxState.INDETERMINATE}
                  />
                </div>
                {getNodeItems(item!.id).length !== 0 && (
                  <span onClick={toggle}>{setArrowIcon(item!.id)}</span>
                )}
                {item?.name}
              </div>
            </li>
            {getChildNodes(item!.id)}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

const innerStyle = {
  arrow: { width: '20px', height: '20px' },
};

export default CheckboxList;
