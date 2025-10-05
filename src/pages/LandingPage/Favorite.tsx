import { Box, Breadcrumbs, IconButton, Link, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";
import NoData from "../../shared/NOData/NoData";
import { ROUTES } from "../../service/Endpoint/Endpoint";
import CookieService from "../../service/Cookies/Cookies";
import type { tExRoom } from "../../types/types";
export default function Favorite() {
  const [Loading, setLoading] = useState(true);
  const [Favorites, setFavorites] = useState<tExRoom[]>([]);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  const exploreAllFavorite = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      setFavorites(data.data.favoriteRooms[0].rooms);
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show Favorites");
      setLoading(false);
    }
  };

  const deleteFavorite = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms/${id}`,
        {
          data: { roomId: id },
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      toast.success(data.message);
      exploreAllFavorite();
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't delete Favorite");
      setLoading(false);
    }
  };

  useEffect(() => {
    exploreAllFavorite();
  }, []);

  return (
    <>
      <Box p={{ md: 5, xs: 2 }} display={"flex"} flexDirection={"column"}>
        <Typography
          textAlign={"center"}
          variant="h4"
          color="rgba(21, 44, 91, 1)"
          sx={{
            fontWeight: "600",
            fontSize: { xs: "30px", md: "36px" },
            mb: { xs: 1 },
          }}
        >
          Your Favorites
        </Typography>

        <Box role="presentation" onClick={handleClick} mb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              underline="hover"
              color="text.primary"
              to={ROUTES.FAVORITE}
              aria-current="page"
            >
              Favorites
            </Link>
          </Breadcrumbs>
        </Box>

        <Typography component={"p"} mb={2} color="rgba(21, 44, 91, 1)">
          Your Rooms
        </Typography>

        {Loading ? (
          <Box display={"flex"} justifyContent={"center"} py={5}>
            <DotLoader color="blue" />
          </Box>
        ) : (
          <>
            {Favorites.length > 0 ? (
              <Box
                display={{ sm: "block", md: "flex" }}
                alignItems={"center"}
                margin={{ sm: "auto" }}
                flexWrap={"wrap"}
                gap={2}
                mb={5}
              >
                {Favorites.map((item) => (
                  <Box
                    key={item._id}
                    mb={{ xs: 2 }}
                    sx={{
                      position: "relative",
                      height: "215px",
                      width: { xs: "100%", md: "361px" },
                      borderRadius: "15px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={item?.images[0]}
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
                          "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))",
                      }}
                    />

                    <IconButton
                      onClick={() => deleteFavorite(item?._id)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    >
                      <FavoriteIcon sx={{ color: "#fff" }} />
                    </IconButton>

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <Typography color="rgba(255, 255, 255, 1)">
                        Ocean Land
                      </Typography>
                      <Typography color="rgba(255, 255, 255, 0.8)">
                        Bandung, Indonesia
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box py={5}>
                <NoData />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
