import React from "react";
import { Box, AppBar, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: 20,
  },
  appBar: {
    maxHeight: 40,
    justifyContent: "center",
    top: "auto",
    bottom: 0,
    backgroundColor: "#eee",
    color: "#444",
  },
  link: {
    textDecoration: "underline",
    color: "#444",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} boxShadow={3}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <span>
            Made with{" "}
            <span role="img" aria-label="coffee">
              ☕
            </span>{" "}
            by{" "}
            <a className={classes.link} href="https://patrickbecker.me">
              Patrick Becker
            </a>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
