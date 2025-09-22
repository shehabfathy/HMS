import Box from "@mui/material/Box";
import { registImg } from "../../../assets";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import {
  COUNTRY_VALIDATION,
  Email_validation,
  PASSWORD_VALIDATION,
  PHONENUMBER_VALIDATION,
  USERNAME_VALIDATION,
} from "../../../utils/Validation/Validation";
import Link from "@mui/material/Link";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (value) => {
    try {
      const data = new FormData();
      data.append("userName", value.userName);
      data.append("email", value.email);
      data.append("country", value.country);
      data.append("phoneNumber", value.phoneNumber);
      data.append("role", value.role);
      data.append("password", value.password);
      data.append("confirmPassword", value.confirmPassword);
      if (value.profileImage && value.profileImage[0]) {
        data.append("profileImage", value.profileImage[0]);
      }

      await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/users`,
        data
      );
      toast.success("✅ Registered Successfully!", { duration: 3000 });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "15px",
          height: "100vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box display="inline" width={{ xs: "100%", md: "50%" }}>
          <Typography
            mb="10px"
            component="span"
            fontWeight="500"
            variant="body1"
            fontSize="26px"
            sx={{ color: "rgba(21, 44, 91, 1)" }}
          >
            Stay{" "}
            <Typography
              fontWeight="500"
              fontSize="26px"
              component="span"
              variant="body1"
              style={{ color: "#000" }}
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
              Sign up
            </Typography>
            <Typography component="span">
              If you already have an account register
            </Typography>
            <Typography component="p" mb={"15px"}>
              You can{" "}
              <Link href="#" sx={{ textDecoration: "none", color: "red" }}>
                Login here !
              </Link>
            </Typography>

            <Box mb={"15px"} textAlign={"center"}>
              <InputLabel htmlFor="profileImage">
                Upload Profile Image
              </InputLabel>

              {/* Hidden input */}
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                {...register("profileImage")}
              />

              {/* Styled button as trigger */}
              <label htmlFor="profileImage">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ mt: 1, borderRadius: "8px", textTransform: "none" }}
                >
                  Choose File
                </Button>
              </label>

              {/* Show file name after selection */}
              {watch("profileImage") && watch("profileImage")[0] && (
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{ color: "gray", fontStyle: "italic" }}
                >
                  📂 {watch("profileImage")[0].name}
                </Typography>
              )}
            </Box>

            <Box mb={"15px"}>
              <InputLabel htmlFor="my-Userinput">User Name</InputLabel>
              <TextField
                id="my-Userinput"
                placeholder="Please type here ..."
                variant="filled"
                {...register("userName", USERNAME_VALIDATION)}
                fullWidth
              />
              {errors.userName ? (
                <FormHelperText
                  id="component-error-text"
                  sx={{ color: "red", fontSize: "13px" }}
                >
                  {errors.userName.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </Box>

            <Box mb={"15px"} display={"flex"} gap={2} flexWrap={"wrap"}>
              <Box width={{ md: "48%", xs: "100%" }}>
                <InputLabel htmlFor="my-Phoneinput">Phone Number </InputLabel>
                <TextField
                  id="my-Phoneinput"
                  {...register("phoneNumber", PHONENUMBER_VALIDATION)}
                  placeholder="Please type here ..."
                  variant="filled"
                  sx={{ width: "100%" }}
                />
                {errors.phoneNumber ? (
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red", fontSize: "13px" }}
                  >
                    {errors.phoneNumber.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Box>

              <Box sx={{ flex: 1, minWidth: "48%" }}>
                <InputLabel htmlFor="my-countryinput">Country</InputLabel>
                <TextField
                  {...register("country", COUNTRY_VALIDATION)}
                  id="my-countryinput"
                  placeholder="Please type here ..."
                  variant="filled"
                  sx={{ width: "100%" }}
                />
                {errors.country ? (
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red", fontSize: "13px" }}
                  >
                    {errors.country.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <Box
              mb={"15px"}
              display={"flex"}
              gap={2}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Box sx={{ flex: 1, minWidth: "48%" }}>
                <InputLabel htmlFor="my-mailinput">Email address</InputLabel>
                <TextField
                  {...register("email", Email_validation)}
                  id="my-mailinput"
                  placeholder="Please type here ..."
                  variant="filled"
                  fullWidth
                  sx={{ width: "100%" }}
                />
                {errors.email ? (
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red", fontSize: "13px" }}
                  >
                    {errors.email.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Box>
              <Box sx={{ flex: 1, minWidth: "48%" }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    {...register("role", {
                      required: "you should select role",
                    })}
                    id="demo-simple-select"
                    defaultValue=""
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value={"user"}>user</MenuItem>
                    <MenuItem value={"admin"}>admin</MenuItem>
                  </Select>
                </FormControl>
                {errors.role ? (
                  <FormHelperText
                    id="component-error-text"
                    sx={{ color: "red", fontSize: "13px" }}
                  >
                    {errors.role.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <Box mb={"15px"}>
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FormControl sx={{ width: "100%" }} variant="filled">
                <FilledInput
                  {...register("password", PASSWORD_VALIDATION)}
                  autoComplete="new-password"
                  placeholder="Please type here ..."
                  fullWidth
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.password ? (
                <FormHelperText
                  id="component-error-text"
                  sx={{ color: "red", fontSize: "13px" }}
                >
                  {errors.password.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </Box>
            <Box mb={"15px"}>
              <InputLabel htmlFor="filled-adornment-confirmpassword">
                Confirm Password
              </InputLabel>
              <FormControl sx={{ width: "100%" }} variant="filled">
                <FilledInput
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Password not match",
                  })}
                  fullWidth
                  placeholder="Please type here ..."
                  id="filled-adornment-confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.confirmPassword ? (
                <FormHelperText
                  id="component-error-text"
                  sx={{ color: "red", fontSize: "13px" }}
                >
                  {errors.confirmPassword.message}
                </FormHelperText>
              ) : (
                ""
              )}
            </Box>
            <Button
              loading={isSubmitting}
              loadingPosition="start"
              fullWidth
              type="submit"
              variant="contained"
            >
              Sign up
            </Button>
          </Box>
        </Box>

        <Box
          textAlign={{ md: "right", xs: "center" }}
          borderRadius={15}
          width={{ md: "50%", xs: "100%" }}
        >
          <img
            className="registImg"
            style={{ width: "90% ", height: "100%", objectFit: "cover" }}
            src={registImg}
            alt="registImg"
          />
        </Box>
      </Box>
    </>
  );
}
