import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CookieService from "../../service/Cookies/Cookies"; // Adjust path as needed
import { ROUTES } from "../../service/Endpoint/Endpoint";
// Import Material-UI components & utilities
import {
  AppBar as MuiAppBar,
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Import Material-UI icons for the sidebar and navbar
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Book as BookIcon,
  People as PeopleIcon, // Using 'People' for 'Users' for clarity
  Logout as LogoutIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Bed as BedIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

// Navigation items for the sidebar
const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "" },
  { text: "Bookings", icon: <BookIcon />, path: ROUTES.Booking },
  { text: "Users", icon: <PeopleIcon />, path: ROUTES.Users },
  { text: "Rooms", icon: <BedIcon />, path: ROUTES.Rooms_List },
];

// --- Styled Components for Smooth Transitions ---

// This custom AppBar will resize itself when the drawer opens or closes
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// This custom Drawer provides the open/close animations
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#1F263E", // Custom sidebar color
    color: "white", // Text color for the sidebar
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // Collapsed width on desktop
      width: theme.spacing(7),
      // On smaller screens, it should be fully hidden
      [theme.breakpoints.down("sm")]: {
        width: 0,
      },
    }),
  },
}));

// --- Main Layout Component ---

export default function MasterLayout() {
  const [open, setOpen] = useState(true); // State to control drawer visibility
  const [anchorElUser, setAnchorElUser] = useState(null); // State for profile menu
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    CookieService.remove("token"); // Remove the auth token
    navigate("/login"); // Redirect to login page
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navigation Bar */}
      <AppBar
        position="absolute"
        open={open}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Staycation Admin
          </Typography>

          {/* User Profile Section */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <ListItemIcon>
                <AccountCircleOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Left Side Navigation Drawer */}
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <List component="nav">
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path.slice(1))}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar /> {/* Spacer to push content below the AppBar */}
        <Box>
          {/* The Outlet will render the matched child route component */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
