import { atom } from 'recoil';

export interface TodoItems {
  id: number;
  text: string;
}

interface TodoList {
  [key: string]: TodoItems[];
}

export const toDoState = atom<TodoList>({
  key: 'toDoList',
  default: {
    'To Do': [],
    Doing: [],
    Done: [],
  },
});
