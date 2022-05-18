import type { ReactElement } from 'react';

export interface Item {
  checkboxName: string[];
  id: number;
  name: string;
  parentId: number;
}
export interface ItemState extends Item {
  checkStates: number[];
  expand: boolean;
}

export type Icons = {
  indeterminate?: ReactElement;
  check?: ReactElement;
  unCheck?: ReactElement;
  expand?: ReactElement;
  collapse?: ReactElement;
};

export type CustomStyle = {
  checkbox?: object;
};
