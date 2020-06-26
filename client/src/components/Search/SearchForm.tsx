import React from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { InputBase, makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";

import { searchProfile } from "../../actions/profileActions";

import { AppActions } from "../../types/actions";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 50,
    marginLeft: 50,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      margin: "0px auto",
      width: "40%",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0px auto",
      width: "30%",
    },
  },
  searchIcon: {
    width: 35,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: 7,
    paddingRight: 7,
    paddingBottom: 7,
    paddingLeft: 35,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

type Props = LinkDispatchProps;

const SearchForm: React.FC<Props> = ({ searchProfile }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleKeypress = async (e: any) => {
    const searchData: { text: string } = {
      text: e.target.value,
    };

    if (e.key === "Enter") {
      searchProfile(searchData.text, history);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search user"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onKeyPress={handleKeypress}
      />
    </div>
  );
};

interface LinkDispatchProps {
  searchProfile: (searchData: string, history: any) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  searchProfile: bindActionCreators(searchProfile, dispatch),
});

export default connect(null, mapDispatchToProps)(SearchForm);
