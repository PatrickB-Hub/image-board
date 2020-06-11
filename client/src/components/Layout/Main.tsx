import React from "react";
import { Grid } from "@material-ui/core";

import Header from "./Header";
import Footer from "./Footer";

const Main: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div>
    <Header />
    <Grid
      container
      direction="column"
      alignContent="center"
      style={{ padding: 25 }}
    >
      {children}
    </Grid>
    <Footer />
  </div>
);

export default Main;
