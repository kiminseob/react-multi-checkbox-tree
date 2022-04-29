/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import styles from './checkbox.module.scss';

export type Icons = {
  indeterminate?: ReactElement;
  checked?: ReactElement;
  unChecked?: ReactElement;
};

type checkboxProps = {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick?: () => void;
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
  } ${isChecked ? styles.isChecked : ''} `;

  const render = () => {
    if (isIndeterminate && icons.indeterminate) {
      return React.cloneElement(icons.indeterminate, { onClick });
    } else if (isChecked && icons.checked) {
      return React.cloneElement(icons.checked, { onClick });
    } else if (icons.unChecked) {
      return React.cloneElement(icons.unChecked, { onClick });
    }
    return <div className={className} onClick={onClick} />;
  };

  return render();
};

export default Checkbox;
