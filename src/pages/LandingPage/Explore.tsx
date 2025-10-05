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
  const [Loading, setLoading] = useState(true);
  const [Room, setRoom] = useState<tExRoom[]>([]);
  const [page, setPage] = useState(1);
  const { state } = useLocation();

  const { items } = usePagination({
    count: 9,
    page,
    onChange: (_event, newPage) => setPage(newPage),
  });

  const List = styled("ul")({
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  });

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }

  const exploreAllRoom = async () => {
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
      setRoom(data.data.rooms);
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show All Rooms");
      setLoading(false);
    }
  };

  useEffect(() => {
    exploreAllRoom();
  }, [page]);

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
          Explore ALL Rooms
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

        {Loading ? (
          <Box display={"flex"} justifyContent={"center"} py={5}>
            <DotLoader color="blue" />
          </Box>
        ) : (
          <>
            {Room.length > 0 ? (
              <Box
                display={{ sm: "block", md: "flex" }}
                alignItems={"center"}
                margin={{ sm: "auto" }}
                flexWrap={"wrap"}
                gap={2}
                mb={5}
              >
                {Room.map((item) => (
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
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))",
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

                <nav
                  style={{
                    margin: "15px auto",
                    display: "block",
                  }}
                >
                  <List
                    style={{
                      display: "flex",
                      listStyle: "none",
                      padding: "8px 0",
                      margin: "0 ",
                      border: "2px solid rgba(224, 226, 231, 1)",
                      borderRadius: "10px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    }}
                  >
                    {items.map(({ page, type, selected, ...item }, index) => {
                      let children = null;

                      if (
                        type === "start-ellipsis" ||
                        type === "end-ellipsis"
                      ) {
                        children = (
                          <span style={{ padding: "6px 10px" }}>…</span>
                        );
                      } else if (type === "page") {
                        children = (
                          <button
                            type="button"
                            style={{
                              fontWeight: selected ? "bold" : "normal",
                              padding: "6px 12px",
                              margin: "0 4px",
                              borderRadius: "6px",
                              border: "none",
                              backgroundColor: selected
                                ? "#1976d2"
                                : "transparent",
                              color: selected ? "#fff" : "#333",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor = selected
                                ? "#1565c0"
                                : "rgba(0,0,0,0.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor = selected
                                ? "#1976d2"
                                : "transparent")
                            }
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
                              padding: "6px 12px",
                              margin: "0 4px",
                              borderRadius: "6px",
                              border: "none",
                              backgroundColor: "transparent",
                              color: "#1976d2",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "rgba(25,118,210,0.1)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            {type}
                          </button>
                        );
                      }

                      return (
                        <li key={index} style={{ listStyle: "none" }}>
                          {children}
                        </li>
                      );
                    })}
                  </List>
                </nav>
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
