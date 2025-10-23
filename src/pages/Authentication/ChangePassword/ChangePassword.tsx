import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import CookieService from "../../../service/Cookies/Cookies";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = CookieService.get("token");
  const API_URL =
    "https://upskilling-egypt.com:3000/api/v0/admin/users/change-password";

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        API_URL,
        { oldPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} maxWidth={500} mx="auto">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Change Password
      </Typography>

      <TextField
        label="Old Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <TextField
        label="New Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Box textAlign="right">
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleSubmit}
        >
          Change Password
        </LoadingButton>
      </Box>
    </Box>
  );
}
