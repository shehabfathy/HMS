import React, {
  useState,
  FC,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect, // 1. Import useEffect
} from "react";
import { useParams, Link as RouterLink } from "react-router-dom"; // 2. Import hooks for dynamic routing
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
import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";

// --- API and Cookie Service Configuration (remains the same) ---
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

// --- UPDATED TYPE DEFINITIONS ---
// This interface should match the structure of the room object from your API
interface RoomDetails {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: {
    _id: string;
    name: string;
  }[];
  images: string[];
  // You can add other properties like description if your API provides them
}

// Helper to map facility names from API to MUI icons
const amenityIconMap: { [key: string]: React.ReactElement } = {
  "king bed": <KingBedOutlined />,
  chair: <ChairOutlined />,
  bathtub: <BathtubOutlined />,
  restaurant: <RestaurantOutlined />,
  wifi: <WifiOutlined />,
  "ac unit": <AcUnitOutlined />,
  kitchen: <KitchenOutlined />,
  tv: <TvOutlined />,
};

const Amenity: FC<{ icon: React.ReactElement; label: string }> = ({
  icon,
  label,
}) => (
  <Grid
    item
    xs={6}
    sm={4} // Adjusted for better spacing
    md={3}
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
  const { roomId } = useParams<{ roomId: string }>(); // 3. Get the room ID from the URL

  // --- STATE MANAGEMENT ---
  const [roomData, setRoomData] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // 4. Fetch room data from the API when the component loads
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await api.get(`/portal/rooms/${roomId}`);
        setRoomData(response.data.data.room);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(
          err.response?.data.message || "Failed to fetch room details."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRoomDetails();
  }, [roomId]); // The effect re-runs if the roomId changes

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("/portal/room-reviews", {
        roomId: roomId, // Use dynamic roomId
        rating: ratingValue,
        review: reviewMessage,
      });
      toast.success("Review submitted successfully!");
      setRatingValue(0);
      setReviewMessage("");
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("/portal/room-comments", {
        roomId: roomId, // Use dynamic roomId
        comment: comment,
      });
      toast.success("Comment submitted successfully!");
      setComment("");
    } catch (error) {
      toast.error("Failed to submit comment.");
    }
  };

  // 5. Conditional Rendering for loading and no-data states
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <DotLoader color="#3252DF" />
      </Box>
    );
  }

  if (!roomData) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h5">Room Not Found</Typography>
        <Typography color="text.secondary">
          The room you are looking for does not exist or may have been removed.
        </Typography>
      </Container>
    );
  }

  // 6. The JSX now uses the dynamic `roomData` state
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", pb: 5 }}>
      <Container maxWidth="lg" sx={{ backgroundColor: "#F7F9FC", py: 5 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Typography color="text.primary">Room Details</Typography>
        </Breadcrumbs>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {roomData.roomNumber}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {/* Location data would come from API if available */}
            Location Placeholder
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
            {roomData.images.slice(1, 3).map((img, index) => (
              <Grid item xs key={index}>
                <Box
                  component="img"
                  src={img}
                  alt={`Room detail ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: 3,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                {/* Description would come from API if available */}
                Welcome to our beautifully designed room, perfect for your stay.
                Enjoy the modern amenities and comfortable living space.
              </Typography>
            </Box>
            <Grid container sx={{ mt: 4, mb: 5 }}>
              {roomData.facilities.map((facility) => (
                <Amenity
                  key={facility._id}
                  icon={
                    amenityIconMap[facility.name.toLowerCase()] || (
                      <KingBedOutlined />
                    )
                  }
                  label={facility.name}
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
                {roomData.discount}% OFF
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                Pick a Date
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue="20 Oct - 22 Oct"
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
                Continue to Book
              </Button>
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
      {/* Review and Comment sections */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Divider sx={{ mb: 6 }} />
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Box component="form" onSubmit={handleReviewSubmit}>
              {/* ... Rating Form ... */}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box component="form" onSubmit={handleCommentSubmit}>
              {/* ... Comment Form ... */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RoomDetail;
