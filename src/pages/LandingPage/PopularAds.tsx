import { Box, Button, IconButton, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { tPopAds } from "../../types/types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import arrow icon
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../service/Endpoint/Endpoint";
import CookieService from "../../service/Cookies/Cookies";

export default function PopularAds() {
  const [Ads, setAds] = useState<tPopAds[]>([]);
  const navigate = useNavigate();

  const getAllAds = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/ads`
      );
      setAds(data.data.ads);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show All Rooms");
    }
  };

  const addFavorite = async (id: string) => {
    try {
      const { data } = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
        {
          roomId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't Add to favorite");
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", mt: 1, mb: 1, px: { xs: 2, md: 13 } }}>
        {/* Container for Title and Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "24px",
              color: "#152C5B",
            }}
          >
            Most Popular Ads
          </Typography>

          {/* This is the new button */}
          <Button
            onClick={() => navigate(ROUTES.EXPLORE)} // Use the imported ROUTES object
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Explore All
          </Button>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          }}
          gridAutoRows="180px"
          gap={2}
          mb={5}
        >
          {Ads.map((item, index) => (
            <Box
              key={item._id}
              mb={{ xs: 2 }}
              sx={{
                position: "relative",
                height: "100%",
                width: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                gridRow: { md: index === 0 ? "span 2" : "auto" }, // Only apply grid span on md+ screens
                // Added a group hover effect container
                "&:hover .actions-overlay": {
                  opacity: 1,
                },
              }}
            >
              <Box
                component="img"
                src={item?.room?.images[0]}
                sx={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", // Added gradient for better text readability
                }}
              />
              <Typography
                color="#fff"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "rgba(255, 73, 139, 1)",
                  borderTopRightRadius: "15px",
                  borderBottomLeftRadius: "15px",
                  py: 1,
                  px: 3,
                }}
              >
                ${item?.room?.price} per night
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 20,
                }}
              >
                <Typography color="rgba(255, 255, 255, 1)">
                  Blue Origin Fams
                </Typography>
                <Typography color="rgba(255, 255, 255, 0.8)">
                  Jakarta, Indonesia
                </Typography>
              </Box>
              {/* This Box is the overlay for the action buttons */}
              <Box
                className="actions-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  opacity: 0, // Hidden by default
                  transition: "opacity 0.3s", // Smooth transition
                }}
              >
                <IconButton
                  onClick={() => {
                    addFavorite(item?.room?._id);
                    // I removed the navigation from here for better UX
                  }}
                >
                  <FavoriteIcon sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton>
                  <RemoveRedEyeIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
