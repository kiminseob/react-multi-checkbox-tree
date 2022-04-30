import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { CheckboxState } from '../Tree/MultiTree';
import { Item, Icons } from 'types';
import styles from './checkboxItems.module.scss';

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
