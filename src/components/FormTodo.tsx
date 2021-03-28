import { Button, Dialog, Grid, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { Formik, Form } from "formik";
import useStore, { TodoTask } from "../store/TodoStore";

interface Props {
  open: boolean;
  handleClose(): void;
  todo?: TodoTask | null;
}

export default function FormTodo(props: Props) {
  const store = useStore();
  const initialValues = {
    titulo: props.todo ? props.todo.titulo : "",
    descricao: props.todo ? props.todo.descricao : "",
    feito: props.todo ? props.todo.feito : false,
    id: props.todo ? props.todo.id : undefined,
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
    if (props.todo) {
      store.editTodo(values);
    } else {
      store.addTodo(values);
    }
    props.handleClose();
  }

  return (
    <Dialog onClose={props.handleClose} open={props.open}>
      <ModalHeader>
        <ModalTitle>{props.todo ? "Editar" : "Nova"} tarefa</ModalTitle>

        <IconButton onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
      </ModalHeader>

      <Content>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Título da tarefa"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={values.descricao}
                    name="descricao"
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Descrição"
                  />
                </Grid>

                <Grid item xs={12}>
                  <BlackButton fullWidth type="submit">
                    {!props.todo && <AddIcon />}
                    {props.todo ? "Salvar" : "Adicionar"}
                  </BlackButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Content>
    </Dialog>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.div`
  margin: 20px 0;
  margin-top: 0;
  padding: 0 20px;
`;

const BlackButton = styled(Button).attrs({ variant: "contained" })`
  background-color: black;
  color: white;
`;
