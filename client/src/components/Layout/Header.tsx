import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

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

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

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

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.space}>{guestLinks}</Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
