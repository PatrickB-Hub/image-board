import React from "react";
import Grid from "@material-ui/core/Grid";

const Main: React.FC<{ children: React.ReactElement }> = ({ children }) => (
  <div>
    <Grid
      container
      direction="column"
      alignContent="center"
      style={{ padding: 25 }}
    >
      {children}
    </Grid>
  </div>
);

export default Main;
