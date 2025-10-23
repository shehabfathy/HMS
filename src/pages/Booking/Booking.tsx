import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import axios, { AxiosError } from "axios";
import CookieService from "../../service/Cookies/Cookies";
import toast from "react-hot-toast";
import type { TBookingApi, TBookingItem } from "../../types/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MoonLoader } from "react-spinners";

export default function Booking() {
  const [bookingList, setBookingList] = useState<TBookingItem[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<TBookingItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ✅ Responsive Hooks
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // 🧭 Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuRowId(id);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuRowId(null);
  };

  // 🔍 Fetch Bookings
  const handleBooking = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/booking?page=1&size=5",
        {
          headers: { Authorization: `Bearer ${CookieService.get("token")}` },
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
      }));

      setBookingList(rows);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBooking();
  }, []);

  // 🧩 View & Delete Functions
  const handleOpenView = (userBooking: TBookingItem) => {
    setSelectedBooking(userBooking);
    setOpenViewModal(true);
  };
  const handleCloseView = () => {
    setSelectedBooking(null);
    setOpenViewModal(false);
  };
  const handleOpenDelete = (id: string) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
    handleMenuClose();
  };
  const handleCloseDelete = () => {
    setDeleteId(null);
    setOpenDeleteModal(false);
  };
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/booking/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${CookieService.get("token")}` },
        }
      );
      toast.success("Booking deleted successfully");
      await handleBooking();
      handleCloseDelete();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to delete booking");
    } finally {
      setLoading(false);
    }
  };

  // 🧾 Table Columns
  const columns: GridColDef[] = [
    {
      field: "roomNumber",
      headerName: "Room Number",
      flex: 1,
      headerClassName: "roomNumber-header",
    },

    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerClassName: "roomNumber-header",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      headerClassName: "roomNumber-header",
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      headerClassName: "roomNumber-header",
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      headerClassName: "roomNumber-header",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "roomNumber-header",
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "roomNumber-header",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => handleMenuOpen(event, params.row.id)}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>

          {menuRowId === params.row.id && (
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleOpenView(params.row);
                }}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={() => handleOpenDelete(params.row.id)}
                sx={{ color: "error.main" }}
              >
                Delete
              </MenuItem>
            </Menu>
          )}
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box p={isSmallScreen ? 1 : 2} sx={{ height: "100vh" }}>
      <Box py={isSmallScreen ? 2 : 3}>
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          sx={{ fontWeight: "bold" }}
        >
          Booking Table Details
        </Typography>
        <Typography component="span">You can check all details</Typography>
      </Box>

      {/* View Modal */}
      <Modal open={openViewModal} onClose={handleCloseView}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "90%" : 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          {selectedBooking ? (
            <>
              <Typography variant="h6" gutterBottom>
                Booking for Room {selectedBooking.roomNumber}
              </Typography>
              <Typography>Price: {selectedBooking.price}</Typography>
              <Typography>User: {selectedBooking.user}</Typography>
              <Typography>Status: {selectedBooking.status}</Typography>
              <Typography>
                {selectedBooking.startDate} → {selectedBooking.endDate}
              </Typography>
              <Button
                onClick={handleCloseView}
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
              >
                Close
              </Button>
            </>
          ) : (
            <Typography>No booking selected</Typography>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "85%" : 350,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom color="error">
            Confirm Delete
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to delete this booking?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Responsive Layout */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <MoonLoader size={50} color="#1976d2" />
        </Box>
      ) : isSmallScreen ? (
        // ✅ Card layout for small screens
        <Stack spacing={2}>
          {bookingList.map((booking) => (
            <Paper key={booking.id} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Room {booking.roomNumber}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>💰 Price: {booking.price}</Typography>
              <Typography>👤 User: {booking.user}</Typography>
              <Typography>
                📅 {booking.startDate} → {booking.endDate}
              </Typography>
              <Typography>📌 Status: {booking.status}</Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenView(booking)}
                >
                  View
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleOpenDelete(booking.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        // ✅ Original table for larger screens
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={bookingList}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{
              "& .roomNumber-header": {
                background: "#1f263e",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "rgba(49, 89, 81, 0.9)",
                color: "#fff",
                fontWeight: 500,
              },
              "& .MuiDataGrid-cell": {
                textAlign: "center",
              },
            }}
          />
        </Paper>
      )}
    </Box>
  );
}
