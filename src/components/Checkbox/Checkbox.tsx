import React from 'react';
import styles from './checkbox.module.scss';
import { CustomStyle, Icons } from 'types';

type checkboxProps = {
  isChecked: boolean;
  isIndeterminate: boolean;
  onClick: () => void;
  icons: Icons;
  customStyle: CustomStyle;
};

const Checkbox: React.FC<checkboxProps> = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
  icons,
  customStyle,
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
    return (
      <div
        className={`${
          customStyle?.checkbox
            ? `${className} ${customStyle.checkbox}`
            : className
        }`}
        onClick={onClick}
      />
    );
  };

  return render();
};

export default Checkbox;
