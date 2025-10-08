import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// Removed useTheme as it's not used in this component
// import { useTheme } from "@mui/material/styles";

const reviews = [
  {
    title: "Happy Family",
    quote:
      "What a great trip with my family and I should try again next time soon ...",
    author: "Angga, Product Designer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    title: "Amazing Experience",
    quote:
      "The service was outstanding and the views were breathtaking. Highly recommended!",
    author: "Jane Doe, Traveler",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    title: "A Memorable Journey",
    quote:
      "Every detail was perfectly organized. I can't wait to book my next trip.",
    author: "John Smith, Adventurer",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
];

export default function TestimonialSlider() {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = reviews.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps); // Use modulo for looping
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    ); // Use modulo for looping
  };

  const review = reviews[activeStep];

  return (
    <Box sx={{ maxWidth: { xs: 345, md: 800 }, mx: "auto" }}>
      <Card
        sx={{
          display: "flex",
          // Responsive layout: column on mobile, row on desktop
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        {/* Left side / Top side: Image with overlay and buttons */}
        <Box
          sx={{
            position: "relative",
            // Responsive width: 100% on mobile, 300px on desktop
            width: { xs: "100%", md: 300 },
            // Responsive height: fixed height on mobile, auto on desktop
            height: { xs: 250, md: "auto" },
            flexShrink: 0,
            "&::after": {
              // Overlay pseudo-element
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            image={review.image}
            alt={review.title}
          />
          {/* Moved navigation buttons here to be on top of the image */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              display: "flex",
              gap: 1,
              zIndex: 1, // Above overlay
            }}
          >
            <IconButton
              onClick={handleBack}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Box>
        </Box>

        {/* Right side / Bottom side: Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
            // Responsive padding
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography component="div" variant="h5" fontWeight="bold">
            {review.title}
          </Typography>

          <Rating
            name="read-only"
            value={review.rating}
            readOnly
            sx={{ my: 2 }}
          />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontStyle: "italic" }}
          >
            "{review.quote}"
          </Typography>

          <Typography variant="subtitle1" color="text.primary">
            {review.author}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
