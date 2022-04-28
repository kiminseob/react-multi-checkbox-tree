/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './checkbox.module.scss';

type checkboxProps = {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick?: () => void;
};

const Checkbox: React.FC<checkboxProps> = ({
  isChecked = false,
  isIndeterminate = false,
  onClick = () => {},
}) => {
  const className = `${styles.checkbox} ${
    isIndeterminate ? styles.isIndeterminate : ''
  } ${isChecked ? styles.isChecked : ''} `;

  return <div className={className} onClick={onClick} />;
};

export default Checkbox;
