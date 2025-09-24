import React, { useState } from "react";
import DataTable from "../../../shared/DataTable/DataTable"; // Adjust path to the DataTable component
import type { ColumnDef } from "../../../types/types"; // Adjust path to your types file
import api from "../../../utils/axios/axiosInstance"; // Adjust path to your axios instance
import { toast } from "react-hot-toast"; // Assuming you have a toast library
import DeleteImage from "../../../assets/Email.png";

// Import Material-UI components
import {
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
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";

// Import Material-UI icons
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from "@mui/icons-material";

// Import types from the central interfaces file
import type { IRoom } from "../../../interfaces/interfaces";

export default function RoomsList() {
  // State for menu and modals
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // A state to trigger data refetch in the DataTable
  const [refetch, setRefetch] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    room: IRoom
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteRoom = async () => {
    if (!selectedRoom) return;
    try {
      await api.delete(`/admin/rooms/${selectedRoom._id}`);
      toast.success("Room deleted successfully!");
      setDeleteModalOpen(false);
      setRefetch(!refetch); // Toggle refetch to update the table
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete room.");
    }
  };

  // Define how each column in the rooms table should be rendered
  const roomColumns: ColumnDef<IRoom>[] = [
    {
      header: "Room Number",
      renderCell: (room) => (
        <TableCell key={`roomNumber-${room._id}`}>{room.roomNumber}</TableCell>
      ),
    },
    {
      header: "Price",
      renderCell: (room) => (
        <TableCell key={`price-${room._id}`}>${room.price}</TableCell>
      ),
    },
    {
      header: "Discount",
      renderCell: (room) => (
        <TableCell key={`discount-${room._id}`}>
          {room.discount > 0 ? `${room.discount}%` : "N/A"}
        </TableCell>
      ),
    },
    {
      header: "Capacity",
      renderCell: (room) => (
        <TableCell key={`capacity-${room._id}`}>
          {room.capacity} Persons
        </TableCell>
      ),
    },
    {
      header: "Actions",
      align: "center",
      renderCell: (room) => (
        <TableCell align="center" key={`actions-${room._id}`}>
          <IconButton
            aria-label="actions"
            onClick={(event) => handleMenuOpen(event, room)}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      ),
    },
  ];

  // Content for the header: search bar and "Add New" button
  const headerContent = (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        size="small"
        placeholder="Search..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" startIcon={<AddIcon />}>
        Add New Room
      </Button>
    </Box>
  );

  return (
    <>
      <DataTable
        key={refetch.toString()} // Re-renders the component when refetch changes
        endpoint="/admin/rooms"
        title="Rooms"
        subtitle="You can manage all rooms"
        columns={roomColumns}
        headerContent={headerContent}
      />

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={openDeleteModal} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          {/* Display room image if available */}

          <Box
            component="img"
            src={DeleteImage}
            alt={`Image`}
            sx={{
              width: "10%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />

          <DialogContentText>
            Are you sure you want to delete room number{" "}
            <strong>{selectedRoom?.roomNumber}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteRoom} variant="contained" color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
