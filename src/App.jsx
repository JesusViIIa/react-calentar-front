import { Provider } from "react-redux";
import { AppRouter } from "./components/router/AppRouter";
import { store } from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
