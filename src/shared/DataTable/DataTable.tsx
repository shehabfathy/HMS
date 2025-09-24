import React, { useState, useEffect } from "react";
import api from "../../utils/axios/axiosInstance"; // Adjust the import path to your api.js file

// Import Material-UI components
import {
  Box,
  Container,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import type { DataTableProps, ApiItem } from "../../types/types"; // Import the new types

/**
 * A reusable, type-safe data table component.
 * It uses a generic type 'T' which must have an `_id` for reusability with any API data.
 */
const DataTable = <T extends ApiItem>({
  endpoint,
  title,
  subtitle,
  columns,
  headerContent,
}: DataTableProps<T>): React.ReactElement => {
  // State for API data, loading, and errors
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Type the expected API response
        const response = await api.get<{
          data: { users?: T[]; rooms?: T[]; data?: T[]; totalCount?: number };
        }>(endpoint, {
          params: {
            page: page + 1, // API uses 1-based index
            size: rowsPerPage,
          },
        });

        const responseData = response.data.data;
        const itemsList =
          responseData.users || responseData.rooms || responseData.data || [];

        setItems(itemsList);
        setTotalItems(responseData.totalCount || 0);
      } catch (err: any) {
        // Catch as 'any' to safely access response properties
        setError(
          err.response?.data?.message ||
            `Failed to fetch data from ${endpoint}.`
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [page, rowsPerPage, endpoint]);

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
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          {headerContent}
        </Box>

        {/* Table */}
        <Paper sx={{ borderRadius: 4, overflow: "hidden" }} elevation={2}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="data table">
              <TableHead sx={{ bgcolor: "grey.200" }}>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell
                      key={col.header}
                      align={col.align || "left"}
                      sx={{ fontWeight: "bold" }}
                    >
                      {col.header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ color: "error.main" }}
                    >
                      {error}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => (
                    <TableRow key={item._id} hover>
                      {columns.map((col) => col.renderCell(item))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default DataTable;
