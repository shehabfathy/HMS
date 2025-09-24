import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CookieService from "../../../service/Cookies/Cookies";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import React, { useContext } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Email_validation,
  PASSWORD_VALIDATION,
} from "../../../utils/Validation/Validation";
import Link from "@mui/material/Link";
import toast from "react-hot-toast";
import { loginImg } from "../../../assets";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { TUserLogin } from "../../../types/types";
import { AuthContext } from "../../../context/AuthContext";
export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { getUser } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
  } = useForm<TUserLogin>();

  const onSubmit = async (value: TUserLogin) => {
    try {
      const { data } = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/users/login`,
        value
      );

      // 1. Get the token which is "Bearer ey..."
      const fullToken = data.data.token;

      // 2. Split the string by the space and take the second part (the actual token)
      const rawToken = fullToken.split(" ")[1];

      // 3. Save only the raw token to the cookie with the root path
      CookieService.set("token", rawToken, { path: "/" });
      getUser();
      navigate("/dashboard");
      toast.success("✅ Welcome Dear!", { duration: 3000 });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          // both sides stretch equally
          minHeight: "100vh",
        }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          display="inline"
          width={{ xs: "100%", md: "50%" }}
          sx={{
            p: 4,
            overflowY: "auto",
          }}
        >
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
              <Link
                href="/register"
                sx={{ textDecoration: "none", color: "red" }}
              >
                Register here !
              </Link>
            </Typography>
            <Box mb={"30px"}>
              <InputLabel
                htmlFor="my-mailinput"
                sx={{ color: "rgba(21, 44, 91, 1)" }}
              >
                Email address
              </InputLabel>
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
            <Box mb={"30px"}>
              <InputLabel
                sx={{ color: "rgba(21, 44, 91, 1)" }}
                htmlFor="filled-adornment-password"
              >
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
            <Button
              sx={{ mb: "10px" }}
              loading={isSubmitting}
              loadingPosition="start"
              fullWidth
              type="submit"
              variant="contained"
            >
              Login
            </Button>
            <Box textAlign={"right"}>
              <Link
                href="/forget-password"
                sx={{ textDecoration: "none", color: "#000" }}
              >
                Forget Password ?
              </Link>
            </Box>
          </Box>
        </Box>

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
            src={loginImg}
            alt="login"
            style={{
              width: "80%",
              height: "100%",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </Box>
      </Box>
    </>
  );
}
