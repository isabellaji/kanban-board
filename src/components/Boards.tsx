import { Board } from 'components';
import { categoryState, toDoState } from 'atoms';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: flex-start;
`;

export const Boards = () => {
  const todoList = useRecoilValue(toDoState);
  const boardList = useRecoilValue(categoryState);

  return (
    <Droppable droppableId="allBoards" type="board" direction="horizontal">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {boardList.map((boardId, index) => (
            <Draggable draggableId={boardId} index={index} key={boardId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Board toDos={todoList[boardId]} boardId={boardId} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};
