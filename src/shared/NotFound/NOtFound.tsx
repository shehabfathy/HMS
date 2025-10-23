import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#f8f9fa",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "5rem", md: "8rem" },
          fontWeight: 700,
          color: "#1976d2",
          mb: 0,
        }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ color: "#555", mb: 2, fontWeight: 500 }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#777",
          mb: 4,
          maxWidth: 400,
        }}
      >
        It looks like nothing was found at this location. Maybe try going back
        to the homepage?
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "capitalize",
          px: 4,
          py: 1.2,
          borderRadius: "30px",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
          "&:hover": { boxShadow: "0 6px 12px rgba(25, 118, 210, 0.4)" },
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
}
