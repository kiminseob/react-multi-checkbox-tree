import React from 'react';
import { Icons, Item, ItemState } from 'types';
import styles from './checkboxlist.module.scss';

type CheckboxListControl = {
  item: Item;
  itemStates: ItemState[];
  icons: Icons;
  getNodeItems: (parentId: number) => Item[];
  toggle: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

const Expand = ({ icons }: { icons: Icons }) => {
  return (
    <>{icons.expand || <div className={`${styles.arrow} ${styles.down}`} />}</>
  );
};

const Collapse = ({ icons }: { icons: Icons }) => {
  return (
    <>
      {icons.collapse || <div className={`${styles.arrow} ${styles.right}`} />}
    </>
  );
};

const CheckboxListControl: React.FC<CheckboxListControl> = ({
  item,
  itemStates,
  icons,
  getNodeItems,
  toggle,
}) => {
  const setIcon = (id: number) =>
    itemStates.find((i) => i.id === id)?.expand ? (
      <Expand icons={icons} />
    ) : (
      <Collapse icons={icons} />
    );

  return getNodeItems(item.id).length !== 0 ? (
    <span className={styles.arrowWrapper} onClick={toggle}>
      {setIcon(item.id)}
    </span>
  ) : (
    <></>
  );
};

export default CheckboxListControl;
