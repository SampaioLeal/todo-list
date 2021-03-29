import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import useStore, { TodoTask } from "../store/TodoStore";

interface Props {
  open: boolean;
  todo: TodoTask;
  handleClose(): void;
}

export default function DeleteTodo(props: Props) {
  const store = useStore();

  function handleDelete() {
    props.handleClose();
    store.deleteTodo(props.todo);
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-slide-title">
        Deseja remover a tarefa?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Você está prestes a remover a tarefa "{props.todo.titulo}".
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
