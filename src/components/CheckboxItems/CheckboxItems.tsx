import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { CheckboxState } from '../Tree/MultiTree';
import { Item, Icons, CustomStyle } from 'types';
import styles from './checkboxItems.module.scss';

type CheckboxItemsProps = {
  style?: object;
  item: Item;
  indent: number;
  checkboxCount: number;
  checkboxStates: number[];
  icons: Icons;
  customStyle: CustomStyle;
  onClick: (id: number, idx: number) => void;
};

const CheckboxItems: React.FC<CheckboxItemsProps> = ({
  item,
  indent,
  checkboxCount,
  checkboxStates,
  onClick,
  icons,
  customStyle,
}) => {
  return (
    <div
      className={styles.checkboxs}
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
          customStyle={customStyle}
        />
      ))}
    </div>
  );
};
export default CheckboxItems;
