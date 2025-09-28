import { Box, Typography, Button } from "@mui/material";
import { deleteImg } from "../../assets";

type DeleteConfirmationProps = {
  deleteItem: string;
  confirmDelete: () => void;
  cancelDelete: () => void;
};

export default function DeleteConfirmation({
  deleteItem,
  confirmDelete,
  cancelDelete,
}: DeleteConfirmationProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      p={3}
    >
      <img
        src={deleteImg}
        alt="delete"
        style={{
          objectFit: "cover",
          height: "50px",
          width: "50px",
          marginBottom: "10px",
        }}
      />

      <Typography variant="h5" gutterBottom>
        Delete This {deleteItem}?
      </Typography>

      <Typography variant="body1" component="p" gutterBottom>
        Are you sure you want to delete this {deleteItem}? This action cannot be
        undone.
      </Typography>

      <Box mt={2} display="flex" gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            confirmDelete();
          }}
        >
          Confirm
        </Button>
        <Button variant="outlined" onClick={() => cancelDelete()}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
