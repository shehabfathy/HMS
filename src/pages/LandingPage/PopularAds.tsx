import { Box, IconButton, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { tPopAds } from "../../types/types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../service/Endpoint/Endpoint";
import CookieService from "../../service/Cookies/Cookies";

export default function PopularAds() {
  const [Ads, setAds] = useState<tPopAds[]>([]);

  const Navigate = useNavigate();

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

  const AddFavorite = async (id: string) => {
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
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#152C5B",
            mx: 10,
          }}
        >
          Most Popular Ads
        </Typography>

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
                gridRow: index === 0 ? "span 2" : "auto",
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
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%)",
                }}
              >
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => {
                    AddFavorite(item?.room?._id);
                    Navigate(ROUTES.FAVORITE);
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
