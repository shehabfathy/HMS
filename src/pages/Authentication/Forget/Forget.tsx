import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// Import Material-UI components
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import type { ReactNode } from "react";

// Define a type for our form data for better type safety
interface IFormData {
  email: string;
}

// ForgetPassword Component
const ForgetPassword = () => {
  // Use React Hook Form to manage form state and validation, now with our IFormData type
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormData>();

  // Define the function that will be called on form submission
  const onSubmit = async (data: IFormData) => {
    try {
      // API endpoint URL
      const url =
        "https://upskilling-egypt.com:3000/api/v0/admin/users/forgot-password"; // Assuming this is the correct endpoint for password reset

      // Make the API POST request with Axios
      const response = await axios.post(url, data);

      // Log the successful response
      console.log("Success:", response.data);
      alert("Reset link sent successfully!");

      // Reset the form after successful submission
      reset();
    } catch (error) {
      // FIX 1: Type-safe error handling.
      // We check if the error is an AxiosError first to safely access response data.
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows 'error' is an AxiosError
        const apiError =
          error.response?.data?.message || "An API error occurred";
        console.error("API Error:", apiError);
        alert(`Failed to send reset link: ${apiError}`);
      } else if (error instanceof Error) {
        // Handle other standard JavaScript errors
        console.error("Generic Error:", error.message);
        alert(`Failed to send reset link: ${error.message}`);
      } else {
        // Handle cases where the thrown value is not an error object
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

      <Box
        component="form"
        sx={{ mt: 3, width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
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
          // FIX 2: Ensure the helperText is a valid ReactNode (string).
          // We explicitly convert the message to a string to satisfy TypeScript.
          helperText={errors.email?.message as ReactNode}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          disabled={isSubmitting} // Disable the button while the form is submitting
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
