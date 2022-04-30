import React from 'react';
import CheckboxItems from './CheckboxItems';
import CheckboxListControl from '../CheckboxList/CheckboxListControl';

const getIndent = (position, checkboxDistance, indentLevel, indent) =>
  ({
    detachLeft: checkboxDistance + indentLevel * indent,
    attachLeft: indentLevel * indent,
    attachRight: indentLevel * indent,
  }[position]);

const ItemName = ({ item, style = {} }) => {
  return <div style={style}>{item.name}</div>;
};

const IndentBox = ({ position, checkboxDistance, indentLevel, indent }) => {
  if (indentLevel === 0) return null;

  return (
    <i
      style={{
        marginRight: getIndent(position, checkboxDistance, indentLevel, indent),
      }}
    />
  );
};

const CheckboxPositionAssemble = (
  position,
  checkboxItemsProps,
  checkboxListControlProps,
  itemNameProps,
  indentProps
) =>
  ({
    detachLeft: (
      <>
        {React.cloneElement(<CheckboxItems />, { ...checkboxItemsProps })}
        {React.cloneElement(<IndentBox />, { ...indentProps, position })}
        {React.cloneElement(<CheckboxListControl />, {
          ...checkboxListControlProps,
        })}
        {React.cloneElement(<ItemName />, { ...itemNameProps })}
      </>
    ),
    attachLeft: (
      <>
        {React.cloneElement(<IndentBox />, { ...indentProps, position })}
        {React.cloneElement(<CheckboxListControl />, {
          ...checkboxListControlProps,
        })}
        {React.cloneElement(<CheckboxItems />, { ...checkboxItemsProps })}
        {React.cloneElement(<ItemName style={{ marginLeft: 5 }} />, {
          ...itemNameProps,
        })}
      </>
    ),
    attachRight: (
      <>
        {React.cloneElement(<IndentBox />, { ...indentProps, position })}
        {React.cloneElement(<CheckboxListControl />, {
          ...checkboxListControlProps,
        })}
        {React.cloneElement(<ItemName style={{ marginRight: 5 }} />, {
          ...itemNameProps,
        })}
        {React.cloneElement(<CheckboxItems />, { ...checkboxItemsProps })}
      </>
    ),
  }[position]);

export default CheckboxPositionAssemble;
