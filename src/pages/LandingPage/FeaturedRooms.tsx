import { Grid, Box, styled, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 1. Import hook for navigation
import type { FeaturedRoomsProps } from "../../interfaces/interfaces";

// Define the shape of the data for clarity (good practice in TypeScript)

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  ...theme.typography.body2,
  color: (theme.vars ?? theme).palette.text.secondary,
  borderRadius: "15px",
  overflow: "hidden",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  width: "263px",
  height: "249px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 10px 40px #ffffff",
}));

// The component now accepts props: 'title' and 'rooms'
const FeaturedRooms = ({ title, rooms }: FeaturedRoomsProps) => {
  const navigate = useNavigate(); // 2. Initialize navigate function

  return (
    <Box sx={{ width: "100%", mt: 1, mb: 1, px: { xs: 2, md: 10 } }}>
      {/* Container to hold the title and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // I moved the margins from the Typography component to this container
          // to maintain the original spacing.
          mb: 4,
          mx: 10,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            // Spacing (mb, mx) is now handled by the parent Box
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#152C5B",
          }}
        >
          {title}
        </Typography>

        {/* 3. The new explore button */}
        <Button onClick={() => navigate("/explore")}>Explore</Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* 2. Now mapping over the 'rooms' array from props */}
        {rooms.map((room) => (
          <Grid key={room.id}>
            <Item>
              <img
                src={room.img}
                alt={room.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ p: 2, textAlign: "center", flexGrow: 1 }}>
                <Typography variant="h6" component="h3">
                  {room.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {room.desc}
                </Typography>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedRooms;
