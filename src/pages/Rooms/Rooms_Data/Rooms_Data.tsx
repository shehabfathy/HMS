import React, {
  useState,
  FC,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
} from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  Button,
  TextField,
  Rating,
  Avatar,
  Divider,
} from "@mui/material";
import {
  KingBedOutlined,
  ChairOutlined,
  BathtubOutlined,
  RestaurantOutlined,
  WifiOutlined,
  AcUnitOutlined,
  KitchenOutlined,
  TvOutlined,
  Event as EventIcon,
} from "@mui/icons-material";
import axios from "axios";
import Cookies from "universal-cookie"; // Added dependency

// --- API and Cookie Service Configuration (Integrated) ---

const cookie = new Cookies();

class CookieService {
  get(name: string) {
    return cookie.get(name);
  }

  set(name: string, value: string, options?: object) {
    return cookie.set(name, value, options);
  }

  remove(name: string, options?: object) {
    return cookie.remove(name, options);
  }
}

const cookieService = new CookieService();

const api = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0",
});

api.interceptors.request.use(
  (config) => {
    const token = cookieService.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- TYPE DEFINITIONS ---
interface AmenityData {
  icon: React.ReactElement;
  label: string;
}

interface Room {
  id: string;
  name: string;
  location: string;
  description: string[];
  price: number;
  discount: string;
  amenities: AmenityData[];
  images: string[];
}

// --- MOCK DATA ---
const roomData: Room = {
  id: "6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d", // Example UUID
  name: "Village Angga",
  location: "Bogor, Indonesia",
  description: [
    "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
    "Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.",
    "Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.",
  ],
  price: 280,
  discount: "20% OFF",
  amenities: [
    { icon: <KingBedOutlined />, label: "1 bedroom" },
    { icon: <ChairOutlined />, label: "1 living room" },
    { icon: <BathtubOutlined />, label: "1 bathroom" },
    { icon: <RestaurantOutlined />, label: "1 dining room" },
    { icon: <WifiOutlined />, label: "10 mbp/s" },
    { icon: <AcUnitOutlined />, label: "7 unit ready" },
    { icon: <KitchenOutlined />, label: "2 refrigerator" },
    { icon: <TvOutlined />, label: "4 television" },
  ],
  images: [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
  ],
};

const Amenity: FC<AmenityData> = ({ icon, label }) => (
  <Grid
    item
    xs={6}
    sm={3}
    sx={{
      display: "flex",
      alignItems: "center",
      color: "text.secondary",
      mb: 2,
    }}
  >
    {icon}
    <Typography variant="body2" sx={{ ml: 1.5 }}>
      {label}
    </Typography>
  </Grid>
);

const RoomDetail: FC = () => {
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/portal/room-reviews", {
        roomId: roomData.id,
        rating: ratingValue,
        review: reviewMessage,
      });
      console.log("Review submitted successfully:", response.data);
      alert("Review submitted successfully!");
      setRatingValue(0);
      setReviewMessage("");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review. See console for details.");
    }
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/portal/room-comments", {
        roomId: roomData.id,
        comment: comment,
      });
      console.log("Comment submitted successfully:", response.data);
      alert("Comment submitted successfully!");
      setComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("Failed to submit comment. See console for details.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#FFFFFF", pb: 5 }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "#F7F9FC", py: 5 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Room Details</Typography>
        </Breadcrumbs>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {roomData.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {roomData.location}
          </Typography>
        </Box>

        <Grid container spacing={1} sx={{ mb: 5 }}>
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src={roomData.images[0]}
              alt="Main room view"
              sx={{
                width: "100%",
                height: "410px",
                objectFit: "cover",
                borderRadius: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} container direction="column" spacing={1}>
            <Grid item xs>
              <Box
                component="img"
                src={roomData.images[1]}
                alt="Room detail 1"
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            </Grid>
            <Grid item xs>
              <Box
                component="img"
                src={roomData.images[2]}
                alt="Room detail 2"
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: 3,
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Box>
              {roomData.description.map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  color="text.secondary"
                  paragraph
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Grid container sx={{ mt: 4, mb: 5 }}>
              {roomData.amenities.map((amenity, index) => (
                <Amenity
                  key={index}
                  icon={amenity.icon}
                  label={amenity.label}
                />
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 3, position: "sticky", top: 20 }}
            >
              <Typography
                variant="h6"
                component="h3"
                fontWeight="bold"
                gutterBottom
              >
                Start Booking
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", my: 2 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  ${roomData.price}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  per night
                </Typography>
              </Box>
              <Typography variant="body2" color="green" sx={{ mb: 3 }}>
                {roomData.discount}
              </Typography>

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                Pick a Date
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue="20 Jan - 22 Jan"
                InputProps={{
                  startAdornment: <EventIcon color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Continue Book
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 2 }}
              >
                You will pay ${roomData.price * 0.8} USD per 2 Person
              </Typography>
            </Paper>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                position: "fixed",
                bottom: 40,
                right: 40,
                width: 60,
                height: 60,
              }}
            >
              <EventIcon />
            </Avatar>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Divider sx={{ mb: 6 }} />
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Box component="form" onSubmit={handleReviewSubmit}>
              <Typography variant="h6" gutterBottom>
                Rate
              </Typography>
              <Rating
                name="room-rating"
                value={ratingValue}
                onChange={(event: SyntheticEvent, newValue: number | null) => {
                  setRatingValue(newValue);
                }}
                size="large"
              />
              <TextField
                multiline
                rows={4}
                variant="outlined"
                placeholder="Message"
                fullWidth
                value={reviewMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setReviewMessage(e.target.value)
                }
                sx={{ mt: 2, mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Rate
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box component="form" onSubmit={handleCommentSubmit}>
              <Typography variant="h6" gutterBottom>
                Add Your Comment
              </Typography>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                placeholder="Comment"
                fullWidth
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
                sx={{ mb: 2, mt: "3.5rem" }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomDetail;
