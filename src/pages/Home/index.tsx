import {
  Typography,
  Divider,
  makeStyles,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import { useEffect } from "react";
import AddButton from "../../components/AddButton";
import TaskList from "../../components/TaskList";
import useStore from "../../store/TodoStore";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  back: { backgroundColor: theme.palette.background.default },
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
}));

function Home() {
  const store = useStore();
  const styles = useStyles();

  useEffect(() => {
    store.getLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container className={styles.back}>
      <Container className={styles.container} maxWidth="md">
        <Typography variant="h2">TODO List</Typography>
        <Typography variant="h5">Organizando sua vida</Typography>
        {store.theme === "light" ? (
          <IconButton onClick={() => store.toggleTheme("dark")}>
            <Brightness4Icon />
          </IconButton>
        ) : (
          <IconButton onClick={() => store.toggleTheme("light")}>
            <BrightnessHighIcon />
          </IconButton>
        )}
        <Divider style={{ width: "95%", marginTop: 20 }} />
        <TaskList />
        <AddButton />
      </Container>
    </Grid>
  );
}

export default observer(Home);
