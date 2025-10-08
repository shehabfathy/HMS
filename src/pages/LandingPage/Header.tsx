import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  IconButton, // Import IconButton for the hamburger menu
  Drawer, // Import Drawer for the mobile menu
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import type { HeaderProps } from "../../types/types";
import { ROUTES } from "../../service/Endpoint/Endpoint";
import Logo from "../../assets/Staycation..png"; // path to your logo image

const Header = ({ isLoggedIn, onLogout }: HeaderProps) => {
  // State for the desktop avatar dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // State for the mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Toggles the mobile drawer open/closed
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // The content of the mobile drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Staycation
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href={ROUTES.LANDING_PAGE}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        {isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component="a" href={ROUTES.PROFILE}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component="a" href={ROUTES.REGISTER}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href={ROUTES.LOGIN}>
                <ListItemText primary="Login Now" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          fontFamily: "'Poppins', sans-serif",
          // Responsive padding
          padding: { xs: "0 16px", md: "0 60px" },
        }}
      >
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center">
            <img src={Logo} alt="Staycation Logo" style={{ height: 20 }} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation Links - Hidden on mobile */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3.5,
            }}
          >
            <Link
              href={ROUTES.LANDING_PAGE}
              color="text.secondary"
              underline="none"
              sx={{
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                {/* Avatar with dropdown menu */}
                <Avatar
                  src="https://via.placeholder.com/40"
                  sx={{ width: 40, height: 40, cursor: "pointer" }}
                  onClick={handleAvatarClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{ sx: { mt: 1.5 } }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={handleClose}
                    component="a"
                    href={ROUTES.PROFILE}
                  >
                    <Typography>Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      onLogout();
                    }}
                  >
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  href={ROUTES.REGISTER}
                  variant="outlined"
                  sx={{
                    width: 149,
                    height: 43,
                    fontWeight: 600,
                    textTransform: "none",
                    backgroundColor: "#3252DF",
                    color: "white",
                    borderColor: "#3252DF",
                    "&:hover": {
                      backgroundColor: "#254eda",
                      borderColor: "#254eda",
                    },
                    px: 3,
                    py: 2,
                  }}
                >
                  Register
                </Button>
                <Button
                  href={ROUTES.LOGIN}
                  variant="outlined"
                  sx={{
                    width: 149,
                    height: 43,
                    fontWeight: 600,
                    textTransform: "none",
                    backgroundColor: "#3252DF",
                    color: "white",
                    borderColor: "#3252DF",
                    "&:hover": {
                      backgroundColor: "#254eda",
                      borderColor: "#254eda",
                    },
                    px: 3,
                    py: 2,
                  }}
                >
                  Login Now
                </Button>
              </>
            )}
          </Box>

          {/* Hamburger Menu Icon - Hidden on desktop */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }} // Show only on screens smaller than md
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Component */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
