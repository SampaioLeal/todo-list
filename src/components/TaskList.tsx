import { observer } from "mobx-react-lite";
import styled from "styled-components";
import useStore, { TodoTask } from "../store/TodoStore";
import Task from "./Task";

interface Props {
  onTaskClick(todo: TodoTask): void;
}

function TaskList({ onTaskClick }: Props) {
  const store = useStore();

  return (
    <Container>
      {store.todos.map((todo) => (
        <Task
          key={`${todo.id}`}
          todo={todo}
          onClick={() => onTaskClick(todo)}
        />
      ))}
    </Container>
  );
}

export default observer(TaskList);

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 60px;
`;
