import { Box, Typography } from "@mui/material";
import { deleteImg } from "../../assets";
import { LoadingButton } from "@mui/lab";

type DeleteConfirmationProps = {
  deleteItem: string;
  confirmDelete: () => void;
  cancelDelete: () => void;
  saving: boolean;
};

export default function DeleteConfirmation({
  deleteItem,
  confirmDelete,
  cancelDelete,
  saving,
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
        <LoadingButton
          variant="contained"
          loading={saving}
          color="error"
          onClick={async () => {
            await confirmDelete();
            cancelDelete();
          }}
        >
          Confirm
        </LoadingButton>
        <LoadingButton variant="outlined" onClick={() => cancelDelete()}>
          Cancel
        </LoadingButton>
      </Box>
    </Box>
  );
}
