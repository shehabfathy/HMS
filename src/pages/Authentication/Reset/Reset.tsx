import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// Import Material-UI components
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";

// Import Material-UI icons
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Staycation.
      </Typography>

      <Box sx={{ mt: 4, width: "100%" }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
          Reset Password
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Enter your new password details below.
        </Typography>
        <Typography color="text.secondary">
          Remembered it?{" "}
          <Link
            component={RouterLink}
            to="/login"
            color="error"
            sx={{ fontWeight: "semibold" }}
          >
            Login here!
          </Link>
        </Typography>
      </Box>

      <Box component="form" sx={{ mt: 3, width: "100%" }}>
        <TextField
          fullWidth
          id="otp"
          label="OTP"
          variant="outlined"
          margin="normal"
          placeholder="Please type here"
        />

        <TextField
          fullWidth
          id="password"
          label="Password"
          type={passwordVisible ? "text" : "password"}
          variant="outlined"
          margin="normal"
          placeholder="Please type here"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          id="confirm-password"
          label="Confirm Password"
          type={confirmPasswordVisible ? "text" : "password"}
          variant="outlined"
          margin="normal"
          placeholder="Please type here"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                >
                  {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
