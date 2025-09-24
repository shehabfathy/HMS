import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  FormHelperText,
} from "@mui/material";
import type { ReactNode } from "react";
import { forgetImg } from "../../../assets"; // same as your login page
import type { TUserForget } from "../../../types/types";
import toast from "react-hot-toast";

// Define a type for form data

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserForget>();

  const onSubmit = async (data: TUserForget) => {
    try {
      const url =
        "https://upskilling-egypt.com:3000/api/v0/admin/users/forgot-password";

      await axios.post(url, data);

      toast.success("✅ Reset link sent successfully!");
      navigate("/reset-password", { state: data.email });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError =
          error.response?.data?.message || "An API error occurred";
        toast.error(`❌ Failed: ${apiError}`);
      } else if (error instanceof Error) {
        toast.error(`❌ Failed: ${error.message}`);
      } else {
        toast.error("❌ Unexpected error. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
      flexDirection={{ xs: "column", md: "row" }}
    >
      {/* Left side - Form */}
      <Box width={{ xs: "100%", md: "50%" }} sx={{ p: 4, overflowY: "auto" }}>
        <Typography
          mb="10px"
          component="span"
          fontWeight="500"
          variant="body1"
          fontSize="26px"
          sx={{ color: "rgba(21, 44, 91, 1)" }}
        >
          Stay
          <Typography
            fontWeight="500"
            fontSize="26px"
            component="span"
            variant="body1"
            sx={{ color: "#000" }}
          >
            cation
          </Typography>
        </Typography>

        <Box
          component="form"
          p={5}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            component="h3"
            fontWeight={500}
            fontSize={"30px"}
            mb={"15px"}
          >
            Forgot Password
          </Typography>
          <Typography component="span">
            Enter your email and we’ll send you a reset link.
          </Typography>
          <Typography component="p" mb={"15px"}>
            Remembered it?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ textDecoration: "none", color: "red" }}
            >
              Login here!
            </Link>
          </Typography>

          {/* Email Field */}
          <Box mb={"30px"}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
              label="Email"
              type="email"
              placeholder="Please type here..."
              variant="filled"
              fullWidth
            />
            {errors.email && (
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {errors.email.message as ReactNode}
              </FormHelperText>
            )}
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ mb: "10px" }}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </Box>
      </Box>

      {/* Right side - Image */}
      <Box
        width={{ xs: "100%", md: "50%" }}
        sx={{
          position: { md: "sticky" },
          py: "10px",
          top: { md: 0 },
          height: { xs: "300px", md: "100vh" },
          flexShrink: 0,
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <img
          src={forgetImg}
          alt="forget password"
          style={{
            width: "80%",
            height: "100%",
            objectFit: "cover",
            margin: "auto",
          }}
        />
      </Box>
    </Box>
  );
};

export default ForgetPassword;
