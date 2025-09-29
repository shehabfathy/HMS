import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Button,
  Avatar,
} from "@mui/material";
import type { HeaderProps } from "../../types/types";
import { ROUTES } from "../../service/Endpoint/Endpoint";

const Header = ({ isLoggedIn, onLogout }: HeaderProps) => {
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
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: 700, fontSize: "24px", color: "#B0B0B0" }} // Set default color for the rest of the word
        >
          <span style={{ color: "#152C5B" }}>Stay</span>cation.
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 3.5 }}>
          {/* Using ROUTES constant for Home/Landing Page */}
          <Link
            href={ROUTES.LANDING_PAGE} // ++ UPDATED ROUTE
            color="text.secondary"
            underline="none"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "primary.main" },
            }}
          >
            Home
          </Link>

          {/* NOTE: No route was provided for 'Explore'. Commenting out for now.
          <Link
            href="/explore" 
            color="text.secondary"
            underline="none"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "primary.main" },
            }}
          >
            Explore
          </Link>
          */}

          {/* NOTE: No route was provided for 'Favorites'. Commenting out for now.
          <Link
            href="/favorites"
            color="text.secondary"
            underline="none"
            sx={{
              fontWeight: 500,
              "&:hover": { color: "primary.main" },
            }}
          >
            Favorites
          </Link>
          */}

          {!isLoggedIn ? (
            <>
              <Avatar
                src="https://via.placeholder.com/40"
                sx={{ width: 40, height: 40, ml: 1 }}
              />
              <Button
                onClick={onLogout}
                sx={{
                  bgcolor: "#E0E7EB",
                  color: "text.primary",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#cdd6db" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Using ROUTES constants for Register and Login */}
              <Button
                href={ROUTES.REGISTER}
                variant="outlined"
                sx={{
                  width: 149, // ++ ADDED
                  height: 43, // ++ ADDED
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: "#3252DF",
                  color: "white",
                  borderColor: "#3252DF",
                  "&:hover": {
                    backgroundColor: "#254eda",
                    borderColor: "#254eda",
                  },
                  // Note: Padding is still applied inside the fixed dimensions
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
                  width: 149, // ++ ADDED
                  height: 43, // ++ ADDED
                  fontWeight: 600,
                  textTransform: "none",
                  backgroundColor: "#3252DF",
                  color: "white",
                  borderColor: "#3252DF",
                  "&:hover": {
                    backgroundColor: "#254eda",
                    borderColor: "#254eda",
                  },
                  // Note: Padding is still applied inside the fixed dimensions
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
