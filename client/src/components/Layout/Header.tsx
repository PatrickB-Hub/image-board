import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  Button,
  AppBar,
  Toolbar,
  makeStyles,
  withStyles,
  Theme,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { indigo } from "@material-ui/core/colors";

import SearchForm from "../Search/SearchForm";

import { logoutUser } from "../../actions/userActions";
import { AppState } from "../../store/configureStore";

import { User } from "../../types/User";
import { AppActions } from "../../types/actions";

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

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    color: theme.palette.getContrastText(indigo[700]),
    backgroundColor: indigo[700],
    "&:hover": {
      backgroundColor: indigo[800],
    },
  },
}))(Button);

type Props = LinkStateProps & LinkDispatchProps;

const Header: React.FC<Props> = ({ logoutUser, isAuthenticated, user }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAnchorEl(null);
    logoutUser();
  };

  const open = Boolean(anchorEl);

  const guestLinks = (
    <div>
      <Link to="/image-board/register">
        <ColorButton variant="contained">Sign Up</ColorButton>
      </Link>
      <Link to="/image-board/login">
        <ColorButton variant="contained">Log In</ColorButton>
      </Link>
    </div>
  );

  const authLinks = (
    <div>
      <IconButton
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/image-board/profile/${user._id}`}>Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/image-board/followed">Followed</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/image-board/" onClick={handleLogout}>
            Log Out
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.space}>
          <Link to="/image-board" className={classes.logo}>
            <img alt="logo" src="camera_logo.png" style={{ width: 40 }} />
          </Link>
          {isAuthenticated && <SearchForm />}
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

interface LinkStateProps {
  isAuthenticated: boolean;
  user: User;
}

interface LinkDispatchProps {
  logoutUser: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
  logoutUser: bindActionCreators(logoutUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
