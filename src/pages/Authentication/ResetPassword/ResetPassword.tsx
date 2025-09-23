import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import type { ReactNode } from "react";

// Define a type for our form data for better type safety
interface IFormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Use React Hook Form to manage form state and validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormData>();

  // Watch the password field to compare for confirmation
  const password = watch("password");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Define the function that will be called on form submission
  const onSubmit = async (data: IFormData) => {
    try {
      // API endpoint URL
      const url =
        "https://upskilling-egypt.com:3000/api/v0/admin/users/reset-password";

      // Make the API POST request with Axios
      const response = await axios.post(url, data);

      // Log the successful response and show a success message
      console.log("Success:", response.data);
      alert("Password has been reset successfully!");

      // Reset the form and navigate to login
      reset();
      navigate("/login");
    } catch (error) {
      // Type-safe error handling
      if (axios.isAxiosError(error)) {
        const apiError =
          error.response?.data?.message || "An API error occurred";
        console.error("API Error:", apiError);
        alert(`Failed to reset password: ${apiError}`);
      } else if (error instanceof Error) {
        console.error("Generic Error:", error.message);
        alert(`Failed to reset password: ${error.message}`);
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
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

      <Box
        component="form"
        sx={{ mt: 3, width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          margin="normal"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message as ReactNode}
        />
        <TextField
          fullWidth
          id="otp"
          label="OTP"
          variant="outlined"
          margin="normal"
          placeholder="Enter the OTP from your email"
          {...register("seed", { required: "OTP is required" })}
          error={!!errors.seed}
          helperText={errors.seed?.message as ReactNode}
        />
        <TextField
          fullWidth
          id="password"
          label="New Password"
          type={passwordVisible ? "text" : "password"}
          variant="outlined"
          margin="normal"
          placeholder="Enter new password"
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
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message as ReactNode}
        />
        <TextField
          fullWidth
          id="confirm-password"
          label="Confirm New Password"
          type={confirmPasswordVisible ? "text" : "password"}
          variant="outlined"
          margin="normal"
          placeholder="Confirm new password"
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
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message as ReactNode}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
