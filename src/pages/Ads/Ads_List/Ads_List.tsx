import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectItem,
  Dialog,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import CookieService from "../../../service/Cookies/Cookies";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import type {
  SelectedAds,
  TAds,
  TAdsApi,
  tRoomList,
} from "../../../types/types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteConfirmation from "../../../shared/DeleteConfirmation/DeleteConfirmation";
export default function Ads_List() {
  const [adsList, setAdsList] = useState<TAds[]>([]);
  const [roomsList, setRoomsList] = useState<tRoomList[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedAds, setSelectedAds] = useState<SelectedAds | null>(null);
  const [adId, setAdId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isupdate, setUpdate] = useState(false);
  console.log(adsList);
  // Form states
  const [room, setRoom] = useState("");
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("true");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(isSmallScreen);

  // Action Menu

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    ad: SelectedAds
  ) => {
    setSelectedAds(ad);
    setAdId(ad.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // view modal
  const [openView, setOpen] = useState(false);
  const handleOpenView = () => {
    setOpen(true);
  };
  const handleCloseView = () => {
    setOpen(false);
  };

  // 🧾 Get Ads
  const getAds = async () => {
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
      toast.error(err.response?.data?.message || "Can't load ads");
      setLoading(false);
    }
  };

  // 🏠 Get Rooms
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
      toast.error(err.response?.data?.message || "Can't load rooms");
    }
  };

  // make Delete

  const deleteAds = async () => {
    try {
      setSaving(true);
      await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/${adId}`,
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      toast.success("Ad Removed successfully");
      setSaving(false);
      getAds();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't delete ads");
      setSaving(false);
    }
  };

  // handle update
  const handleUpdate = async () => {
    try {
      setSaving(true);
      setUpdate(true);
      await axios.put(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/${adId}`,
        {
          isActive: status,
          discount: discount,
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );
      await getAds();
      toast.success("Ad update successfully");
      handleCloseAdd();
      setUpdate(false);
      setSaving(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't update ads");
      setUpdate(false);
      setSaving(false);
    }
  };

  useEffect(() => {
    getAds();
    getAllRooms();
  }, []);

  // ➕ Add Ads
  const handleAddAds = async () => {
    if (!room || !discount) {
      toast.error("Please fill all fields");
      return;
    }

    setSaving(true);
    try {
      await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/ads/`,
        {
          room,
          discount,
          isActive: status === "true",
        },
        {
          headers: {
            Authorization: `Bearer ${CookieService.get("token")}`,
          },
        }
      );

      await getAds();
      toast.success("Ad added successfully");
      handleCloseAdd();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Can't add ad");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseAdd = () => {
    setRoom("");
    setDiscount(0);
    setStatus("true");
    setOpenAdd(false);
  };

  // 🧱 Columns
  const columns: GridColDef[] = [
    {
      field: "roomName",
      headerName: "Room Name",
      flex: 1,
      headerClassName: "headerStyle",
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      headerClassName: "headerStyle",
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
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerClassName: "headerStyle",
    },
    {
      field: "Discount",
      headerName: "Discount",
      flex: 1,
      headerClassName: "headerStyle",
    },
    {
      field: "Capacity",
      headerName: "Capacity",
      flex: 1,
      headerClassName: "headerStyle",
    },
    {
      field: "Active",
      headerName: "Active",
      flex: 1,
      headerClassName: "headerStyle",
      renderCell: (params) => (params.value ? "Active" : "Not Active"),
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      headerClassName: "headerStyle",
      renderCell: (params) => (
        <IconButton onClick={(event) => handleClick(event, params.row)}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box p={2} sx={{ height: "100vh" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box py={3}>
          <Typography variant={isSmallScreen ? "h6" : "h5"}>
            Ads Table
          </Typography>
          <Typography width={isSmallScreen ? 180 : 250}>
            You can check all ads details
          </Typography>
        </Box>
        <Button
          onClick={() => setOpenAdd(true)}
          variant="contained"
          sx={{
            textTransform: "capitalize",
            px: isSmallScreen ? 2 : 4,
            fontSize: isSmallScreen ? 12 : 16,
          }}
        >
          Add New Ad
        </Button>
      </Box>

      {/* Add Modal */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? 350 : 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">
              {isupdate ? "Update Ad" : "Add Ad"}{" "}
            </Typography>
            <IconButton
              onClick={handleCloseAdd}
              sx={{
                color: "red",
                borderRadius: "50%",
                border: "1px solid red",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <InputLabel>Room Name</InputLabel>
              <Select
                value={room}
                readOnly={isupdate}
                label="Room Name"
                onChange={(e) => setRoom(e.target.value)}
              >
                {roomsList.map((r) => (
                  <SelectItem key={r._id} value={r._id}>
                    {r.roomNumber}
                  </SelectItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Not Active</SelectItem>
              </Select>
            </FormControl>
          </Box>

          <Box textAlign="right" mt={3}>
            <LoadingButton
              variant="contained"
              loading={saving}
              onClick={isupdate ? handleUpdate : handleAddAds}
            >
              {isupdate ? "Update" : "Save"}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>

      {/* Menu  */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenView();
            handleClose();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            setUpdate(true);
            setOpenAdd(true);
            const roomData = roomsList.find(
              (r) => r.roomNumber == selectedAds?.roomName
            );
            setRoom(roomData?._id || "");
            setDiscount(selectedAds?.Discount || 0);
            setStatus(selectedAds?.Active ? "true" : "false");
            handleClose();
          }}
        >
          Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setOpenDelete(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DeleteConfirmation
          deleteItem="Ads"
          confirmDelete={deleteAds}
          cancelDelete={() => setOpenDelete(false)}
          saving={saving}
        />
      </Dialog>

      {/* view Modal */}
      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? 350 : 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <Box
            component="img"
            src={selectedAds?.image}
            alt={selectedAds?.roomName}
            sx={{
              width: "100%",
              objectFit: "cover",
            }}
            mb={1}
          ></Box>
          <Typography id="modal-modal-title" variant="body1" component="p">
            room Name : {selectedAds?.roomName}
          </Typography>
          <Typography id="modal-modal-title" variant="body1" component="p">
            Price : {selectedAds?.price} $
          </Typography>
          <Typography id="modal-modal-title" variant="body1" component="p">
            Discount : {selectedAds?.Discount} %
          </Typography>
          <Typography id="modal-modal-title" variant="body1" component="p">
            Capacity : {selectedAds?.Capacity}
          </Typography>
          <Typography id="modal-modal-title" variant="body1" component="p">
            Status: {selectedAds?.Active ? "Active" : "notActive"}
          </Typography>
        </Box>
      </Modal>

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
      ) : isSmallScreen ? (
        <Stack spacing={2}>
          {adsList.map((booking) => (
            <Paper key={booking.id} sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Room {booking.roomName}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>💰 Price: {booking.price}</Typography>
              <Typography>👤 User: {booking.Discount}</Typography>
              <Typography>📌 Status: {booking.Capacity}</Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    handleOpenView();
                    handleClose();
                    setAdId(booking.id);
                    setSelectedAds(booking);
                  }}
                >
                  View
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    handleClose();
                    setOpenDelete(true);
                    setAdId(booking.id);
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={adsList}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: 0,
              "& .headerStyle": {
                backgroundColor: "#1f263e",
                color: "#fff",
              },
              "& .MuiButtonBase-root": {
                backgroundColor: "rgba(49, 89, 81, 0.9)",
                color: "#fff",
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
