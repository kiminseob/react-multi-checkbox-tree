import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { CheckboxState } from '../Tree/MultiTree';
import { Item, Icons } from 'types';
import styles from './checkboxItems.module.scss';

type CheckboxItemsProps = {
  style?: object;
  item: Item;
  indent: number;
  checkboxCount: number;
  checkboxStates: number[];
  icons: Icons;
  onClick: (id: number, idx: number) => void;
};

const CheckboxItems: React.FC<CheckboxItemsProps> = ({
  item,
  indent,
  checkboxCount,
  checkboxStates,
  onClick,
  icons,
}) => {
  return (
    <div
      className={styles.checkbox}
      style={{
        fontSize: indent * (5 / 6),
        width: checkboxCount * indent,
        height: indent,
      }}
    >
      {[...Array(checkboxCount)].map((v, i) => (
        <Checkbox
          key={i}
          onClick={() => onClick(item.id, i)}
          isChecked={checkboxStates[i] === CheckboxState.CHECKED}
          isIndeterminate={checkboxStates[i] === CheckboxState.INDETERMINATE}
          icons={icons}
        />
      ))}
    </div>
  );
};
export default CheckboxItems;
