import React, { useState, useEffect } from "react";
import axios from "axios";

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
  TablePagination,
  CircularProgress,
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

// Define an interface for the user data from the API
interface IUser {
  _id: string;
  userName: string;
  email: string;
  isVerified: boolean;
  role: string;
  // Add other fields from your API response as needed
}

// The UI Component
export default function UsersList() {
  // State for API data, loading, and errors
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for pagination
  const [page, setPage] = useState(0); // MUI TablePagination is 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  // State for menu and modals
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // API uses 1-based index for page, so we add 1
        const response = await axios.get(
          `https://upskilling-egypt.com:3000/api/v0/admin/users`,
          {
            params: {
              page: page + 1,
              size: rowsPerPage,
            },
          }
        );
        setUsers(response.data.data);
        setTotalUsers(response.data.totalCount);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to fetch users.");
        } else {
          setError("An unexpected error occurred.");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
    handleMenuClose();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
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
              User Table Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can check all user details
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
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead sx={{ bgcolor: "grey.200" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Verified</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{ color: "error.main" }}
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      hover
                    >
                      <TableCell component="th" scope="row">
                        {user.userName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="actions"
                          onClick={(event) => handleMenuOpen(event, user._id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <Avatar sx={{ bgcolor: "error.light", mx: "auto", mb: 2 }}>
            <DeleteIcon color="error" />
          </Avatar>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be
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
          Update User
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
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
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
