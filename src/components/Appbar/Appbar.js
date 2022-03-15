import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./Appbar.css";


export default function Appbar() {
  return (
    <AppBar position="static" className="appbarStyle">
      <Toolbar>
        <div className="sectionDesktop">
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
        </div>
        <Avatar alt="logo" src="../public/logo192.png" className="menuButton main-avatar"><MonetizationOnIcon /></Avatar>
        <div className="menuButton"><h5>
          دفتر خرج شخصی من
        </h5></div>
        <div className="grow" />
        <div className="sectionAll">
          <IconButton aria-label="show 17 new notifications"
            className="menuButton"
            color="inherit"
          >
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton
            edge="end"
            className="menuButton"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <PersonIcon fontSize="large" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
