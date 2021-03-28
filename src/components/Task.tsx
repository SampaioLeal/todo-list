import { observer } from "mobx-react-lite";
import styled from "styled-components";
import useStore, { TodoTask } from "../store/TodoStore";
import BlackCheckbox from "./BlackCheckbox";

interface Props {
  todo: TodoTask;
  onClick?(): void;
}

function Task(props: Props) {
  const store = useStore();

  function handleToggle(
    _e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    store.toggleTodo(props.todo.id!, checked);
  }

  return (
    <Container onClick={props.onClick}>
      <Left>
        <BlackCheckbox
          checked={props.todo.feito}
          onClick={(e) => e.stopPropagation()}
          onChange={handleToggle}
        />
        <Title>{props.todo.titulo}</Title>
      </Left>
    </Container>
  );
}

export default observer(Task);

const Container = styled.div`
  background-color: white;
  border-radius: 4px;
  height: 60px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;
  padding: 0 10px;

  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
  cursor: ${(props) => (props.onClick ? "pointer" : "normal")};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: normal;
`;
