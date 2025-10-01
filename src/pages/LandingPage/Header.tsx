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
} from "@mui/material";
import type { HeaderProps } from "../../types/types";
import { ROUTES } from "../../service/Endpoint/Endpoint";
import Logo from "../../assets/Staycation..png"; // path to your logo image

const Header = ({ isLoggedIn, onLogout }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        fontFamily: "'Poppins', sans-serif",
        padding: "0 60px",
      }}
    >
      <Toolbar disableGutters>
        <Box display="flex" alignItems="center">
          <img src={Logo} alt="Staycation Logo" style={{ height: 20 }} />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
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
                PaperProps={{
                  sx: { mt: 1.5 },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component="a"
                  href={ROUTES.PROFILE} // you'll need to define this route
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
