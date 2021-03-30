import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import { darkTheme, lightTheme } from "./styles/themes";
import { CssBaseline } from "@material-ui/core";
import useStore from "./store/TodoStore";
import { observer } from "mobx-react-lite";

function App() {
  const store = useStore();
  const themes = {
    dark: darkTheme,
    light: lightTheme,
  };

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={themes[store.theme]}>
        <Home />
      </ThemeProvider>

      {/* <GlobalStyles /> */}
    </StylesProvider>
  );
}

export default observer(App);
