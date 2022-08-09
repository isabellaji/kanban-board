import { Cards } from 'components';
import { categoryState, TodoItems, toDoState } from 'store/atoms';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Container = styled.div<{ isDragging: boolean }>`
  width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.isDragging ? '#fdcb6e' : props.theme.boardColor};
  margin: 0 0.5em;
  position: relative;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 2em 0 1.5em;
`;
const RemoveBtn = styled.div`
  position: absolute;
  top: 1.3em;
  right: 0.5em;
  padding: 1em;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 90%;
    padding: 0.7em;
  }
`;
interface ListStyleProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const List = styled.div<ListStyleProps>`
  padding: 1em;
  margin-top: 0.5em;
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#fdcb6e'
      : props.draggingFromThisWith
      ? '#636e72'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  border-radius: 0 0 0.3rem 0.3rem;
`;

interface BoardProps {
  toDos: TodoItems[];
  boardId: string;
  isDragging: boolean;
}

interface FormProps {
  toDo: string;
}

export const Board = ({ toDos, boardId, isDragging }: BoardProps) => {
  const setTodoList = useSetRecoilState(toDoState);
  const setCategoryList = useSetRecoilState(categoryState);
  const { register, setValue, handleSubmit } = useForm<FormProps>();

  const handleDeleteBoard = () => {
    setTodoList((prevBoards) => {
      const newBoards = { ...prevBoards };
      delete newBoards[boardId];
      console.log(newBoards);

      return newBoards;
    });
    setCategoryList((prevCategories) => {
      const newCategory = [...prevCategories];
      const index = newCategory.indexOf(boardId);

      newCategory.splice(index, 1);
      return newCategory;
    });
  };

  const onValid = ({ toDo }: FormProps) => {
    const newTodo = { id: Date.now(), text: toDo };
    setTodoList((prevBoards) => {
      return {
        ...prevBoards,
        [boardId]: [newTodo, ...prevBoards[boardId]],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Container isDragging={isDragging}>
      <RemoveBtn onClick={handleDeleteBoard}>❎</RemoveBtn>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder="Add a task"
          autoComplete="off"
        />
      </Form>
      <Droppable droppableId={boardId} type="card">
        {(provided, snapshot) => (
          <List
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <Cards
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
                key={toDo.id}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Container>
  );
};
