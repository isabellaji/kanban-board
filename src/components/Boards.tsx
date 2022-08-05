import { Board } from 'components';
import { categoryState, toDoState } from 'store/atoms';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0.5em;
`;

export const Boards = () => {
  const todoList = useRecoilValue(toDoState);
  const categoryList = useRecoilValue(categoryState);

  return (
    <Droppable droppableId="allBoards" type="board" direction="horizontal">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {categoryList.map((boardId, index) => (
            <Draggable draggableId={boardId} index={index} key={boardId}>
              {(provided, snapshot) => (
                <div
                  style={{ background: 'red' }}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Board
                    toDos={todoList[boardId]}
                    boardId={boardId}
                    isDragging={snapshot.isDragging}
                  />
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
