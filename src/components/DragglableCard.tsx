import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
  padding: 0.7em;
  margin-bottom: 0.5em;
  border-radius: 0.3rem;
  color: ${(props) =>
    props.isDragging ? props.theme.cardColor : props.theme.textColor};
  background-color: ${(props) =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? ' 2px 3px 5px #00000010' : 'none'};
`;

interface DragglableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

export const DragglableCard = React.memo(
  ({ toDoId, toDoText, index }: DragglableCardProps) => {
    return (
      <Draggable draggableId={toDoId + ''} index={index}>
        {(provided, snapshot) => (
          <Card
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {toDoText}
          </Card>
        )}
      </Draggable>
    );
  }
);
