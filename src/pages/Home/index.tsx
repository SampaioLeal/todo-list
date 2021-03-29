import { Typography, Divider, makeStyles, Container } from "@material-ui/core";
import { useEffect } from "react";
import AddButton from "../../components/AddButton";
import TaskList from "../../components/TaskList";
import useStore from "../../store/TodoStore";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    paddingTop: 20,
    height: "100vh",
    position: "relative",
  },
});

function Home() {
  const store = useStore();
  const styles = useStyles();

  useEffect(() => {
    store.getLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={styles.container} maxWidth="md">
      <Typography variant="h2">TODO List</Typography>
      <Typography variant="h5">Organizando sua vida</Typography>
      <Divider style={{ width: "95%", marginTop: 20 }} />
      <TaskList />
      <AddButton />
    </Container>
  );
}

export default Home;
