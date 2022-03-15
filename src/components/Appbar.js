import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(5),
  },
  margin: {
    marginRight: theme.spacing(2),
  },
  column: {
    flexDirection: "column",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionAll: {
    display: "flex",
  },
  appbarStyle: {
    borderRadius: "0px 0px 20px 20px",
    height:'70px',
    backgroundColor: "#38495d",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#ebeff0",
    },
  },
}));

export default function Appbar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.appbarStyle}>
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon fontSize = "large" />
            </IconButton>
          </div>
            <Avatar alt="logo" src="../public/logo192.png" sizes = "190" className={classes.margin} />
  {/* <div className={classes.column}> */}
  <Typography variant="h6" noWrap className={classes.margin}>
            دفتر خرج شخصی من
          </Typography>
  {/* <Typography color="primary" variant="h6" noWrap className={classes.margin}>
           35600000+  تومان
          </Typography> */}
          {/* </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionAll}>
            <IconButton aria-label="show 17 new notifications"
             className={classes.menuButton} 
             color="inherit"
             >
              <NotificationsIcon fontSize = "large" />
            </IconButton>
            <IconButton
              edge="end"
              className={classes.menuButton}
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <PersonIcon fontSize = "large" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
