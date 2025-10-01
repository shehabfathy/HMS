import { Grid, Box, styled, Paper, Typography } from "@mui/material";
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
  return (
    <Box sx={{ width: "100%", mt: 1, mb: 1, px: { xs: 2, md: 10 } }}>
      {/* 1. Title added to the top left */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4, // Kept the bottom margin
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#152C5B",
          mx: 10,
        }}
      >
        {title}
      </Typography>

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
