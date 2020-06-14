import React from "react";
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";

import { store } from "./store/configureStore";
import { headers } from "./utils/useFetch";
import { setUser } from "./actions/userActions";
import AppRouter from "./router";

const token = localStorage.getItem("jwt");
if (token) {
  headers.append("Authorization", token);
  store.dispatch(setUser());
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfirmProvider>
        <AppRouter />
      </ConfirmProvider>
    </Provider>
  );
};

export default App;
