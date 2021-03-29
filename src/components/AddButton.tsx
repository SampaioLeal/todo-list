import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import FormTodo from "./FormTodo";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default function AddButton() {
  const styles = useStyles();
  const [modalState, setModalState] = useState(false);

  function handleClick() {
    setModalState(true);
  }

  return (
    <>
      <Fab color="primary" onClick={handleClick} className={styles.root}>
        <AddIcon />
      </Fab>
      {modalState ? (
        <FormTodo open={modalState} handleClose={() => setModalState(false)} />
      ) : null}
    </>
  );
}
