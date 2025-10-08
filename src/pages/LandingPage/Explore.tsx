import { Box, Breadcrumbs, Link, styled, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import usePagination from "@mui/material/usePagination";
import { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";
import NoData from "../../shared/NOData/NoData";
import { roomImg } from "../../assets";
import type { tExRoom } from "../../types/types";

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<tExRoom[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // State to hold total pages from API
  const { state } = useLocation();

  // Pagination now uses the dynamic totalPages count
  const { items } = usePagination({
    count: totalPages,
    page,
    onChange: (_event, newPage) => setPage(newPage),
  });

  const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  });

  // This function is not used, but preserved as it was in your original code
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  const exploreAllRoom = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/rooms/available`,
        {
          params: {
            page,
            size: 9,
            startDate: state?.startDate,
            endDate: state?.endDate,
            capacity: state?.capcityData,
          },
        }
      );
      setRooms(data.data.rooms);
      setTotalPages(data.data.totalPages); // Update total pages from the API response
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show All Rooms");
    } finally {
      setLoading(false);
    }
  };

  // useEffect now re-fetches data if the page or search filters (state) change
  useEffect(() => {
    exploreAllRoom();
  }, [page, state]);

  return (
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
        Explore ALL Rooms
      </Typography>

      <Box role="presentation" onClick={handleClick} mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Link
            component={RouterLink}
            underline="hover"
            color="text.primary"
            to="/explore"
            aria-current="page"
          >
            Explore
          </Link>
        </Breadcrumbs>
      </Box>

      <Typography component={"p"} mb={2} color="rgba(21, 44, 91, 1)">
        All Rooms
      </Typography>

      {loading ? (
        <Box display={"flex"} justifyContent={"center"} py={5}>
          <DotLoader color="#3252DF" />
        </Box>
      ) : (
        <>
          {rooms.length > 0 ? (
            <Box
              display="grid" // Using Grid for better responsive layout
              gridTemplateColumns={{
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={3}
              mb={5}
            >
              {rooms.map((item) => (
                <RouterLink
                  key={item._id}
                  to={`/rooms-data/${item._id}`}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "215px",
                      width: "100%", // Takes full width of the grid column
                      borderRadius: "15px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={item?.images[0] || roomImg}
                      sx={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
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
                      ${item?.price} per night
                    </Typography>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        color: "#fff",
                      }}
                    >
                      <Typography color="inherit" fontWeight="bold">
                        {item.roomNumber}
                      </Typography>
                      <Typography color="inherit" variant="body2">
                        {item.facilities.map((f) => f.name).join(" • ")}
                      </Typography>
                    </Box>
                  </Box>
                </RouterLink>
              ))}
            </Box>
          ) : (
            <Box py={5}>
              <NoData />
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav style={{ margin: "25px auto" }}>
              <List>
                {items.map(({ page, type, selected, ...item }, index) => {
                  let children = null;
                  if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children = <span style={{ padding: "6px 10px" }}>…</span>;
                  } else if (type === "page") {
                    children = (
                      <button
                        type="button"
                        style={{
                          fontWeight: selected ? "bold" : "normal",
                          padding: "8px 16px",
                          margin: "0 4px",
                          borderRadius: "8px",
                          border: selected
                            ? "2px solid #3252DF"
                            : "2px solid #E0E2E7",
                          backgroundColor: selected ? "#3252DF" : "transparent",
                          color: selected ? "#fff" : "#333",
                          cursor: "pointer",
                        }}
                        {...item}
                      >
                        {page}
                      </button>
                    );
                  } else {
                    children = (
                      <button
                        type="button"
                        {...item}
                        style={{
                          padding: "8px 16px",
                          margin: "0 4px",
                          borderRadius: "8px",
                          border: "2px solid #E0E2E7",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        {type}
                      </button>
                    );
                  }
                  return <li key={index}>{children}</li>;
                })}
              </List>
            </nav>
          )}
        </>
      )}
    </Box>
  );
}
