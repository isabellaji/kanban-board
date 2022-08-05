import { atom } from 'recoil';

export interface TodoItems {
  id: number;
  text: string;
}

interface TodoList {
  [key: string]: TodoItems[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: TodoList[], _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const categoryState = atom<string[]>({
  key: 'category',
  default: [],
  effects: [localStorageEffect('category')],
});

export const toDoState = atom<TodoList>({
  key: 'toDoState',
  default: {},
  effects: [localStorageEffect('toDoList')],
});
