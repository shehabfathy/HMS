import { useState } from "react";
import type { FormEvent } from "react";
import {
  Rating,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import axios, { AxiosError } from "axios"; // Assuming you use axios for typing
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import CookieService from "../../../service/Cookies/Cookies";

// --- End Mocking ---

// Props interface for our component
interface ReviewsAndCommentsProps {
  roomId: string; // The ID of the room to review/comment on
}

const ReviewsAndComments = ({ roomId }: ReviewsAndCommentsProps) => {
  const location = useLocation();
  const roomID = location.pathname.slice(12);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(roomId, ratingValue, reviewMessage); // Use dynamic roomId
      await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/room-reviews",
        {
          roomId: roomID, // Use dynamic roomId
          rating: ratingValue,
          review: reviewMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );

      toast.success("Review submitted successfully!");
      setRatingValue(0);
      setReviewMessage("");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to submit review.");
    }
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(roomID, comment);
      await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/room-comments",
        {
          roomId: roomID, // Use dynamic roomId
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      toast.success("Comment submitted successfully!");
      setComment("");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to submit comment.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 2,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Review Submission Form */}
      <Paper
        elevation={3}
        sx={{ p: 3, width: { xs: "100%", md: 400 }, borderRadius: 2 }}
      >
        <form onSubmit={handleReviewSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2" gutterBottom>
              Leave a Review
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography component="legend">Your Rating</Typography>
              <Rating
                name="room-rating"
                value={ratingValue}
                onChange={(_, newValue) => {
                  setRatingValue(newValue || 0);
                }}
                size="large"
              />
            </Box>
            <TextField
              label="Review Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              placeholder="How was your stay? What did you like or dislike?"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
            >
              Submit Review
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Comment Submission Form */}
      <Paper
        elevation={3}
        sx={{ p: 3, width: { xs: "100%", md: 400 }, borderRadius: 2 }}
      >
        <form onSubmit={handleCommentSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2" gutterBottom>
              Add a Comment
            </Typography>
            <TextField
              label="Your Comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Have a question or something to share?"
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 1 }}
            >
              Post Comment
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

// Main App component to render our ReviewsAndComments component
export default function App() {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <ReviewsAndComments roomId="room-123-abc" />
    </Box>
  );
}
