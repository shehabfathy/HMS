import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import CookieService from "../../service/Cookies/Cookies";
import toast from "react-hot-toast";
import type { TBookingApi, TBookingItem } from "../../types/types";
import { MoonLoader } from "react-spinners";

export default function Booking() {
  const [bookingList, setBookingList] = useState<TBookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBooking = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/booking?page=1&size=5`,
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );

      const rows: TBookingItem[] = data.data.booking.map((b: TBookingApi) => ({
        id: b._id,
        roomNumber: b.room?.roomNumber || "N/A",
        price: b.totalPrice,
        startDate: new Date(b.startDate).toLocaleDateString(),
        endDate: new Date(b.endDate).toLocaleDateString(),
        user: b.user.userName,
        status: b.status,
        action: "View",
      }));

      setBookingList(rows);
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show booking details");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBooking();
  }, []);

  const columns: GridColDef[] = [
    { field: "roomNumber", headerName: "Room Number", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "user", headerName: "User", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box p={2} sx={{ height: "100vh" }}>
      <Box py={3}>
        <Typography variant="h5" component="p">
          Booking Table Details
        </Typography>
        <Typography component="span">You can check all details</Typography>
      </Box>
      {loading ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <MoonLoader />
        </Box>
      ) : (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={bookingList}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      )}
    </Box>
  );
}
