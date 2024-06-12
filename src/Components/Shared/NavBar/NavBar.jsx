import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./NavBar.css";

function NavBar({ setLoggedIn }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  let permissions = [
    {
      route: "/dashboard",
      title: "Dashboard",
    },
    {
      route: "/graduate-repo",
      title: "Members",
    },
    {
      route: "/academic-repo",
      title: "Academic Repository",
    },
    {
      route: "/approvals-inbox",
      title: "Approve Requests",
    },
    {
      route: "/bestPractices",
      title: "Best Practices",
    }
  ];

  let settings = [
    {
      route: "/profile",
      title: "Profile",
    },
    {
      route: "/",
      title: "Logout",
    },
  ];

  if (localStorage.getItem("role")) {
    let role = JSON.parse(localStorage.getItem("role"));
    if (role.permissions.includes("uploadThesis")) {
      // at 1st index of settings put
      const uploadDocAllowed = {
        route: "/upload-document",
        title: "Upload Document",
      };
      settings.splice(1, 0, uploadDocAllowed);
    }
    if (role.permissions.includes("uploadResume")) {
      const uploadResumeAllowed = {
        route: "/upload-resume",
        title: "Upload Resume",
      };
      // Set it 2nd from the bottom
      settings.splice(settings.length - 1, 0, uploadResumeAllowed);
    }
    if (role.role === "admin" || role.role === "institution admin") {
      // TODO: discuss for admin
      const adminDocsInbox = {
        route: "/inbox",
        title: "My Documents",
      };
      // Set it 2nd from the bottom
      settings.splice(settings.length - 1, 0, adminDocsInbox);
    }
  }

  console.log("localStorage.getItem('role')", localStorage.getItem("role"));
  let currPermissions = JSON.parse(
    localStorage.getItem("role")
  )?.navPermissions;
  console.log("currPermissions", currPermissions);
  if (currPermissions) {
    permissions = currPermissions;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingNavigation = (route, title) => {
    if (title === "Logout") {
      localStorage.clear();
      setLoggedIn(false);
      navigate("/");
    } else {
      navigate(route);
    }
    handleCloseUserMenu();
  };

  const imageStyle = {
    maxWidth: "150px",
  };

  return (
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="logo" style={imageStyle} className="nav-logo"/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {permissions.map((permission, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    navigate(permission.route);
                  }}
                >
                  <Typography textAlign="center">{permission.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="logo" style={imageStyle} className="nav-logo"/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {permissions.map((permission, index) => (
              <Button
                key={index}
                onClick={() => {
                  navigate(permission.route);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {permission.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((settingpage, index) => (
                <MenuItem
                  key={index}
                  onClick={() =>
                    handleSettingNavigation(
                      settingpage.route,
                      settingpage.title
                    )
                  }
                >
                  <Typography textAlign="center">
                    {settingpage.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
