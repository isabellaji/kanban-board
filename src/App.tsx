import { Boards } from 'components';
import { categoryState, toDoState } from 'atoms';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  margin-top: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Trash = styled.div`
  margin: 5em 0;
  text-align: center;
`;
const Icon = styled.span<{ isDraggingOver: boolean }>`
  display: inline-block;
  font-size: 3.5em;
  padding: 2rem;
  transform: ${(props) => (props.isDraggingOver ? 'scale(1.2)' : 'none')};
  transition: transform 0.2s ease-in-out;
`;

function App() {
  const setTodoList = useSetRecoilState(toDoState);
  const setCategoryList = useSetRecoilState(categoryState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      if (source.droppableId === 'allBoards') {
        setCategoryList((prevBoards) => {
          const newBoard = [...prevBoards];
          const target = newBoard[source.index];

          newBoard.splice(source.index, 1);
          newBoard.splice(destination.index, 0, target);
          return newBoard;
        });
      } else {
        setTodoList((prevBoards) => {
          const newBoard = [...prevBoards[source.droppableId]];
          const target = newBoard[source.index];

          newBoard.splice(source.index, 1);
          newBoard.splice(destination?.index, 0, target);

          return { ...prevBoards, [source.droppableId]: newBoard };
        });
      }
    }
    if (destination?.droppableId !== source.droppableId) {
      if (destination.droppableId === 'trash') {
        setTodoList((prevBoards) => {
          const newBoard = [...prevBoards[source.droppableId]];

          newBoard.splice(source.index, 1);
          return { ...prevBoards, [source.droppableId]: newBoard };
        });
      } else {
        setTodoList((prevBoards) => {
          const sourceBoard = [...prevBoards[source.droppableId]];
          const destinationBoard = [...prevBoards[destination.droppableId]];
          const target = sourceBoard[source.index];

          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination?.index, 0, target);

          return {
            ...prevBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards />
      </Container>
      <Droppable droppableId="trash" type="card">
        {(provided, snapshot) => (
          <Trash>
            <Icon
              isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              🗑
            </Icon>
          </Trash>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
