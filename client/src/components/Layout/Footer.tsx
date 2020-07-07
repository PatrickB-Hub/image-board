import React from "react";
import { connect } from "react-redux";
import { Box, AppBar, Toolbar, makeStyles } from "@material-ui/core";

import AddPost from "../Post/AddPost";
import { AppState } from "../../store/configureStore";

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

type Props = LinkStateProps;

const Footer: React.FC<Props> = ({ isAuthenticated }) => {
  const classes = useStyles();

  return (
    <>
      {isAuthenticated && <AddPost />}
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
    </>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Footer);
