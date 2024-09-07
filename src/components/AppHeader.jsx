import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Collapse,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { initialStore, StoreContext } from "../store";

const containerStyles = {
  backgroundColor: "#24303c",
};

const menuItemStyles = { fontWeight: 600, fontSize: "14px" };

const buttonStyles = {
  backgroundColor: "#ffffff",
  color: "#000000",
  fontWeight: 600,
  textTransform: "capitalize",
};

const AppHeader = () => {
  const navigate = useNavigate();
  const { store, setStore } = useContext(StoreContext);

  // State
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const updateStore = (attributes = {}) => {
    setStore((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    updateStore({ ...initialStore });
    closeMenu();
    window.location.reload();
  };

  return (
    <AppBar sx={containerStyles}>
      <Toolbar>
        <NavLink to="/">
          <img
            src="/images/nav-icon.png"
            alt="app-logo"
            width="36px"
            height="36px"
          />
        </NavLink>
        <Typography
          component="a"
          variant="h6"
          color="#ffffff"
          ml="10px"
          flexGrow={1}
          href="/"
          style={{ textDecoration: "none" }}
        >
          Gem Classifier
        </Typography>
        {store.authUser ? (
          <Tooltip title="Profile">
            <IconButton
              id="profile-avatar-button"
              aria-haspopup="true"
              aria-controls={isMenuOpen ? "profile-menu" : undefined}
              aria-expanded={isMenuOpen ? "true" : undefined}
              onClick={openMenu}
            >
              <Avatar sx={{ width: 35, height: 35 }}>
                {store.authUser.firstName.substring(0, 1)}
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Stack direction="row" alignItems="center" gap={1}>
            <Button
              size="small"
              variant="contained"
              color="inherit"
              onClick={() => navigate("sign-in")}
              sx={buttonStyles}
            >
              Sign In
            </Button>
            <Button
              size="small"
              variant="contained"
              color="inherit"
              onClick={() => navigate("sign-up")}
              sx={buttonStyles}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Toolbar>
      <Collapse
        in={store.isLoading}
        sx={{
          position: "fixed",
          width: "100%",
          top: {
            xs: "calc(56px - 4px)",
            sm: "calc(64px - 4px)",
          },
        }}
      >
        <LinearProgress color="inherit" />
      </Collapse>
      {/* MENU */}
      <Menu
        id="profile-menu"
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "profile-avatar-button",
        }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{ ...menuItemStyles, color: "error.main" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default AppHeader;
