import React, { useState } from "react";
import "./NavBar.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NavBar({setLoggedIn }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  let permissions = [
    {
      route: "/dashboard",
      title: "Dashboard",
    },
    {
      route: "/upload-document",
      title: "Upload Document",
    },
    {
      route: "/graduate-repo",
      title: "Graduate Repository",
    },
    {
      route: "/academic-repo",
      title: "Academic Repository",
    },
    {
      route: "/approvals-inbox",
      title: "Inbox",
    },
  ];

  console.log("localStorage.getItem('role')", localStorage.getItem("role"));
  let currPermissions = JSON.parse(localStorage.getItem("role"))?.navPermissions;
  console.log("currPermissions", currPermissions);
  if (currPermissions) {
    permissions = currPermissions;
  }



  const handleLogout = () => {
    console.log("Logging out");
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="navContainer">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          {permissions.map((permission, index) => (
            <Tab
              label={permission.title}
              {...a11yProps(index)}
              key={index}
              onClick={() => {
                navigate(permission.route);
              }}
            />
          ))}
        </Tabs>
      </Box>
      {permissions.map((permission, index) => (
        <CustomTabPanel
          value={value}
          index={index}
          key={index}
          onClick={() => {
            navigate(permission.route);
          }}
        ></CustomTabPanel>
      ))}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default NavBar;
