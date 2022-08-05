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

// export const todoFilterState = selector<TodoList>({
//   key: 'todoFilterState',
//   get: ({ get }) => {
//     const toDos = get(toDoState);

//     if (Object.keys(toDos).length === 0) {
//       return defaultTodos;
//     } else {
//       return toDos;
//     }
//   },
// });

// export const categoryFilterState = selector({
//   key: 'categoryFilterState',
//   get: ({ get }) => {
//     const category = get(categoryState);

//     if (category.length === 0) {
//       return Object.keys(defaultTodos);
//     } else {
//       return category;
//     }
//   },
// });
