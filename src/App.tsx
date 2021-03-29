import GlobalStyles from "./styles/global";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import { lightTheme } from "./styles/themes";

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <Home />
      </ThemeProvider>

      <GlobalStyles />
    </StylesProvider>
  );
}

export default App;
