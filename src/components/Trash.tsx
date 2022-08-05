import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div<{ isDraggingOver: boolean }>`
  position: fixed;
  bottom: 0;
  right: 0;
  span {
    display: inline-block;
    font-size: 3.5em;
    padding: 2rem;
    transform: ${(props) => (props.isDraggingOver ? 'scale(1.2)' : 'none')};
    transition: transform 0.2s ease-in-out;
    cursor: default;
  }
`;

export const Trash = () => {
  return (
    <Droppable droppableId="trash" type="card">
      {(provided, snapshot) => (
        <Container isDraggingOver={snapshot.isDraggingOver}>
          <span ref={provided.innerRef} {...provided.droppableProps}>
            🗑
          </span>
        </Container>
      )}
    </Droppable>
  );
};
