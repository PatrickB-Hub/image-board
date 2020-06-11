import React from "react";
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";

import { store } from "./store/configureStore";
import AppRouter from "./router";

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
