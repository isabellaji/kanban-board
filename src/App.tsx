import { toDoState } from 'atoms';
import { Board } from 'components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Boards = styled.div`
  width: 100%;
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: flex-start;
`;

function App() {
  const [todoList, setTodoList] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodoList((prevBoards) => {
        const newBoard = [...prevBoards[source.droppableId]];
        const target = newBoard[source.index];

        newBoard.splice(source.index, 1);
        newBoard.splice(destination?.index, 0, target);

        return { ...prevBoards, [source.droppableId]: newBoard };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards>
          {Object.keys(todoList).map((boardId) => (
            <Board toDos={todoList[boardId]} boardId={boardId} key={boardId} />
          ))}
        </Boards>
      </Container>
    </DragDropContext>
  );
}

export default App;
