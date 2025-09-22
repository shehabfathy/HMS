import React from "react";
import { Outlet } from "react-router-dom";

// Import Material-UI components
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

// Import Material-UI icons for the sidebar
import {
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const drawerWidth = 240; // Define the width of the sidebar

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon /> },
  { text: "Bookings", icon: <BookIcon /> },
  { text: "Users", icon: <PersonIcon /> },
  { text: "Settings", icon: <SettingsIcon /> },
];

export default function MasterLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* CssBaseline is a collection of CSS resets */}
      <CssBaseline />

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above the Drawer
          bgcolor: "white",
          color: "text.primary",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Staycation Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Side Navigation Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
      >
        <Toolbar />{" "}
        {/* This empty Toolbar is a spacer to push content below the AppBar */}
        <Box sx={{ overflow: "auto", pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "grey.50",
          minHeight: "100vh",
        }}
      >
        <Toolbar /> {/* Spacer to push content below the AppBar */}
        {/* The Outlet will render the matched child route component */}
        <Outlet />
      </Box>
    </Box>
  );
}
