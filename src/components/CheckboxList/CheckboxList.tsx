/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import Checkbox from '../Checkbox/Checkbox';
import { CheckboxState } from '../Tree/MultiTree';
import styles from './checkboxlist.module.scss';
import type { ItemState } from '../Tree/MultiTree';

export type Item = {
  id: number;
  name: string;
  parentId: number;
};

type CheckboxListProps = {
  itemStates: ItemState[];
  items: Item[];
  checkboxCount: number;
  idsToRender?: number[];
  indentLevel?: number;
  onClick?: (id: number, idx: number) => void;
  getStatesForId: (id: number) => number[] | undefined;
  toggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  itemStates,
  items,
  checkboxCount,
  getStatesForId,
  idsToRender = [],
  indentLevel = 1,
  onClick = () => {},
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
        checkboxCount={checkboxCount}
        idsToRender={nodeItems.map((i) => i.id)}
        indentLevel={indentLevel + 1}
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
        const item = items.find((i) => i.id === id);
        const checkboxStates = getStatesForId(id);

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
                  {[...Array(checkboxCount)].map((v, i) => (
                    <Checkbox
                      key={i}
                      onClick={() => onClick(item!.id, i)}
                      isChecked={checkboxStates![i] === CheckboxState.CHECKED}
                      isIndeterminate={
                        checkboxStates![i] === CheckboxState.INDETERMINATE
                      }
                    />
                  ))}
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
