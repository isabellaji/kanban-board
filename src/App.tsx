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
          const newList = [...prevBoards[source.droppableId]];
          const target = newList[source.index];

          newList.splice(source.index, 1);
          newList.splice(destination?.index, 0, target);

          return { ...prevBoards, [source.droppableId]: newList };
        });
      }
    }
    if (destination?.droppableId !== source.droppableId) {
      if (destination.droppableId === 'trash') {
        setTodoList((prevBoards) => {
          const newList = [...prevBoards[source.droppableId]];

          newList.splice(source.index, 1);
          return { ...prevBoards, [source.droppableId]: newList };
        });
      } else {
        setTodoList((prevBoards) => {
          const sourceList = [...prevBoards[source.droppableId]];
          const destinationList = [...prevBoards[destination.droppableId]];
          const target = sourceList[source.index];

          sourceList.splice(source.index, 1);
          destinationList.splice(destination?.index, 0, target);

          return {
            ...prevBoards,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList,
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
