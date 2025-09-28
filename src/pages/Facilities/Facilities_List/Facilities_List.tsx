import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import CookieService from "../../../service/Cookies/Cookies";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";

// TypeScript types
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

export default function Facilities_List() {
  const [facilitiesList, setFacilitiesList] = useState<TFacility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<TFacility | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [rowId, setRowId] = useState<null | string>(null);
  const [name, setName] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [Update, setUpdate] = useState(false);

  // View Modal
  const handleOpen = (facility: TFacility) => {
    setSelectedFacility(facility);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedFacility(null);
    setOpen(false);
  };

  // Add/Edit Modal
  const handleOpenAdd = (facility?: TFacility) => {
    setOpenAdd(true);
    if (Update && facility) {
      setSelectedFacility(facility);
      setName(facility.name);
    }
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setName("");
  };

  // Delete Modal
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // Get all facilities
  const handleFacilities = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`,
        {
          headers: { Authorization: `Bearer ${CookieService.get("token")}` },
        }
      );

      const rows: TFacility[] = data.data.facilities.map((f: TFacilityApi) => ({
        id: f._id,
        name: f.name,
        createdAt: f.createdAt,
      }));

      setFacilitiesList(rows);
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't fetch facilities");
      setLoading(false);
    }
  };

  // Add / Update Facility
  const handleAddFacility = async () => {
    setSaving(true);
    try {
      if (Update && rowId) {
        await axios.put(
          `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${rowId}`,
          { name },
          { headers: { Authorization: `Bearer ${CookieService.get("token")}` } }
        );
        toast.success("Facility updated successfully");
      } else {
        await axios.post(
          `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`,
          { name },
          { headers: { Authorization: `Bearer ${CookieService.get("token")}` } }
        );
        toast.success("Facility added successfully");
      }

      setSaving(false);
      handleCloseAdd();
      handleFacilities();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
      setSaving(false);
    }
  };

  // Delete Facility
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${rowId}`,
        { headers: { Authorization: `Bearer ${CookieService.get("token")}` } }
      );
      toast.success("Facility deleted successfully");
      handleCloseDelete();
      handleFacilities();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't delete facility");
    }
  };

  useEffect(() => {
    handleFacilities();
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Facility Name", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      valueFormatter: (params) =>
        new Date(params.value as string).toLocaleString(),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              setAnchor(e.currentTarget);
              setRowId(params.row.id);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => {
              setAnchor(null);
              setRowId(null);
            }}
          >
            <MenuItem
              onClick={() => {
                handleOpen(params.row);
                setAnchor(null);
              }}
            >
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                setUpdate(true);
                handleOpenAdd(params.row);
                setAnchor(null);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleOpenDelete();
                setAnchor(null);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box p={2} sx={{ height: "100vh" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box py={3}>
          <Typography variant="h5" component="p">
            Facilities Table
          </Typography>
          <Typography component="span">You can check all details</Typography>
        </Box>
        <Button
          onClick={() => {
            setUpdate(false);
            handleOpenAdd();
          }}
          variant="contained"
          sx={{ textTransform: "capitalize", paddingX: "30px" }}
        >
          Add New Facility
        </Button>
      </Box>

      {/* Delete Modal */}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 6,
          }}
        >
          <DeleteConfirmation
            deleteItem={"Facility"}
            confirmDelete={handleDelete}
            cancelDelete={handleCloseDelete}
          />
        </Box>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">
              {Update ? "Update Facility" : "Add Facility"}
            </Typography>
            <IconButton
              onClick={handleCloseAdd}
              sx={{
                color: "red",
                borderRadius: "50%",
                border: "1px solid red",
              }}
            >
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Facility Name"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box textAlign={"right"}>
            <LoadingButton
              variant="contained"
              loading={saving}
              onClick={handleAddFacility}
            >
              {Update ? "Update" : "Save"}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>

      {/* View Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedFacility ? (
            <>
              <Typography variant="h6">
                Facility: {selectedFacility.name}
              </Typography>
              <Typography>
                Created At:{" "}
                {new Date(selectedFacility.createdAt).toLocaleString()}
              </Typography>
            </>
          ) : (
            <Typography>No facility selected</Typography>
          )}
        </Box>
      </Modal>

      {/* Table */}
      {loading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height="60vh"
        >
          <MoonLoader size={50} color="#1976d2" />
        </Box>
      ) : (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={facilitiesList}
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
