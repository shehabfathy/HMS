import { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const context = useContext(AuthContext);

  // 🔒 If context isn’t ready (e.g. before token is loaded)
  if (!context || !context.loginData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography variant="h6" color="text.secondary">
          Loading profile...
        </Typography>
      </Box>
    );
  }

  const { loginData } = context;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Profile
      </Typography>

      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 80,
                height: 80,
                fontSize: 36,
              }}
            >
              {loginData.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Typography variant="h6">{loginData.name}</Typography>
            <Typography color="text.secondary">{loginData.email}</Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: "grey.50",
            }}
          >
            <Typography variant="body1">
              <strong>User ID:</strong> {loginData.id}
            </Typography>
            {loginData.role && (
              <Typography variant="body1">
                <strong>Role:</strong> {loginData.role}
              </Typography>
            )}
            {loginData.createdAt && (
              <Typography variant="body1">
                <strong>Joined:</strong>{" "}
                {new Date(loginData.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
