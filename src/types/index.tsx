import type { ReactElement } from 'react';

export type Item = {
  id: number;
  name: string;
  parentId: number;
};

export type ItemState = {
  id: number;
  parentId: number;
  checkStates: number[];
  expand: boolean;
};

export type Icons = {
  indeterminate?: ReactElement;
  check?: ReactElement;
  unCheck?: ReactElement;
  expand?: ReactElement;
  collapse?: ReactElement;
};
