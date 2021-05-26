import React from "react";
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";

import { headers } from "./utils/useFetch";
import { setUser, logoutUser } from "./actions/userActions";
import { store } from "./store/configureStore";
import AppRouter from "./router";

// check for jwt in local storage and authenticate user if jwt is valid
const jwt = localStorage.getItem("jwt");
if (jwt) {
  const currentTime = Date.now();
  const token = JSON.parse(jwt);
  if (currentTime > token.expiresIn) {
    store.dispatch(logoutUser());
  } else {
    headers.append("Authorization", token.token);
    store.dispatch(setUser());
  }
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
