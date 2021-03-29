import { Typography, Container, Divider } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import AddButton from "../../components/AddButton";
import FormTodo from "../../components/FormTodo";
import TaskList from "../../components/TaskList";
import { TodoTask } from "../../store/TodoStore";
import { observer } from "mobx-react-lite";
import DeleteTodo from "../../components/DeleteTodo";

function Home() {
  const [modalState, setModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoTask | null>(null);

  function openModal() {
    setModalState(true);
  }
  function closeModal() {
    setModalState(false);
  }
  function openDeleteModal() {
    setDeleteModalState(true);
  }
  function closeDeleteModal() {
    setDeleteModalState(false);
  }

  function handleAddClick() {
    setSelectedTodo(null);
    openModal();
  }
  function handleEditClick(todo: TodoTask) {
    setSelectedTodo(todo);
    openModal();
  }
  function handleDeleteClick(todo: TodoTask) {
    setSelectedTodo(todo);
    openDeleteModal();
  }

  return (
    <MuiContainer style={{ position: "relative" }} maxWidth="md">
      <Typography variant="h2">TODO List</Typography>
      <Typography variant="h5">Organizando sua vida</Typography>

      <Divider style={{ width: "95%", marginTop: 20 }} />

      <TaskList
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <AddButton onClick={handleAddClick} />

      {modalState ? (
        <FormTodo
          open={modalState}
          handleClose={closeModal}
          todo={selectedTodo}
        />
      ) : null}

      {deleteModalState ? (
        <DeleteTodo
          open={deleteModalState}
          handleClose={closeDeleteModal}
          todo={selectedTodo!}
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
