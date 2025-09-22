import { Link as RouterLink } from "react-router-dom";

// Import Material-UI components
import { Box, Typography, TextField, Button, Link } from "@mui/material";

// ForgetPassword Component
const ForgetPassword = () => {
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
          Forgot Password
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Enter your email address below, and we’ll send you a reset link.
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
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          placeholder="Enter your email"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
        >
          Send Reset Link
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
