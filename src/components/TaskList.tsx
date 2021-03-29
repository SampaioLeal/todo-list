import { makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import useStore from "../store/TodoStore";
import Task from "./Task";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    padding: "0 20px",
    overflowY: "auto",
    paddingTop: 20,
    paddingBottom: 60,
  },
});

function TaskList() {
  const store = useStore();
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {store.todos.map((todo) => (
        <Task key={`${todo.id}`} todo={todo} />
      ))}
    </div>
  );
}

export default observer(TaskList);
