import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    color: "#fff",
    fontSize: 30,
    textTransform: "uppercase",
  },
  space: {
    justifyContent: "space-between",
  },
});

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.space}>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
