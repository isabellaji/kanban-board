import { Boards, CreateBoardForm, Trash } from 'components';
import { categoryState, toDoState } from 'store/atoms';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const BoardsContainer = styled.div`
  width: 100%;
  margin-top: 8em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const setTodoList = useSetRecoilState(toDoState);
  const setCategoryList = useSetRecoilState(categoryState);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      if (source.droppableId === 'allBoards') {
        setCategoryList((prevCategories) => {
          const newCategory = [...prevCategories];
          const target = newCategory[source.index];

          newCategory.splice(source.index, 1);
          newCategory.splice(destination.index, 0, target);
          return newCategory;
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
      <CreateBoardForm />
      <BoardsContainer>
        <Boards />
      </BoardsContainer>
      <Trash />
    </DragDropContext>
  );
}

export default App;
