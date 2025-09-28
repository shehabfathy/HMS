import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import CookieService from "../../../service/Cookies/Cookies";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import type { TAds, TAdsApi } from "../../../types/types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";

export default function Ads_List() {
  const [adsList, setAdsList] = useState<TAds[]>([]);
  const [roomsList, setRoomsList] = useState<any[]>([]);
  const [selectedAds, setSelectedAds] = useState<TAds | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [rowId, setRowId] = useState<null | string>(null);
  const [room, setRoom] = useState<string>("");
  const [discount, setDiscount] = useState<number | undefined>();
  const [status, setStatus] = useState<boolean>(true);
  const [saving, setSaving] = useState(false);
  const [Update, setUpdate] = useState(false);

  // View Modal
  const handleOpen = (ads: TAds) => {
    setSelectedAds(ads);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedAds(null);
    setOpen(false);
  };

  // Add Modal
  const handleOpenAdd = (ads: TAds) => {
    setOpenAdd(true);
    if (Update) {
      setSelectedAds(ads);
      console.log(selectedAds);
    }
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // Get Rooms for select
  const getAllRooms = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms`,
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      setRoomsList(data.data.rooms || []);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "there is something went wrong"
      );
    }
  };

  // Add Ads
  const handleAddAds = async () => {
    setSaving(true);

    try {
      await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/`,
        {
          room: room,
          discount: discount,
          isActive: status,
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );

      await handleBooking();
      setSaving(false);
      toast.success("Ads is Added Successful");
      handleCloseAdd();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "there is something went wrong"
      );
    }
  };
  // Update
  const handleUpdateAds = async () => {
    setSaving(true);

    try {
      await axios.put(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/${rowId}`,
        {
          discount: discount,
          isActive: status,
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );

      await handleBooking();
      setSaving(false);
      toast.success("Ads is updated Successful");
      handleCloseAdd();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "there is something went wrong"
      );
    }
  };

  // Delete Ads
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/${rowId}`,
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      await handleBooking();
      toast.success("Ads is Removed Successful");
      handleCloseDelete();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't delete ads");
    }
  };

  // Get Ads
  const handleBooking = async () => {
    try {
      const { data } = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads`,
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      const rows: TAds[] = data.data.ads.map((b: TAdsApi) => ({
        id: b._id,
        roomName: b.room?.roomNumber || "N/A",
        price: b.room?.price,
        image: b.room?.images[0] || "",
        Discount: b.room?.discount,
        Capacity: b.room?.capacity,
        Active: b.isActive,
      }));

      setAdsList(rows);
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't show booking details");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBooking();
    getAllRooms();
  }, []);

  const columns: GridColDef[] = [
    { field: "roomName", headerName: "Room Name", flex: 1 },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Ads"
          style={{
            width: 60,
            height: 40,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "Discount", headerName: "Discount", flex: 1 },
    { field: "Capacity", headerName: "Capacity", flex: 1 },
    {
      field: "Active",
      headerName: "Active",
      flex: 1,
      renderCell: (params) => (params.value ? "Active" : "Not Active"),
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
                handleOpenDelete(params.row);
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
            Ads Table
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
          Add New Ads
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
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 6,
          }}
        >
          <DeleteConfirmation
            deleteItem={"Ads Room"}
            confirmDelete={handleDelete}
            cancelDelete={handleCloseDelete}
          />
        </Box>
      </Modal>

      {/* Add Modal */}
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
            sx={{ mb: "10px" }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {Update ? "Update Ads" : "Add Ads"}
            </Typography>
            <IconButton
              onClick={() => handleCloseAdd()}
              sx={{
                color: "red",
                borderRadius: "50%",
                border: "1px solid red",
              }}
            >
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              fullWidth
              sx={{ mb: "10px" }}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <em>Room Name</em>;
                }
                return roomsList.find((r) => r._id == selected)?.roomNumber;
              }}
            >
              {roomsList.map((room) => (
                <MenuItem key={room._id} value={room._id}>
                  {room?.roomNumber}
                </MenuItem>
              ))}
            </Select>
            <TextField
              onChange={(e) => setDiscount(Number(e.target.value))}
              sx={{ mb: "10px" }}
              placeholder="Discount"
              fullWidth
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              type="text"
              value={discount ?? ""}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
            <Select
              value={status ? "true" : "false"}
              onChange={(e) => setStatus(e.target.value === "true")}
              fullWidth
              sx={{ mb: "15px" }}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Not Active</MenuItem>
            </Select>
            <Box textAlign={"right"}>
              <LoadingButton
                variant="contained"
                loading={saving}
                loadingPosition="start"
                onClick={() => {
                  handleAddAds();
                }}
              >
                {Update ? "Update" : "Save"}
              </LoadingButton>
            </Box>
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
          {selectedAds ? (
            <>
              <img
                src={selectedAds?.image}
                alt="room"
                style={{ objectFit: "cover", height: "50px", width: "50px" }}
              />
              <Typography variant="h6">
                Booking for Room {selectedAds?.roomName}
              </Typography>
              <Typography>Price: {selectedAds?.price}</Typography>
              <Typography>Capacity: {selectedAds?.Capacity}</Typography>
              <Typography>Discount: {selectedAds?.Discount}</Typography>
              <Typography>
                IsActive : {selectedAds?.Active ? "Active" : "Not Active"}
              </Typography>
            </>
          ) : (
            <Typography>No booking selected</Typography>
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
            rows={adsList}
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
