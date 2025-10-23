import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import CookieService from "../../../service/Cookies/Cookies";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MoonLoader } from "react-spinners";
import DeleteConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";

// ---------------- TYPES ----------------
export type TFacilityApi = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TFacility = {
  id: string;
  name: string;
  createdAt: string;
};

// ---------------- COMPONENT ----------------
export default function Facilities_List() {
  const [facilitiesList, setFacilitiesList] = useState<TFacility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<TFacility | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [update, setUpdate] = useState(false);

  const API_URL =
    "https://upskilling-egypt.com:3000/api/v0/admin/room-facilities";
  const token = CookieService.get("token");

  // ---------------- FETCH FACILITIES ----------------
  const handleFacilities = useCallback(async () => {
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rows: TFacility[] = data.data.facilities.map((f: TFacilityApi) => ({
        id: f._id,
        name: f.name,
        createdAt: f.createdAt,
      }));

      setFacilitiesList(rows);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't fetch facilities");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    handleFacilities();
  }, [handleFacilities]);

  // ---------------- MODAL HANDLERS ----------------
  const handleOpenView = (facility: TFacility) => {
    setSelectedFacility(facility);
    setOpen(true);
  };

  const handleOpenAdd = (facility?: TFacility) => {
    setOpenAdd(true);
    if (facility) {
      setUpdate(true);
      setName(facility.name);
      setActiveRowId(facility.id);
    } else {
      setUpdate(false);
      setName("");
      setActiveRowId(null);
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setName("");
    setUpdate(false);
    setActiveRowId(null);
  };

  // ---------------- ADD / UPDATE ----------------
  const handleAddFacility = async () => {
    if (!name.trim()) {
      toast.error("Facility name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (update && activeRowId) {
        await axios.put(`${API_URL}/${activeRowId}`, { name }, { headers });
        toast.success("Facility updated successfully");
      } else {
        await axios.post(API_URL, { name }, { headers });
        toast.success("Facility added successfully");
      }

      handleFacilities();
      handleCloseAdd();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/${activeRowId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Facility deleted successfully");
      handleFacilities();
      setOpenDelete(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't delete facility");
    } finally {
      setDeleting(false);
    }
  };

  // ---------------- COLUMNS ----------------
  const columns: GridColDef<TFacility>[] = [
    {
      field: "name",
      headerName: "Facility Name",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      // Explicitly type the params
      valueGetter: (params: { row: TFacility }) => params.row.createdAt,
      valueFormatter: (params: { row: TFacility }) => {
        const value = params.row.createdAt;
        if (!value) return "N/A";
        const date = new Date(value);
        return isNaN(date.getTime())
          ? "Invalid Date"
          : date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TFacility>) => (
        <>
          <IconButton
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setActiveRowId(params.row.id);
            }}
          >
            <MoreHorizIcon />
          </IconButton>

          <Menu
            open={Boolean(anchorEl) && activeRowId === params.row.id}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handleOpenView(params.row);
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handleOpenAdd(params.row);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setOpenDelete(true);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // ---------------- RETURN ----------------
  return (
    <Box p={3}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Facilities
          </Typography>
          <Typography color="text.secondary">
            Manage all available facilities
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={() => handleOpenAdd()}
        >
          Add Facility
        </Button>
      </Box>

      {/* Table */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <MoonLoader size={50} color="#1976d2" />
        </Box>
      ) : (
        <Paper sx={{ height: 420, p: 1, borderRadius: 3, boxShadow: 3 }}>
          <DataGrid
            rows={facilitiesList}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            sx={{ border: 0 }}
          />
        </Paper>
      )}

      {/* Add/Edit Modal */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">
              {update ? "Update Facility" : "Add Facility"}
            </Typography>
            <IconButton onClick={handleCloseAdd}>
              <CloseIcon color="error" />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            label="Facility Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box textAlign="right">
            <LoadingButton
              loading={saving}
              variant="contained"
              onClick={handleAddFacility}
            >
              {update ? "Update" : "Save"}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>

      {/* View Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          {selectedFacility ? (
            <>
              <Typography variant="h6" gutterBottom>
                Facility: {selectedFacility.name}
              </Typography>
              <Typography color="text.secondary">
                Created At:{" "}
                {new Date(selectedFacility.createdAt).toLocaleString()}
              </Typography>
            </>
          ) : (
            <Typography>No facility selected</Typography>
          )}
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <DeleteConfirmation
            deleteItem="Facility"
            confirmDelete={handleDelete}
            cancelDelete={() => setOpenDelete(false)}
            saving={deleting}
          />
        </Box>
      </Modal>
    </Box>
  );
}
