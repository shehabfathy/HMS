import React, { useState } from "react";

// Import Material-UI components
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Avatar,
} from "@mui/material";

// Import Material-UI icons
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// --- Hardcoded Data for UI Mockup ---
const mockUsers = [
  {
    id: 1,
    roomNumber: "Room 1",
    price: 500,
    startDate: "01-01-2024",
    endDate: "10-01-2024",
    user: "UpSkilling",
  },
  {
    id: 2,
    roomNumber: "Single Room",
    price: 500,
    startDate: "01-01-2024",
    endDate: "07-01-2024",
    user: "Ahmed Mohamed",
  },
  {
    id: 3,
    roomNumber: "Double Rooms",
    price: 500,
    startDate: "01-01-2024",
    endDate: "11-01-2024",
    user: "UpSkilling",
  },
  {
    id: 4,
    roomNumber: "Double Rooms",
    price: 500,
    startDate: "01-01-2024",
    endDate: "15-01-2024",
    user: "UpSkilling",
  },
  {
    id: 5,
    roomNumber: "Double Rooms",
    price: 900,
    startDate: "01-01-2024",
    endDate: "02-01-2024",
    user: "UpSkilling",
  },
];

// --- The UI Component ---
export default function UsersListMUI() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookingId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookingId(bookingId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBookingId(null);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
    handleMenuClose();
  };

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh", p: { xs: 2, sm: 3 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h5" component="h2" fontWeight="bold">
              Booking Table Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can check all details
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search..."
            variant="outlined"
            sx={{ mt: { xs: 2, sm: 0 }, width: { xs: "100%", sm: 280 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <Paper sx={{ borderRadius: 4, overflow: "hidden" }} elevation={2}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="booking table">
              <TableHead sx={{ bgcolor: "grey.200" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Room Number</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockUsers.map((booking) => (
                  <TableRow
                    key={booking.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      {booking.roomNumber}
                    </TableCell>
                    <TableCell>{`$${booking.price}`}</TableCell>
                    <TableCell>{booking.startDate}</TableCell>
                    <TableCell>{booking.endDate}</TableCell>
                    <TableCell>{booking.user}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="actions"
                        onClick={(event) => handleMenuOpen(event, booking.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem onClick={openUpdateModal}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={openDeleteModal} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Dialog (Modal) */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogTitle>Delete Booking</DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
            <DeleteIcon color="error" />
          </Avatar>
          <DialogContentText>
            Are you sure you want to delete this booking? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog (Modal) */}
      <Dialog
        open={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Update Booking
          <IconButton
            aria-label="close"
            onClick={() => setUpdateModalOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Update form fields would go here...</Typography>
          {/* Example form fields */}
          <TextField
            margin="dense"
            label="Room Number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setUpdateModalOpen(false)} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
