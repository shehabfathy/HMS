import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event"; // Calendar Icon
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"; // People Icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// You can replace this with your actual image import
import heroImage from "../../assets/picture.png";

const HeroSection = () => {
  const [capacity, setCapacity] = useState(2);

  const handleCapacityChange = (amount: number) => {
    setCapacity((prev) => Math.max(1, prev + amount)); // Prevent going below 1
  };

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: "2rem", md: "4rem" } }}>
      <Grid container spacing={6} alignItems="center">
        {/* Left Column: Text and Booking Form */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "bold", color: "#152C5B" }}
            >
              Forget Busy Work,
              <br />
              Start Next Vacation
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "400px" }}
            >
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moment.
            </Typography>

            {/* Booking Form */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                maxWidth: "500px",
              }}
            >
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{ width: "100%" }}
              >
                {/* Date Picker Section */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Start Booking
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <EventIcon sx={{ color: "text.secondary", mr: 1 }} />
                    <Typography color="text.secondary">
                      20 Jun - 22 Jun
                    </Typography>
                  </Box>
                </Box>

                {/* Capacity Section */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Capacity
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <PeopleOutlineIcon
                      sx={{ color: "text.secondary", mr: 1 }}
                    />
                    <IconButton
                      onClick={() => handleCapacityChange(-1)}
                      size="small"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography>{capacity} person</Typography>
                    <IconButton
                      onClick={() => handleCapacityChange(1)}
                      size="small"
                    >
                      <AddCircleOutlineIcon color="primary" />
                    </IconButton>
                  </Box>
                </Box>
              </Stack>
            </Paper>

            <Button
              variant="contained"
              size="large"
              sx={{
                width: 140,
                height: 48,
                backgroundColor: "#3252DF",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": { backgroundColor: "#254eda" },
              }}
            >
              Explore
            </Button>
          </Stack>
        </Grid>

        {/* Right Column: Image */}
        <Grid sx={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={heroImage} // Use the imported image
            alt="A modern glass cabin in a lush green setting"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: {
                xs: "20px", // Standard radius for small screens
                md: "20px 100px 20px 100px", // Custom radius for medium screens and up
              },
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
