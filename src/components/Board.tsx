import { Cards } from 'components';
import { TodoItems, toDoState } from 'store/atoms';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Container = styled.div<{ isDragging: boolean }>`
  width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  border-radius: 0.3rem;
  background-color: ${(props) =>
    props.isDragging ? '#fdcb6e' : props.theme.boardColor};
  margin: 0 0.5em;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1em;
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
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<FormProps>();

  const onValid = ({ toDo }: FormProps) => {
    const newTodo = { id: Date.now(), text: toDo };
    setToDos((prevBoards) => {
      return {
        ...prevBoards,
        [boardId]: [newTodo, ...prevBoards[boardId]],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Container isDragging={isDragging}>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder="Add a task"
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
