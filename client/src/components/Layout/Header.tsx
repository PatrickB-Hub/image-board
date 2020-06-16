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
import { AccountCircle, MoreVert } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";

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
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    "&:hover": {
      backgroundColor: blue[800],
    },
  },
}))(Button);

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
      <Link to="/image-board/register">
        <ColorButton variant="contained" color="primary">
          Sign Up
        </ColorButton>
      </Link>
      <Link to="/image-board/login">
        <ColorButton variant="contained" color="primary">
          Log In
        </ColorButton>
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
