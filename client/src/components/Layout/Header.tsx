import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle, MoreVert } from "@material-ui/icons";

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

type Props = LinkStateProps & LinkDispatchProps;

const Header: React.FC<Props> = ({ logoutUser, isAuthenticated }) => {
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
      <IconButton
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
      >
        <MoreVert />
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
          <Link to="/image-board/login">Log In</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/image-board/register">Sign Up</Link>
        </MenuItem>
      </Menu>
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
