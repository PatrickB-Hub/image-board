import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { ConfirmProvider } from "material-ui-confirm";

import { headers } from "./utils/useFetch";
import { setUser, logoutUser } from "./actions/userActions";
import { store } from "./store/configureStore";
import AppRouter from "./router";

interface JwtLocalStorage {
  token: string;
  exp: number;
}

const token = localStorage.getItem("jwt");
if (token) {
  const decodedJwt: JwtLocalStorage = jwt_decode(token);
  const currentTime = Date.now();
  console.log(decodedJwt)
  if (currentTime > decodedJwt.exp) {
    store.dispatch(logoutUser());
  } else {
    headers.append("Authorization", token);
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
