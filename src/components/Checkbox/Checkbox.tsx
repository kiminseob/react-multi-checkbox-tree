import React, { ReactElement } from 'react';
import styles from './checkbox.module.scss';

export type Icons = {
  indeterminate?: ReactElement;
  check?: ReactElement;
  unCheck?: ReactElement;
  expand?: ReactElement;
  collapse?: ReactElement;
};

type checkboxProps = {
  isChecked: boolean;
  isIndeterminate: boolean;
  onClick: () => void;
  icons: Icons;
};

const Checkbox: React.FC<checkboxProps> = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
  icons,
}) => {
  const className = `${styles.checkbox} ${
    isIndeterminate ? styles.isIndeterminate : ''
  } ${isChecked ? styles.isChecked : ''} ${
    !isChecked && !isIndeterminate ? styles.isUnChecked : ''
  }`;

  const render = () => {
    if (isIndeterminate && icons.indeterminate) {
      return React.cloneElement(icons.indeterminate, { onClick });
    } else if (isChecked && icons.check) {
      return React.cloneElement(icons.check, { onClick });
    } else if (icons.unCheck) {
      return React.cloneElement(icons.unCheck, { onClick });
    }
    return <div className={className} onClick={onClick} />;
  };

  return render();
};

export default Checkbox;
