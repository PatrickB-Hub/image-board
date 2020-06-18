import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  load: {
    width: "100%",
    marginTop: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadIcon: {
    color: "#3F51B5",
  },
});

const LoadingPosts = () => {
  const classes = useStyles();

  return (
    <div className={classes.load}>
      <CircularProgress className={classes.loadIcon} />
    </div>
  );
};

export default LoadingPosts;
