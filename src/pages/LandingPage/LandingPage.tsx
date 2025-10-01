import Box from "@mui/material/Box";
import FeaturedRooms from "./FeaturedRooms";
import TestimonialSlider from "../LandingPage/TestimonialSlider"; // Renamed for consistency
import { roomsData, hotelsData, adsData } from "../../data/imagesData";

export default function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // This will horizontally center all direct children
        gap: "4rem", // Adds vertical space between each component
        paddingY: "4rem", // Adds padding to the top and bottom of the page
        width: "100%", // Ensures the Box takes the full width
      }}
    >
      <FeaturedRooms rooms={roomsData} title="Houses with beauty backyard" />
      <FeaturedRooms rooms={hotelsData} title="Hotels with large living room" />
      <FeaturedRooms rooms={adsData} title="Ads" />
      <TestimonialSlider />
    </Box>
  );
}
