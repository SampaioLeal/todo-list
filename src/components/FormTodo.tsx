import {
  Button,
  Checkbox,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { Formik, Form } from "formik";
import useStore, { TodoTask } from "../store/TodoStore";

interface Props {
  open: boolean;
  handleClose(): void;
}

const useStyles = makeStyles({
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  content: {
    margin: "20px 0",
    marginTop: 0,
    padding: "0 20px",
  },
});

export default function FormTodo(props: Props) {
  const store = useStore();
  const styles = useStyles();
  const task = store.selectedTodo;
  const initialValues = {
    titulo: task ? task.titulo : "",
    descricao: task ? task.descricao : "",
    feito: task ? task.feito : false,
    id: task ? task.id : undefined,
  };

  function validate(values: TodoTask) {
    const errors: { [key: string]: string } = {};

    if (!values.titulo) {
      errors.titulo = "Campo obrigatório";
    } else if (!values.descricao) {
      errors.descricao = "Campo obrigatório";
    }

    return errors;
  }

  function handleSubmit(values: TodoTask) {
    if (task) {
      store.editTodo(values);
    } else {
      store.addTodo(values);
    }
    props.handleClose();
  }

  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {task && (
                  <Checkbox
                    color="primary"
                    checked={values.feito}
                    name="feito"
                    onChange={handleChange}
                  />
                )}
                {task ? "Editar" : "Nova"} tarefa
              </h2>

              <IconButton onClick={props.handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className={styles.content}>
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="primary"
                      name="titulo"
                      error={touched.titulo && !!errors.titulo}
                      value={values.titulo}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Título da tarefa"
                      helperText={touched.titulo && errors.titulo}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="primary"
                      error={touched.descricao && !!errors.descricao}
                      value={values.descricao}
                      name="descricao"
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Descrição"
                      helperText={touched.descricao && errors.descricao}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      {!task && <AddIcon />}
                      {task ? "Salvar" : "Adicionar"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </div>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
