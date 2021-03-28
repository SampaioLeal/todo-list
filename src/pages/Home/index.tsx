import { Typography, Container, Divider } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import AddButton from "../../components/AddButton";
import FormTodo from "../../components/FormTodo";
import TaskList from "../../components/TaskList";
import useStore, { TodoTask } from "../../store/TodoStore";
import { observer } from "mobx-react-lite";

function Home() {
  const store = useStore();
  const [modalState, setModalState] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoTask | null>(null);

  function openModal() {
    setModalState(true);
  }
  function closeModal() {
    setModalState(false);
  }
  function handleTaskClick(todo: TodoTask) {
    setSelectedTodo(todo);
    openModal();
  }
  function handleAddClick() {
    setSelectedTodo(null);
    openModal();
  }

  return (
    <MuiContainer style={{ position: "relative" }} maxWidth="md">
      <Typography variant="h2">TODO List</Typography>
      <Typography variant="h5">Organizando sua vida</Typography>

      <Divider style={{ width: "95%", marginTop: 20 }} />

      <TaskList onTaskClick={handleTaskClick} />

      <AddButton onClick={handleAddClick} />

      {modalState ? (
        <FormTodo
          open={modalState}
          handleClose={closeModal}
          todo={selectedTodo}
        />
      ) : null}
    </MuiContainer>
  );
}

export default observer(Home);

const MuiContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0;
  padding-top: 20px;

  height: 100vh;
`;
