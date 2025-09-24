import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import type { TResetUser } from "../../../types/types";
import { resetImg } from "../../../assets";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TResetUser>();

  const password = watch("password");

  const onSubmit = async (data: TResetUser) => {
    try {
      const url =
        "https://upskilling-egypt.com:3000/api/v0/admin/users/reset-password";

      await axios.post(url, data);

      toast.success("✅ Password has been reset successfully!", {
        duration: 3000,
      });
      reset();
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError =
          error.response?.data?.message || "An API error occurred";
        toast.error(apiError);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
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
      {/* Left Side - Form */}
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
          <Typography component="h3" fontWeight={500} fontSize="30px" mb="15px">
            Reset Password
          </Typography>
          <Typography component="span">
            Enter your new password details below.
          </Typography>
          <Typography component="p" mb="15px">
            Remembered it?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ textDecoration: "none", color: "red" }}
            >
              Login here!
            </Link>
          </Typography>

          {/* Email */}
          <Box mb="20px">
            <TextField
              {...register("email")}
              id="email"
              label="Email"
              type="email"
              value={state}
              placeholder="Please type here..."
              variant="filled"
              fullWidth
              aria-readonly
            />
          </Box>

          {/* OTP */}
          <Box mb="20px">
            <TextField
              {...register("seed", { required: "OTP is required" })}
              id="otp"
              label="OTP"
              placeholder="Enter the OTP from your email"
              variant="filled"
              fullWidth
            />
            {errors.seed && (
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {errors.seed.message as ReactNode}
              </FormHelperText>
            )}
          </Box>

          {/* New Password */}
          <Box mb="20px">
            <TextField
              {...register("password", { required: "Password is required" })}
              id="password"
              label="New Password"
              autoComplete="new-password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter new password"
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      edge="end"
                    >
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {errors.password.message as ReactNode}
              </FormHelperText>
            )}
          </Box>

          {/* Confirm Password */}
          <Box mb="30px">
            <TextField
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
              id="confirm-password"
              label="Confirm Password"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm new password"
              variant="filled"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      edge="end"
                    >
                      {confirmPasswordVisible ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && (
              <FormHelperText sx={{ color: "red", fontSize: "13px" }}>
                {errors.confirmPassword.message as ReactNode}
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
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Box>

      {/* Right Side - Image */}
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
          src={resetImg}
          alt="reset password"
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

export default ResetPassword;
