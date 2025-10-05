import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = reviews.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 800, position: "relative" }}>
      <Card
        sx={{
          display: "flex",
          borderRadius: 4,
          boxShadow: 3,
          position: "relative", // Needed for positioning overlay and buttons
          overflow: "hidden", // Ensures overlay and buttons don't spill
        }}
      >
        {/* Left side: Image with pseudo-element overlay */}
        <Box
          sx={{
            position: "relative",
            width: 300,
            flexShrink: 0, // Prevent image box from shrinking
            "&::after": {
              // Pseudo-element for the overlay effect
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "inherit", // Inherit border radius from parent Card
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white overlay
              borderTopRightRadius: 0, // Ensure it doesn't apply to the right edge of the image
              borderBottomRightRadius: 0,
              zIndex: 1, // Above the image but below the buttons
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%", // Make image fill its container
              objectFit: "cover",
              borderRadius: "inherit", // Inherit border radius from parent Card
              borderTopRightRadius: 0, // Ensure it doesn't apply to the right edge of the image
              borderBottomRightRadius: 0,
              position: "relative", // Needed for z-index to work against the overlay
              zIndex: 0,
            }}
            image={reviews[activeStep].image}
            alt={reviews[activeStep].title}
          />
        </Box>

        {/* Right side: Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            justifyContent: "center", // Vertically center content
            flexGrow: 1, // Allow content to take available space
          }}
        >
          <Typography component="div" variant="h5" fontWeight="bold">
            {reviews[activeStep].title}
          </Typography>

          <Rating
            name="read-only"
            value={reviews[activeStep].rating}
            readOnly
            sx={{ my: 2 }}
          />

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            "{reviews[activeStep].quote}"
          </Typography>

          <Typography variant="subtitle1" color="text.primary">
            {reviews[activeStep].author}
          </Typography>
        </Box>

        {/* Custom navigation buttons INSIDE the Card */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            display: "flex",
            gap: 2,
            zIndex: 2, // Ensure buttons are above the image and overlay
          }}
        >
          <IconButton
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
              "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "rgba(0, 0, 0, 0.26)",
              },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
              "&:disabled": {
                bgcolor: "action.disabledBackground",
                color: "rgba(0, 0, 0, 0.26)",
              },
            }}
          >
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}
