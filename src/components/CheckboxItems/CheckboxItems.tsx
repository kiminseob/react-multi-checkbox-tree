import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { CheckboxState } from '../Tree/MultiTree';
import styles from './checkboxItems.module.scss';
import type { Item } from '../CheckboxList/CheckboxList';
import type { Icons } from '../Checkbox/Checkbox';

type CheckboxItemsProps = {
  style?: object;
  item: Item;
  checkboxCount: number;
  checkboxStates: number[];
  icons: Icons;
  onClick: (id: number, idx: number) => void;
};

const CheckboxItems: React.FC<CheckboxItemsProps> = ({
  item,
  checkboxCount,
  checkboxStates,
  onClick,
  style = {},
  icons,
}) => {
  return (
    <div className={styles.checkbox} style={style}>
      {[...Array(checkboxCount)].map((v, i) => (
        <Checkbox
          key={i}
          onClick={() => onClick(item!.id, i)}
          isChecked={checkboxStates![i] === CheckboxState.CHECKED}
          isIndeterminate={checkboxStates![i] === CheckboxState.INDETERMINATE}
          icons={icons}
        />
      ))}
    </div>
  );
};
export default CheckboxItems;
