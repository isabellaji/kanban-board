import { categoryState, toDoState } from 'store/atoms';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const AddBtn = styled.div`
  display: flex;
  position: fixed;
  top: 1.7em;
  right: 1.5em;
  z-index: 1;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 100%;
  box-shadow: 5px 5px 10px #00000070;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  span {
    font-size: 1.8rem;
    text-align: center;
    padding: 0.55rem 0.5rem 0.35rem 0.4rem;
    cursor: pointer;
  }
`;
const Form = styled.form<{ isHide: boolean }>`
  width: 300px;
  padding: 1em;
  position: absolute;
  top: 1em;
  right: 5em;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 0.2rem;
  display: ${(props) => (props.isHide ? 'none' : 'block')};
  input {
    width: 100%;
    padding: 0.7em;
  }
`;

interface FormProps {
  board: string;
}

export const CreateBoardForm = () => {
  const [isHide, setIsHide] = useState(true);
  const setTodoList = useSetRecoilState(toDoState);
  const setCategoryList = useSetRecoilState(categoryState);
  const { register, setValue, handleSubmit, setFocus } = useForm<FormProps>();

  const handleDisplayInput = () => {
    setIsHide(false);
  };

  const onValid = ({ board }: FormProps) => {
    setTodoList((prevBoards) => {
      return { ...prevBoards, [board]: [] };
    });
    setCategoryList((prevCategories) => [...prevCategories, board]);
    setValue('board', '');
    setIsHide(true);
  };

  useEffect(() => {
    !isHide && setFocus('board');
  }, [isHide]);

  return (
    <>
      <AddBtn onClick={handleDisplayInput}>
        <span>➕</span>
      </AddBtn>
      <Form isHide={isHide} onSubmit={handleSubmit(onValid)}>
        <input
          {...register('board', { required: true })}
          type="text"
          placeholder="Add a board"
          autoComplete="off"
        />
      </Form>
    </>
  );
};
