import GlobalStyles from "./styles/global";
import { StylesProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";

function App() {
  return (
    <StylesProvider injectFirst>
      <Home />
      <GlobalStyles />
    </StylesProvider>
  );
}

export default App;
