import DataTable from "../../shared/DataTable/DataTable"; // Adjust path to the DataTable component
import type { ColumnDef, ApiItem } from "../../types/types"; // Adjust path to your types file

// Import Material-UI components
import { TableCell, Chip } from "@mui/material";

// Define a specific interface for a User, extending the generic ApiItem
interface IUser extends ApiItem {
  userName: string;
  email: string;
  isVerified: boolean;
  role: string;
}

export default function UsersList() {
  // Define how each column in the user table should be rendered
  const userColumns: ColumnDef<IUser>[] = [
    {
      header: "Username",
      renderCell: (user) => (
        <TableCell key={`name-${user._id}`}>{user.userName}</TableCell>
      ),
    },
    {
      header: "Email",
      renderCell: (user) => (
        <TableCell key={`email-${user._id}`}>{user.email}</TableCell>
      ),
    },
    {
      header: "Verified",
      renderCell: (user) => (
        <TableCell key={`verified-${user._id}`}>
          {user.isVerified ? "Yes" : "No"}
        </TableCell>
      ),
    },
    {
      header: "Role",
      renderCell: (user) => (
        <TableCell key={`role-${user._id}`}>
          {user.role === "admin" ? (
            <Chip label="Admin" color="primary" variant="filled" size="small" />
          ) : (
            <Chip
              label="User"
              color="default"
              variant="outlined"
              size="small"
            />
          )}
        </TableCell>
      ),
    },
  ];

  return (
    <>
      <DataTable
        endpoint="/admin/users"
        title="User Table Details"
        subtitle="You can check all user details"
        columns={userColumns}
      />
    </>
  );
}
