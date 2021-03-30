import { observer } from "mobx-react-lite";
import useStore, { TodoTask } from "../store/TodoStore";
import { Gestures } from "react-gesture-handler";
import { useState } from "react";
import { Checkbox, IconButton, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormTodo from "./FormTodo";
import DeleteTodo from "./DeleteTodo";

interface Props {
  todo: TodoTask;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    height: 60,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  options: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 60,
    backgroundColor: theme.palette.action.disabledBackground,
    width: "100%",
    borderRadius: 5,
    right: 0,
    top: -60,
  },
  taskContainer: {
    height: 90,
  },
  title: (props: Props) => ({
    fontSize: 20,
    fontWeight: "normal",
    textDecoration: props.todo.feito ? "line-through" : "none",
    color: props.todo.feito ? "#8c8c8c" : theme.palette.text.primary,
  }),
}));

function Task(props: Props) {
  const store = useStore();
  const styles = useStyles(props);
  const [rightOffset, setRightOffset] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const speed = 6;
  const optionsWidth = 100;

  function handleToggle(
    _e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    store.toggleTodo(props.todo.id!, checked);
  }

  function handleGesture(event: any) {
    setRightOffset((prev) => {
      if (prev - event.velocity * speed <= 0) {
        return 0;
      } else if (prev - event.velocity * speed >= optionsWidth) {
        return optionsWidth;
      } else {
        return prev - event.velocity * speed;
      }
    });
  }

  function handleEditClick() {
    setEditModal(true);
    store.setSelectedTodo(props.todo);
  }
  function handleDeleteClick() {
    setDeleteModal(true);
    store.setSelectedTodo(props.todo);
  }

  return (
    <div className={styles.taskContainer}>
      <Gestures
        recognizers={{
          Pan: {
            events: {
              panleft: handleGesture,
              panright: handleGesture,
            },
          },
        }}
      >
        <div className={styles.container} style={{ right: rightOffset }}>
          <div className={styles.left}>
            <Checkbox
              color="primary"
              checked={props.todo.feito}
              onClick={(e) => e.stopPropagation()}
              onChange={handleToggle}
            />
            <h3 className={styles.title}>{props.todo.titulo}</h3>
          </div>
        </div>
        <div className={styles.options}>
          <IconButton color="inherit" onClick={handleEditClick}>
            <EditIcon color="action" />
          </IconButton>
          <IconButton color="inherit" onClick={handleDeleteClick}>
            <DeleteIcon color="action" />
          </IconButton>
        </div>
      </Gestures>

      {editModal ? (
        <FormTodo open={editModal} handleClose={() => setEditModal(false)} />
      ) : null}

      {deleteModal ? (
        <DeleteTodo
          open={deleteModal}
          handleClose={() => setDeleteModal(false)}
          todo={store.selectedTodo!}
        />
      ) : null}
    </div>
  );
}

export default observer(Task);
